import React from 'react';
import { Arrow } from 'react-konva';
import { Connection, Component } from '../../types';

interface MapConnectionProps {
  connection: Connection;
  components: Component[];
  canvasWidth: number;
  canvasHeight: number;
  isSelected: boolean;
  onSelect: () => void;
}

const CANVAS_PADDING = 80;

export const MapConnection: React.FC<MapConnectionProps> = ({
  connection,
  components,
  canvasWidth,
  canvasHeight,
  isSelected,
  onSelect,
}) => {
  const sourceComponent = components.find((c) => c.id === connection.source);
  const targetComponent = components.find((c) => c.id === connection.target);

  if (!sourceComponent || !targetComponent) {
    return null;
  }

  const mapWidth = canvasWidth - CANVAS_PADDING * 2;
  const mapHeight = canvasHeight - CANVAS_PADDING * 2;

  const sourceX = CANVAS_PADDING + sourceComponent.position.evolution * mapWidth;
  const sourceY = CANVAS_PADDING + sourceComponent.position.visibility * mapHeight;
  const targetX = CANVAS_PADDING + targetComponent.position.evolution * mapWidth;
  const targetY = CANVAS_PADDING + targetComponent.position.visibility * mapHeight;

  const color = connection.style?.color || '#666';
  const width = connection.style?.width || 2;
  const dashed = connection.style?.dashed || false;

  return (
    <Arrow
      points={[sourceX, sourceY, targetX, targetY]}
      stroke={color}
      strokeWidth={isSelected ? width + 2 : width}
      fill={color}
      dash={dashed ? [10, 5] : undefined}
      onClick={onSelect}
      onTap={onSelect}
      pointerLength={8}
      pointerWidth={8}
    />
  );
};
