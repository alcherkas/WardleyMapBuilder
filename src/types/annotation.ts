export interface Annotation {
  id: string;
  type: 'note' | 'area' | 'arrow';
  content: string;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  style?: {
    color?: string;
    backgroundColor?: string;
  };
}
