import { Component } from './component';
import { Connection } from './connection';
import { Annotation } from './annotation';

export interface MapSnapshot {
  components: Component[];
  connections: Connection[];
  annotations: Annotation[];
}

export interface WardleyMapState {
  // Map metadata
  map: {
    id: string;
    title: string;
    purpose?: string;
    scope?: string;
    annotations: Annotation[];
    created: Date;
    updated: Date;
  };

  // Components
  components: Component[];

  // Connections
  connections: Connection[];

  // UI state
  ui: {
    selectedComponents: string[];
    selectedConnections: string[];
    zoom: number;
    pan: { x: number; y: number };
    tool: 'select' | 'component' | 'connection' | 'annotation';
    gridEnabled: boolean;
  };

  // History for undo/redo
  history: {
    past: MapSnapshot[];
    future: MapSnapshot[];
  };
}

export type ToolType = 'select' | 'component' | 'connection' | 'annotation';
