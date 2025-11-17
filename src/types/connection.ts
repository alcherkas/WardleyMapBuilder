export interface Connection {
  id: string;
  source: string;  // Component ID
  target: string;  // Component ID
  type: 'dependency' | 'flow' | 'evolution';

  // Visual properties
  style?: {
    color?: string;
    width?: number;
    dashed?: boolean;
  };

  // Metadata
  label?: string;
  notes?: string;
}
