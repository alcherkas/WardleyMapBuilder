import { create } from 'zustand';
import { Component, Connection, Annotation, ToolType } from '../types';

interface MapStore {
  // Map metadata
  map: {
    id: string;
    title: string;
    purpose?: string;
    scope?: string;
  };

  // Components
  components: Component[];

  // Connections
  connections: Connection[];

  // Annotations
  annotations: Annotation[];

  // UI state
  ui: {
    selectedComponents: string[];
    selectedConnections: string[];
    zoom: number;
    pan: { x: number; y: number };
    tool: ToolType;
    gridEnabled: boolean;
  };

  // Actions
  setTitle: (title: string) => void;
  setPurpose: (purpose: string) => void;
  setScope: (scope: string) => void;

  // Component actions
  addComponent: (component: Component) => void;
  updateComponent: (id: string, updates: Partial<Component>) => void;
  deleteComponent: (id: string) => void;

  // Connection actions
  addConnection: (connection: Connection) => void;
  updateConnection: (id: string, updates: Partial<Connection>) => void;
  deleteConnection: (id: string) => void;

  // Annotation actions
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (id: string, updates: Partial<Annotation>) => void;
  deleteAnnotation: (id: string) => void;

  // Selection actions
  selectComponent: (id: string) => void;
  selectComponents: (ids: string[]) => void;
  deselectAll: () => void;

  // UI actions
  setTool: (tool: ToolType) => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  toggleGrid: () => void;

  // File operations
  loadMap: (mapData: any) => void;
  exportMap: () => any;
  resetMap: () => void;
}

const initialState = {
  map: {
    id: crypto.randomUUID(),
    title: 'Untitled Wardley Map',
    purpose: undefined,
    scope: undefined,
  },
  components: [],
  connections: [],
  annotations: [],
  ui: {
    selectedComponents: [],
    selectedConnections: [],
    zoom: 1,
    pan: { x: 0, y: 0 },
    tool: 'select' as ToolType,
    gridEnabled: true,
  },
};

export const useMapStore = create<MapStore>((set, get) => ({
  ...initialState,

  // Map metadata actions
  setTitle: (title) => set((state) => ({
    map: { ...state.map, title }
  })),

  setPurpose: (purpose) => set((state) => ({
    map: { ...state.map, purpose }
  })),

  setScope: (scope) => set((state) => ({
    map: { ...state.map, scope }
  })),

  // Component actions
  addComponent: (component) => set((state) => ({
    components: [...state.components, component],
  })),

  updateComponent: (id, updates) => set((state) => ({
    components: state.components.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    ),
  })),

  deleteComponent: (id) => set((state) => ({
    components: state.components.filter((c) => c.id !== id),
    connections: state.connections.filter((conn) =>
      conn.source !== id && conn.target !== id
    ),
    ui: {
      ...state.ui,
      selectedComponents: state.ui.selectedComponents.filter((cid) => cid !== id),
    },
  })),

  // Connection actions
  addConnection: (connection) => set((state) => ({
    connections: [...state.connections, connection],
  })),

  updateConnection: (id, updates) => set((state) => ({
    connections: state.connections.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    ),
  })),

  deleteConnection: (id) => set((state) => ({
    connections: state.connections.filter((c) => c.id !== id),
    ui: {
      ...state.ui,
      selectedConnections: state.ui.selectedConnections.filter((cid) => cid !== id),
    },
  })),

  // Annotation actions
  addAnnotation: (annotation) => set((state) => ({
    annotations: [...state.annotations, annotation],
  })),

  updateAnnotation: (id, updates) => set((state) => ({
    annotations: state.annotations.map((a) =>
      a.id === id ? { ...a, ...updates } : a
    ),
  })),

  deleteAnnotation: (id) => set((state) => ({
    annotations: state.annotations.filter((a) => a.id !== id),
  })),

  // Selection actions
  selectComponent: (id) => set((state) => ({
    ui: {
      ...state.ui,
      selectedComponents: [id],
      selectedConnections: [],
    },
  })),

  selectComponents: (ids) => set((state) => ({
    ui: {
      ...state.ui,
      selectedComponents: ids,
      selectedConnections: [],
    },
  })),

  deselectAll: () => set((state) => ({
    ui: {
      ...state.ui,
      selectedComponents: [],
      selectedConnections: [],
    },
  })),

  // UI actions
  setTool: (tool) => set((state) => ({
    ui: { ...state.ui, tool },
  })),

  setZoom: (zoom) => set((state) => ({
    ui: { ...state.ui, zoom: Math.max(0.1, Math.min(5, zoom)) },
  })),

  setPan: (pan) => set((state) => ({
    ui: { ...state.ui, pan },
  })),

  toggleGrid: () => set((state) => ({
    ui: { ...state.ui, gridEnabled: !state.ui.gridEnabled },
  })),

  // File operations
  loadMap: (mapData) => set({
    map: mapData.map || initialState.map,
    components: mapData.components || [],
    connections: mapData.connections || [],
    annotations: mapData.annotations || [],
  }),

  exportMap: () => {
    const state = get();
    return {
      map: state.map,
      components: state.components,
      connections: state.connections,
      annotations: state.annotations,
    };
  },

  resetMap: () => set(initialState),
}));
