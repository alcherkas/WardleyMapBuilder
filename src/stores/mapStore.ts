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

  // Clipboard
  clipboard: {
    components: Component[];
    connections: Connection[];
  };

  // History for undo/redo
  history: {
    past: Array<{
      components: Component[];
      connections: Connection[];
      annotations: Annotation[];
    }>;
    future: Array<{
      components: Component[];
      connections: Connection[];
      annotations: Annotation[];
    }>;
  };

  // UI state
  ui: {
    selectedComponents: string[];
    selectedConnections: string[];
    zoom: number;
    pan: { x: number; y: number };
    tool: ToolType;
    gridEnabled: boolean;
    connectionDrawing: {
      isDrawing: boolean;
      sourceId: string | null;
    };
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

  // Clipboard actions
  copySelectedComponents: () => void;
  pasteComponents: () => void;
  deleteSelectedComponents: () => void;

  // UI actions
  setTool: (tool: ToolType) => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  toggleGrid: () => void;
  startConnectionDrawing: (sourceId: string) => void;
  cancelConnectionDrawing: () => void;

  // File operations
  loadMap: (mapData: any) => void;
  exportMap: () => any;
  resetMap: () => void;

  // History operations
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
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
  clipboard: {
    components: [],
    connections: [],
  },
  history: {
    past: [],
    future: [],
  },
  ui: {
    selectedComponents: [],
    selectedConnections: [],
    zoom: 1,
    pan: { x: 0, y: 0 },
    tool: 'select' as ToolType,
    gridEnabled: true,
    connectionDrawing: {
      isDrawing: false,
      sourceId: null,
    },
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
  addComponent: (component) => {
    get().saveHistory();
    set((state) => ({
      components: [...state.components, component],
    }));
  },

  updateComponent: (id, updates) => set((state) => ({
    components: state.components.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    ),
  })),

  deleteComponent: (id) => {
    get().saveHistory();
    set((state) => ({
      components: state.components.filter((c) => c.id !== id),
      connections: state.connections.filter((conn) =>
        conn.source !== id && conn.target !== id
      ),
      ui: {
        ...state.ui,
        selectedComponents: state.ui.selectedComponents.filter((cid) => cid !== id),
      },
    }));
  },

  // Connection actions
  addConnection: (connection) => {
    get().saveHistory();
    set((state) => ({
      connections: [...state.connections, connection],
    }));
  },

  updateConnection: (id, updates) => set((state) => ({
    connections: state.connections.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    ),
  })),

  deleteConnection: (id) => {
    get().saveHistory();
    set((state) => ({
      connections: state.connections.filter((c) => c.id !== id),
      ui: {
        ...state.ui,
        selectedConnections: state.ui.selectedConnections.filter((cid) => cid !== id),
      },
    }));
  },

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

  startConnectionDrawing: (sourceId) => set((state) => ({
    ui: {
      ...state.ui,
      connectionDrawing: {
        isDrawing: true,
        sourceId,
      },
    },
  })),

  cancelConnectionDrawing: () => set((state) => ({
    ui: {
      ...state.ui,
      connectionDrawing: {
        isDrawing: false,
        sourceId: null,
      },
    },
  })),

  // Clipboard actions
  copySelectedComponents: () => set((state) => {
    const selectedComps = state.components.filter(c =>
      state.ui.selectedComponents.includes(c.id)
    );
    const selectedCompIds = new Set(state.ui.selectedComponents);
    const selectedConns = state.connections.filter(conn =>
      selectedCompIds.has(conn.source) && selectedCompIds.has(conn.target)
    );
    return {
      clipboard: {
        components: selectedComps,
        connections: selectedConns,
      },
    };
  }),

  pasteComponents: () => {
    const state = get();
    if (state.clipboard.components.length === 0) return;

    get().saveHistory();
    set((state) => {
      // Create ID mapping for pasted components
      const idMap = new Map<string, string>();
      const newComponents = state.clipboard.components.map(comp => {
        const newId = crypto.randomUUID();
        idMap.set(comp.id, newId);
        return {
          ...comp,
          id: newId,
          position: {
            evolution: Math.min(1, comp.position.evolution + 0.05),
            visibility: Math.min(1, comp.position.visibility + 0.05),
          },
        };
      });

      // Update connection IDs
      const newConnections = state.clipboard.connections.map(conn => ({
        ...conn,
        id: crypto.randomUUID(),
        source: idMap.get(conn.source) || conn.source,
        target: idMap.get(conn.target) || conn.target,
      }));

      return {
        components: [...state.components, ...newComponents],
        connections: [...state.connections, ...newConnections],
        ui: {
          ...state.ui,
          selectedComponents: newComponents.map(c => c.id),
        },
      };
    });
  },

  deleteSelectedComponents: () => {
    const state = get();
    if (state.ui.selectedComponents.length === 0) return;

    get().saveHistory();
    set((state) => {
      const selectedIds = new Set(state.ui.selectedComponents);
      return {
        components: state.components.filter(c => !selectedIds.has(c.id)),
        connections: state.connections.filter(conn =>
          !selectedIds.has(conn.source) && !selectedIds.has(conn.target)
        ),
        ui: {
          ...state.ui,
          selectedComponents: [],
        },
      };
    });
  },

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

  // History operations
  saveHistory: () => set((state) => {
    const snapshot = {
      components: state.components,
      connections: state.connections,
      annotations: state.annotations,
    };
    return {
      history: {
        past: [...state.history.past, snapshot],
        future: [], // Clear future when new action is performed
      },
    };
  }),

  undo: () => set((state) => {
    if (state.history.past.length === 0) return state;

    const previous = state.history.past[state.history.past.length - 1];
    const newPast = state.history.past.slice(0, -1);

    const currentSnapshot = {
      components: state.components,
      connections: state.connections,
      annotations: state.annotations,
    };

    return {
      components: previous.components,
      connections: previous.connections,
      annotations: previous.annotations,
      history: {
        past: newPast,
        future: [currentSnapshot, ...state.history.future],
      },
      ui: {
        ...state.ui,
        selectedComponents: [],
        selectedConnections: [],
      },
    };
  }),

  redo: () => set((state) => {
    if (state.history.future.length === 0) return state;

    const next = state.history.future[0];
    const newFuture = state.history.future.slice(1);

    const currentSnapshot = {
      components: state.components,
      connections: state.connections,
      annotations: state.annotations,
    };

    return {
      components: next.components,
      connections: next.connections,
      annotations: next.annotations,
      history: {
        past: [...state.history.past, currentSnapshot],
        future: newFuture,
      },
      ui: {
        ...state.ui,
        selectedComponents: [],
        selectedConnections: [],
      },
    };
  }),
}));
