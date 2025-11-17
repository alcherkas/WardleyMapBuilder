import React, { useRef } from 'react';
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
    updateComponent,
    selectComponent,
    deselectAll,
    setZoom,
    setPan,
  } = useMapStore();

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
      } else {
        deselectAll();
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
              onSelect={() => selectComponent(component.id)}
              onDragEnd={handleComponentDragEnd(component.id)}
              canvasWidth={width}
              canvasHeight={height}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default WardleyCanvas;
