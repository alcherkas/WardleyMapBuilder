import { Layer, Line, Text } from 'react-konva';

interface GridProps {
  width: number;
  height: number;
  enabled: boolean;
}

const CANVAS_PADDING = 80;

export const Grid: React.FC<GridProps> = ({ width, height, enabled }) => {
  const lines: JSX.Element[] = [];
  const gridSize = 50;

  if (enabled) {
    // Vertical lines
    for (let i = 0; i < width / gridSize; i++) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[i * gridSize, 0, i * gridSize, height]}
          stroke="#e0e0e0"
          strokeWidth={1}
        />
      );
    }

    // Horizontal lines
    for (let i = 0; i < height / gridSize; i++) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, i * gridSize, width, i * gridSize]}
          stroke="#e0e0e0"
          strokeWidth={1}
        />
      );
    }
  }

  // Wardley Map axes
  const mapWidth = width - CANVAS_PADDING * 2;
  const mapHeight = height - CANVAS_PADDING * 2;
  const startX = CANVAS_PADDING;
  const startY = CANVAS_PADDING;

  return (
    <Layer>
      {/* Grid lines */}
      {lines}

      {/* X-axis (Evolution) */}
      <Line
        points={[startX, startY + mapHeight, startX + mapWidth, startY + mapHeight]}
        stroke="#333"
        strokeWidth={2}
      />

      {/* Y-axis (Value Chain) */}
      <Line
        points={[startX, startY, startX, startY + mapHeight]}
        stroke="#333"
        strokeWidth={2}
      />

      {/* X-axis label */}
      <Text
        x={startX + mapWidth / 2 - 40}
        y={startY + mapHeight + 30}
        text="Evolution"
        fontSize={14}
        fill="#333"
        fontStyle="bold"
      />

      {/* Evolution stage labels */}
      <Text
        x={startX + 10}
        y={startY + mapHeight + 10}
        text="Genesis"
        fontSize={11}
        fill="#666"
      />
      <Text
        x={startX + mapWidth * 0.25 - 20}
        y={startY + mapHeight + 10}
        text="Custom"
        fontSize={11}
        fill="#666"
      />
      <Text
        x={startX + mapWidth * 0.5 - 20}
        y={startY + mapHeight + 10}
        text="Product"
        fontSize={11}
        fill="#666"
      />
      <Text
        x={startX + mapWidth * 0.75 - 30}
        y={startY + mapHeight + 10}
        text="Commodity"
        fontSize={11}
        fill="#666"
      />

      {/* Y-axis label (rotated) */}
      <Text
        x={10}
        y={startY + mapHeight / 2 - 30}
        text="Value Chain"
        fontSize={14}
        fill="#333"
        fontStyle="bold"
        rotation={-90}
      />

      {/* Value chain labels */}
      <Text
        x={startX - 70}
        y={startY + 5}
        text="Visible"
        fontSize={11}
        fill="#666"
      />
      <Text
        x={startX - 70}
        y={startY + mapHeight - 15}
        text="Invisible"
        fontSize={11}
        fill="#666"
      />
    </Layer>
  );
};
