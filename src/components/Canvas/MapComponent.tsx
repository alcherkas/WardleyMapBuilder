import React from 'react';
import { Circle, Text, Group } from 'react-konva';
import { Component } from '../../types';

interface MapComponentProps {
  component: Component;
  isSelected: boolean;
  onSelect: (e: any) => void;
  onDragEnd: (e: any) => void;
  canvasWidth: number;
  canvasHeight: number;
  isConnectionSource?: boolean;
}

const CANVAS_PADDING = 80;

export const MapComponent: React.FC<MapComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onDragEnd,
  canvasWidth,
  canvasHeight,
  isConnectionSource = false,
}) => {
  const mapWidth = canvasWidth - CANVAS_PADDING * 2;
  const mapHeight = canvasHeight - CANVAS_PADDING * 2;

  // Convert normalized position (0-1) to canvas coordinates
  const x = CANVAS_PADDING + component.position.evolution * mapWidth;
  const y = CANVAS_PADDING + component.position.visibility * mapHeight;

  const radius = component.style?.size || 8;
  const color = component.style?.color || '#3b82f6';

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={onDragEnd}
      onClick={onSelect}
      onTap={onSelect}
    >
      <Circle
        radius={radius}
        fill={color}
        stroke={isConnectionSource ? '#10b981' : (isSelected ? '#000' : '#fff')}
        strokeWidth={isConnectionSource ? 4 : (isSelected ? 3 : 2)}
        shadowColor="black"
        shadowBlur={5}
        shadowOpacity={0.3}
        shadowOffsetY={2}
      />
      <Text
        text={component.name}
        fontSize={12}
        fill="#333"
        offsetX={-radius - 5}
        offsetY={-radius - 15}
        fontStyle="bold"
      />
    </Group>
  );
};
