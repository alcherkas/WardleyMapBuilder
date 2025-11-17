import React, { useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { Grid } from './Grid';
import { MapComponent } from './MapComponent';
import { MapConnection } from './MapConnection';
import { useMapStore } from '../../stores/mapStore';

const CANVAS_PADDING = 80;

interface WardleyCanvasProps {
  width: number;
  height: number;
}

export const WardleyCanvas: React.FC<WardleyCanvasProps> = ({ width, height }) => {
  const stageRef = useRef<any>(null);
  const {
    components,
    connections,
    ui,
    addComponent,
    addConnection,
    updateComponent,
    selectComponent,
    selectComponents,
    deselectAll,
    setZoom,
    setPan,
    startConnectionDrawing,
    cancelConnectionDrawing,
    copySelectedComponents,
    pasteComponents,
    deleteSelectedComponents,
    undo,
    redo,
  } = useMapStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Undo (Ctrl/Cmd+Z)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Redo (Ctrl/Cmd+Shift+Z or Ctrl/Cmd+Y)
      else if ((e.ctrlKey || e.metaKey) && (e.shiftKey && e.key === 'z' || e.key === 'y')) {
        e.preventDefault();
        redo();
      }
      // Copy (Ctrl/Cmd+C)
      else if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        e.preventDefault();
        copySelectedComponents();
      }
      // Paste (Ctrl/Cmd+V)
      else if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        e.preventDefault();
        pasteComponents();
      }
      // Delete (Delete or Backspace)
      else if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        deleteSelectedComponents();
      }
      // Escape - deselect all
      else if (e.key === 'Escape') {
        e.preventDefault();
        deselectAll();
        if (ui.connectionDrawing.isDrawing) {
          cancelConnectionDrawing();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [copySelectedComponents, pasteComponents, deleteSelectedComponents, deselectAll, cancelConnectionDrawing, undo, redo, ui.connectionDrawing.isDrawing]);

  const handleStageClick = (e: any) => {
    // Click on empty area
    if (e.target === e.target.getStage()) {
      if (ui.tool === 'component') {
        // Add new component
        const stage = e.target.getStage();
        const pointerPosition = stage.getPointerPosition();

        const mapWidth = width - CANVAS_PADDING * 2;
        const mapHeight = height - CANVAS_PADDING * 2;

        // Convert canvas coordinates to normalized position (0-1)
        const evolution = Math.max(0, Math.min(1, (pointerPosition.x - CANVAS_PADDING) / mapWidth));
        const visibility = Math.max(0, Math.min(1, (pointerPosition.y - CANVAS_PADDING) / mapHeight));

        const newComponent = {
          id: crypto.randomUUID(),
          name: 'New Component',
          type: 'capability' as const,
          position: {
            evolution,
            visibility,
          },
        };

        addComponent(newComponent);
      } else if (ui.connectionDrawing.isDrawing) {
        // Cancel connection drawing on empty area click
        cancelConnectionDrawing();
      } else {
        deselectAll();
      }
    }
  };

  const handleComponentClick = (componentId: string, shiftKey: boolean = false) => {
    if (ui.tool === 'connection') {
      if (!ui.connectionDrawing.isDrawing) {
        // Start drawing connection from this component
        startConnectionDrawing(componentId);
      } else if (ui.connectionDrawing.sourceId !== componentId) {
        // Complete connection to this component
        const newConnection = {
          id: crypto.randomUUID(),
          source: ui.connectionDrawing.sourceId!,
          target: componentId,
          type: 'dependency' as const,
        };
        addConnection(newConnection);
        cancelConnectionDrawing();
      }
    } else if (ui.tool === 'select') {
      if (shiftKey) {
        // Multi-select with Shift+Click
        if (ui.selectedComponents.includes(componentId)) {
          // Deselect if already selected
          selectComponents(ui.selectedComponents.filter(id => id !== componentId));
        } else {
          // Add to selection
          selectComponents([...ui.selectedComponents, componentId]);
        }
      } else {
        selectComponent(componentId);
      }
    }
  };

  const handleComponentDragEnd = (componentId: string) => (e: any) => {
    const node = e.target;
    const mapWidth = width - CANVAS_PADDING * 2;
    const mapHeight = height - CANVAS_PADDING * 2;

    // Convert canvas coordinates to normalized position (0-1)
    const evolution = Math.max(0, Math.min(1, (node.x() - CANVAS_PADDING) / mapWidth));
    const visibility = Math.max(0, Math.min(1, (node.y() - CANVAS_PADDING) / mapHeight));

    updateComponent(componentId, {
      position: { evolution, visibility },
    });
  };

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.05;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setZoom(newScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    setPan(newPos);
  };

  return (
    <div style={{ background: '#fff', width: '100%', height: '100%' }}>
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        onClick={handleStageClick}
        onWheel={handleWheel}
        scaleX={ui.zoom}
        scaleY={ui.zoom}
        x={ui.pan.x}
        y={ui.pan.y}
      >
        <Grid width={width} height={height} enabled={ui.gridEnabled} />

        <Layer>
          {/* Render connections first (behind components) */}
          {connections.map((connection) => (
            <MapConnection
              key={connection.id}
              connection={connection}
              components={components}
              canvasWidth={width}
              canvasHeight={height}
              isSelected={ui.selectedConnections.includes(connection.id)}
              onSelect={() => {}}
            />
          ))}

          {/* Render components */}
          {components.map((component) => (
            <MapComponent
              key={component.id}
              component={component}
              isSelected={ui.selectedComponents.includes(component.id)}
              onSelect={(e: any) => handleComponentClick(component.id, e?.evt?.shiftKey)}
              onDragEnd={handleComponentDragEnd(component.id)}
              canvasWidth={width}
              canvasHeight={height}
              isConnectionSource={ui.connectionDrawing.sourceId === component.id}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default WardleyCanvas;
