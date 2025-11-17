import { Component, Connection } from '../types';

interface MapScriptData {
  title: string;
  purpose?: string;
  scope?: string;
  components: Component[];
  connections: Connection[];
}

/**
 * Parse MapScript format into internal data structure
 * MapScript format:
 * title <title>
 * purpose <purpose>
 * scope <scope>
 * component <name> [<visibility>, <evolution>]
 * <source>-><target>
 */
export function parseMapScript(text: string): MapScriptData {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line && !line.startsWith('//'));

  const data: MapScriptData = {
    title: 'Untitled Map',
    components: [],
    connections: [],
  };

  const componentMap = new Map<string, Component>();

  for (const line of lines) {
    // Parse title
    if (line.startsWith('title ')) {
      data.title = line.substring(6).trim();
    }
    // Parse purpose
    else if (line.startsWith('purpose ')) {
      data.purpose = line.substring(8).trim();
    }
    // Parse scope
    else if (line.startsWith('scope ')) {
      data.scope = line.substring(6).trim();
    }
    // Parse component or anchor
    else if (line.startsWith('component ') || line.startsWith('anchor ')) {
      const isAnchor = line.startsWith('anchor ');
      const content = isAnchor ? line.substring(7) : line.substring(10);

      // Match: name [visibility, evolution] or name [visibility, evolution] (label)
      const match = content.match(/^(.+?)\s*\[([0-9.]+)\s*,\s*([0-9.]+)\](?:\s*\((.+)\))?/);

      if (match) {
        const [, name, visibility, evolution, label] = match;
        const component: Component = {
          id: crypto.randomUUID(),
          name: name.trim(),
          type: isAnchor ? 'user' : 'capability',
          position: {
            visibility: parseFloat(visibility),
            evolution: parseFloat(evolution),
          },
        };

        if (label) {
          component.label = { text: label.trim() };
        }

        componentMap.set(name.trim(), component);
        data.components.push(component);
      }
    }
    // Parse connection
    else if (line.includes('->')) {
      const [source, target] = line.split('->').map(s => s.trim());
      const sourceComp = componentMap.get(source);
      const targetComp = componentMap.get(target);

      if (sourceComp && targetComp) {
        const connection: Connection = {
          id: crypto.randomUUID(),
          source: sourceComp.id,
          target: targetComp.id,
          type: 'dependency',
        };
        data.connections.push(connection);
      }
    }
  }

  return data;
}

/**
 * Export internal data structure to MapScript format
 */
export function exportToMapScript(mapData: {
  map: { title: string; purpose?: string; scope?: string };
  components: Component[];
  connections: Connection[];
}): string {
  const lines: string[] = [];

  // Add title
  lines.push(`title ${mapData.map.title}`);

  // Add purpose if exists
  if (mapData.map.purpose) {
    lines.push(`purpose ${mapData.map.purpose}`);
  }

  // Add scope if exists
  if (mapData.map.scope) {
    lines.push(`scope ${mapData.map.scope}`);
  }

  lines.push(''); // Empty line for readability

  // Create component name to ID mapping
  const componentById = new Map<string, Component>();
  mapData.components.forEach(c => componentById.set(c.id, c));

  // Add components
  mapData.components.forEach(comp => {
    const keyword = comp.type === 'user' ? 'anchor' : 'component';
    const visibility = comp.position.visibility.toFixed(2);
    const evolution = comp.position.evolution.toFixed(2);

    let line = `${keyword} ${comp.name} [${visibility}, ${evolution}]`;

    if (comp.label?.text && comp.label.text !== comp.name) {
      line += ` (${comp.label.text})`;
    }

    lines.push(line);
  });

  lines.push(''); // Empty line for readability

  // Add connections
  mapData.connections.forEach(conn => {
    const source = componentById.get(conn.source);
    const target = componentById.get(conn.target);

    if (source && target) {
      lines.push(`${source.name}->${target.name}`);
    }
  });

  return lines.join('\n');
}

/**
 * Download MapScript as .owm file
 */
export function downloadMapScript(mapData: any, filename: string = 'wardley-map.owm'): void {
  const mapScript = exportToMapScript(mapData);
  const blob = new Blob([mapScript], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Import MapScript from .owm file
 */
export async function importMapScript(file: File): Promise<MapScriptData> {
  const text = await file.text();
  return parseMapScript(text);
}
