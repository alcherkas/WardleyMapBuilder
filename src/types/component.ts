export interface Component {
  id: string;
  name: string;
  type: 'user' | 'need' | 'capability';

  // Position
  position: {
    visibility: number;  // 0-1 (Y-axis, 0=top/visible, 1=bottom/invisible)
    evolution: number;   // 0-1 (X-axis, 0=genesis, 1=commodity)
  };

  // Visual properties
  label?: {
    text: string;
    offset?: { x: number; y: number };
  };

  // Metadata
  inertia?: number;
  pipeline?: boolean;
  outsource?: boolean;
  build?: boolean;
  buy?: boolean;

  // Styling
  style?: {
    color?: string;
    size?: number;
    shape?: 'circle' | 'square' | 'custom';
  };

  // Comments
  notes?: string;
}
