# Wardley Mapping React Application - Research Document

## Table of Contents
1. [Overview of Wardley Mapping](#overview-of-wardley-mapping)
2. [Core Concepts and Components](#core-concepts-and-components)
3. [Technical Requirements](#technical-requirements)
4. [Visualization Libraries](#visualization-libraries)
5. [State Management](#state-management)
6. [Data Structures and Formats](#data-structures-and-formats)
7. [Export/Import Capabilities](#exportimport-capabilities)
8. [Interaction Patterns and UX](#interaction-patterns-and-ux)
9. [Accessibility Considerations](#accessibility-considerations)
10. [Testing Strategies](#testing-strategies)
11. [Real-time Collaboration](#real-time-collaboration)
12. [Existing Tools and Implementations](#existing-tools-and-implementations)
13. [Recommended Technology Stack](#recommended-technology-stack)
14. [Implementation Roadmap](#implementation-roadmap)

---

## Overview of Wardley Mapping

### What is Wardley Mapping?

Wardley Mapping is a strategic visualization technique created by Simon Wardley that helps leaders see their value chain, anticipate change, and outmaneuver competitors. It's a powerful lens for strategic planning that provides context on how an environment is changing.

### Key Benefits

- **Strategic Clarity**: Visualizes the entire value chain from user needs to underlying capabilities
- **Evolution Awareness**: Shows how components evolve from genesis to commodity
- **Decision Support**: Helps identify where to invest, build, or buy
- **Communication Tool**: Enables strategic conversations across teams and organizations

### Learning Resources

- [LearnWardleyMapping.com](https://learnwardleymapping.com/) - #1 most approachable way to learn
- [WardleyMaps.com](https://www.wardleymaps.com/) - Official resource hub
- [Mapping 101: A Beginner's Guide](https://www.wardleymaps.com/guides/wardley-mapping-101)

---

## Core Concepts and Components

### The Two Axes

#### Y-Axis: Value Chain (Visibility)
- **Position**: Vertical dimension
- **Meaning**: Component's position within the value chain and visibility to end-user
- **Top**: User needs (most visible)
- **Bottom**: Infrastructure components (least visible to users)
- **Range**: 0 (top/visible) to 1 (bottom/invisible)

#### X-Axis: Evolution
- **Position**: Horizontal dimension
- **Meaning**: Maturity or evolution stage of a component
- **Left**: Genesis (new, unproven, uncertain)
- **Right**: Commodity (standardized, widely available)
- **Range**: 0 (genesis) to 1 (commodity)

### Evolution Stages

1. **Genesis** (0.0 - 0.25)
   - Completely new and unproven concepts
   - Rare, high risk of failure
   - Uncertain and constantly changing
   - Custom-built for specific needs

2. **Custom Built** (0.25 - 0.5)
   - Tailored solutions
   - More understood but still evolving
   - Requires specialized knowledge

3. **Product (+Rental)** (0.5 - 0.75)
   - Productized offerings
   - Competitive market
   - Standardized features
   - Off-the-shelf solutions

4. **Commodity (+Utility)** (0.75 - 1.0)
   - Widely available and standardized
   - Known, common, stable
   - Low risk of failure
   - Utility services (pay-per-use)

### Component Types

**Three kinds of components:**

1. **Users**: At the top of the map (anchor point)
2. **Needs**: Any component connecting directly to a user
3. **Capabilities**: Components connecting to needs (but never directly to users)

### Connections

- **Dependencies**: Lines showing which components depend on others
- **Direction**: Typically drawn from higher-level (needs) to lower-level (capabilities)
- **Properties**: May include inertia, comments, flow indicators

### Additional Elements

- **Anchors**: User or business anchors that define the purpose
- **Annotations**: Notes and comments on specific areas
- **Pipelines**: Components in development
- **Inertia**: Resistance to change indicators
- **Subgraphs/Ecosystems**: Grouped related components

---

## Technical Requirements

### Core Features Needed

1. **Canvas/Drawing Surface**
   - Scalable rendering (SVG or Canvas)
   - Zoom and pan capabilities
   - Grid/snap-to-grid option
   - Responsive design

2. **Component Management**
   - Create/edit/delete components
   - Position components on both axes
   - Label components
   - Style components (color, size, shape)

3. **Connection Management**
   - Draw lines between components
   - Different connection types (dependency, flow)
   - Curved or straight lines
   - Arrow indicators

4. **User Interaction**
   - Drag-and-drop components
   - Click to select
   - Multi-select
   - Context menus
   - Keyboard shortcuts
   - Undo/redo

5. **Map Metadata**
   - Map title
   - Purpose/scope
   - Annotations
   - Evolution axis labels
   - Value chain labels

6. **File Operations**
   - Save/load maps
   - Export (PNG, SVG, JSON)
   - Import from various formats
   - Version control compatibility

---

## Visualization Libraries

### Recommended Libraries

#### 1. React Konva (Highly Recommended)
- **Description**: JavaScript library for drawing complex canvas graphics using React
- **Pros**:
  - Declarative and reactive bindings
  - Excellent performance with Canvas
  - Built-in drag-and-drop
  - Export to image capabilities
- **Cons**:
  - Canvas-based (not SVG)
  - Larger learning curve
- **Use Case**: Best for interactive, performance-critical applications
- **Installation**: `npm install react-konva konva`
- **Export**: `stageRef.current.toDataURL()` for PNG export

#### 2. React Flow (XyFlow)
- **Description**: Highly customizable React component for node-based UIs
- **Pros**:
  - Built for interactive graphs
  - Excellent drag-and-drop
  - Built-in zoom/pan
  - Good accessibility support
  - TypeScript support
- **Cons**:
  - Opinionated structure
  - May need customization for Wardley-specific features
- **Use Case**: Great foundation for node-based diagrams
- **Installation**: `npm install reactflow`

#### 3. D3.js with React
- **Description**: Powerful data visualization library
- **Pros**:
  - Maximum flexibility
  - SVG-based
  - Extensive visualization capabilities
  - Large community
- **Cons**:
  - Steeper learning curve
  - Can conflict with React's virtual DOM
  - More manual work required
- **Use Case**: When you need complete control over rendering
- **Best Practice**: Use D3 for calculations, React for rendering
- **Libraries**:
  - **Visx**: React + D3 wrapper
  - **Recharts**: Simplified D3 + React

#### 4. Plain SVG with React
- **Pros**:
  - Full control
  - No additional dependencies
  - SEO-friendly
  - Accessible
- **Cons**:
  - Manual implementation of interactions
  - Performance issues with many elements
- **Use Case**: Simple maps, lightweight applications

### Chart/Visualization Libraries (2025)

- **Recharts**: Simple, clean SVG rendering
- **Nivo**: Versatile, supports SVG, Canvas, and HTML
- **TanStack Charts**: Headless core with flexible rendering
- **React-Vis**: Both SVG and Canvas support

### SVG vs Canvas Performance

- **SVG**:
  - Better for accessibility
  - Fine-grained control over elements
  - Good for smaller datasets
  - Easier to export and manipulate

- **Canvas**:
  - Better performance for large datasets
  - Harder to make accessible
  - Better for real-time updates

---

## State Management

### Recommended Solutions (2025)

#### 1. Zustand (Highly Recommended)
- **Description**: Small, fast, scalable state management
- **Pros**:
  - Minimal boilerplate
  - Simple API
  - Great performance
  - No provider hell
  - Excellent TypeScript support
- **Cons**:
  - Less structured than Redux
- **Use Case**: 90% of SaaS platforms, MVPs, enterprise dashboards
- **Installation**: `npm install zustand`
- **Best For**: Medium to large apps that hate boilerplate

```javascript
import create from 'zustand'

const useMapStore = create((set) => ({
  components: [],
  connections: [],
  addComponent: (component) => set((state) => ({
    components: [...state.components, component]
  })),
  updateComponent: (id, updates) => set((state) => ({
    components: state.components.map(c =>
      c.id === id ? { ...c, ...updates } : c
    )
  }))
}))
```

#### 2. Redux Toolkit
- **Description**: Simplified Redux with modern features
- **Pros**:
  - Battle-tested
  - Excellent DevTools
  - Built-in async handling (RTK Query)
  - Time-travel debugging
- **Cons**:
  - More boilerplate than Zustand
  - Steeper learning curve
- **Use Case**: Large enterprise apps with complex state
- **Installation**: `npm install @reduxjs/toolkit react-redux`

#### 3. React Context + useReducer
- **Pros**:
  - Built-in to React
  - No dependencies
  - Good for simple cases
- **Cons**:
  - Performance issues with frequent updates
  - Re-render problems
- **Use Case**: Small apps, simple state

#### 4. Jotai
- **Description**: Atomic state management
- **Pros**:
  - Minimal API
  - Atomic approach
  - Great TypeScript support
- **Use Case**: Apps that need fine-grained reactivity

### State Structure for Wardley Maps

```typescript
interface WardleyMapState {
  // Map metadata
  map: {
    id: string;
    title: string;
    purpose?: string;
    scope?: string;
    annotations: Annotation[];
    created: Date;
    updated: Date;
  };

  // Components
  components: Component[];

  // Connections
  connections: Connection[];

  // UI state
  ui: {
    selectedComponents: string[];
    selectedConnections: string[];
    zoom: number;
    pan: { x: number; y: number };
    tool: 'select' | 'component' | 'connection' | 'annotation';
    gridEnabled: boolean;
  };

  // History for undo/redo
  history: {
    past: MapSnapshot[];
    future: MapSnapshot[];
  };
}
```

---

## Data Structures and Formats

### Component Data Structure

```typescript
interface Component {
  id: string;
  name: string;
  type: 'user' | 'need' | 'capability';

  // Position
  position: {
    visibility: number;  // 0-1 (Y-axis)
    evolution: number;   // 0-1 (X-axis)
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
```

### Connection Data Structure

```typescript
interface Connection {
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
```

### Annotation Data Structure

```typescript
interface Annotation {
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
```

### MapScript Format

MapScript is a text-based format for defining Wardley Maps as code:

**Syntax Rules:**
- Single words as components (use underscores for multi-word)
- TABs (not spaces) after colons
- Evolution stages: `genesis`, `custom`, `product`, `utility`
- Position within stage: `:1` through `:9` (left to right)

**Example:**
```
title Cup of Tea
anchor Business [0.95, 0.63]
anchor Public [0.95, 0.78]
component Cup of Tea [0.79, 0.61]
component Customer [0.95, 0.59]
component Water [0.38, 0.82]
component Tea [0.63, 0.81]
component Kettle [0.43, 0.35]
Customer->Cup of Tea
Cup of Tea->Tea
Cup of Tea->Water
Tea->Water
```

### JSON Format

While there's no uniform standard for Wardley Maps JSON format, common structure:

```json
{
  "title": "Map Title",
  "anchors": [
    { "name": "User", "visibility": 0.95, "evolution": 0.5 }
  ],
  "components": [
    {
      "id": "comp-1",
      "name": "Component Name",
      "maturity": 0.5,
      "visibility": 0.7
    }
  ],
  "links": [
    { "source": "comp-1", "target": "comp-2" }
  ],
  "annotations": [],
  "notes": ""
}
```

**Normalization:**
- Visibility: 0 (top) to 1 (bottom)
- Maturity/Evolution: 0.1 (genesis middle) to 0.95 (utility)

---

## Export/Import Capabilities

### Export Formats

#### 1. PNG Export
- **Libraries**:
  - `save-svg-as-png`: Convert SVG to PNG
  - React Konva: `stageRef.current.toDataURL()`
- **Usage**:
```javascript
import { saveSvgAsPng } from 'save-svg-as-png';
saveSvgAsPng(document.getElementById("map"), "wardley-map.png");
```

#### 2. SVG Export
- **Native SVG**: Can be serialized directly
- **React Konva**: Use `react-konva-to-svg` library
- **Benefits**: Vector format, scalable, editable

#### 3. JSON Export
- **Purpose**: Save/load maps, version control
- **Format**: Application-specific or MapScript-compatible
- **Implementation**: `JSON.stringify(mapState)`

#### 4. MapScript Export
- **Purpose**: Interoperability with other tools
- **Format**: Text-based, human-readable
- **Tools**: OnlineWardleyMaps, VSCode extension

### Import Capabilities

1. **JSON Import**: Parse and validate structure
2. **MapScript Parser**: Convert MapScript to internal format
3. **Image Import**: Potential OCR/ML for map digitization
4. **URL Import**: Load from online services

### File Operations Library

```javascript
// Export utilities
export const exportToPNG = async (ref, filename) => {
  const dataUrl = ref.current.toDataURL({ pixelRatio: 2 });
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};

export const exportToJSON = (mapState) => {
  const json = JSON.stringify(mapState, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = 'wardley-map.json';
  link.href = url;
  link.click();
};

export const exportToMapScript = (mapState) => {
  // Convert internal format to MapScript syntax
  let script = `title ${mapState.map.title}\n\n`;
  // ... conversion logic
  return script;
};
```

---

## Interaction Patterns and UX

### Drawing Workflow

Based on Ben Mosior's Wardley Mapping Canvas, the workflow should support:

1. **Purpose**: Define why we're mapping
2. **Scope**: Set boundaries
3. **Users**: Identify who the map is for
4. **User Needs**: Define what users need
5. **Value Chain**: Map the components
6. **Evolution**: Position on evolution axis

### User Interactions

#### Pan and Zoom
- **Zoom Methods**:
  - Mouse wheel / trackpad scroll (default enabled)
  - Double-click to reset zoom
  - Pinch gesture on touch devices
  - Zoom toolbar buttons (+/-)

- **Pan Methods**:
  - Click and drag (with pan tool or holding spacebar)
  - Pan key: Alt, Ctrl, Shift, or Meta
  - Touch drag on mobile

#### Component Manipulation
- **Create**: Click tool + click canvas OR drag from palette
- **Move**: Click and drag component
- **Edit**: Double-click to edit label
- **Delete**: Select + Delete key OR context menu
- **Multi-select**:
  - Shift+click individual components
  - Click-drag selection box

#### Connection Drawing
- **Create**: Click source component, drag to target
- **Edit**: Click connection to select, drag endpoints to reconnect
- **Delete**: Select + Delete key

#### Keyboard Shortcuts
- **Ctrl/Cmd + Z**: Undo
- **Ctrl/Cmd + Shift + Z**: Redo
- **Delete/Backspace**: Delete selected
- **Ctrl/Cmd + A**: Select all
- **Ctrl/Cmd + C**: Copy
- **Ctrl/Cmd + V**: Paste
- **Escape**: Deselect / Cancel operation
- **Space**: Pan mode toggle
- **1-9**: Quick evolution stage positioning

#### Context Menus
- Right-click component: Edit, Delete, Duplicate, Change Style
- Right-click canvas: Add Component, Paste, Reset Zoom
- Right-click connection: Edit, Delete, Change Style

### Toolbar Design

**Tool Modes:**
1. Select (default)
2. Add Component
3. Add Connection
4. Add Annotation
5. Pan
6. Zoom

**Actions:**
- Undo/Redo
- Zoom controls (+, -, fit)
- Grid toggle
- Export options
- Settings

### Mobile Considerations
- Touch-friendly component sizes
- Gesture support (pinch, drag)
- Responsive toolbar
- Simplified interactions

---

## Accessibility Considerations

### WCAG Compliance

#### Keyboard Navigation
- **Tab Navigation**: Move focus between interactive elements
- **Arrow Keys**: Move selected components
- **Enter/Space**: Activate/edit component
- **Escape**: Cancel/deselect

**Implementation:**
```javascript
// React component example
<div
  role="img"
  aria-label={`Wardley Map: ${mapTitle}`}
  tabIndex={0}
  onKeyDown={handleKeyboardNavigation}
>
  {components.map(comp => (
    <Component
      key={comp.id}
      {...comp}
      tabIndex={0}
      aria-label={`Component: ${comp.name}, Evolution: ${comp.evolution}, Visibility: ${comp.visibility}`}
    />
  ))}
</div>
```

#### SVG Accessibility
- Add `role="img"` to SVG elements
- Include `<title>` and `<desc>` tags
- Use `aria-label` for interactive elements
- Add `focusable="false"` to decorative SVG children (IE bug fix)

```jsx
<svg role="img" aria-labelledby="map-title map-desc">
  <title id="map-title">Wardley Map: {mapTitle}</title>
  <desc id="map-desc">Strategic map showing {componentCount} components</desc>
  {/* Map content */}
</svg>
```

#### Canvas Accessibility
- Canvas is not inherently accessible
- Provide text alternatives
- Use ARIA live regions for dynamic updates
- Consider dual rendering (canvas + hidden DOM elements)

#### Color Contrast
- Ensure text has sufficient contrast (WCAG AA: 4.5:1)
- Don't rely solely on color to convey information
- Provide pattern/texture alternatives

#### Screen Reader Support
- Announce component additions/deletions
- Describe position changes
- Provide text summary of map structure

---

## Testing Strategies

### Unit Testing

#### Jest Configuration for SVG/Canvas
```javascript
// jest.config.js
module.exports = {
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/svgMock.js'
  },
  transform: {
    '^.+\\.svg$': 'jest-svg-transformer'
  }
};
```

#### Testing React Components
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('adds component to map', async () => {
  const user = userEvent.setup();
  render(<WardleyMap />);

  const addButton = screen.getByRole('button', { name: /add component/i });
  await user.click(addButton);

  // Assert component was added
});
```

#### Testing SVG Elements
```javascript
test('renders component on map', () => {
  render(<WardleyMap components={mockComponents} />);

  // Query by title for SVG components
  const component = screen.getByTitle('Test Component');
  expect(component).toBeInTheDocument();
});
```

### Integration Testing

- **Testing Library**: `@testing-library/react`
- **User Interactions**: `@testing-library/user-event`
- **Canvas Testing**: Mock canvas context or use `jest-canvas-mock`

### E2E Testing

- **Playwright** or **Cypress** for end-to-end testing
- Test complete workflows: create map, add components, export
- Visual regression testing for rendering

### Performance Testing

- **React DevTools Profiler**: Identify re-render issues
- **Lighthouse**: Performance metrics
- **Bundle Analyzer**: Check bundle size

### Testing Drag and Drop

```javascript
import { DndContext } from '@dnd-kit/core';

test('drags component to new position', async () => {
  const user = userEvent.setup();
  render(
    <DndContext>
      <WardleyMap />
    </DndContext>
  );

  const component = screen.getByText('Component Name');
  await user.pointer([
    { keys: '[MouseLeft>]', target: component },
    { coords: { x: 100, y: 200 } },
    { keys: '[/MouseLeft]' }
  ]);

  // Assert new position
});
```

---

## Real-time Collaboration

### Technologies

#### CRDT (Conflict-free Replicated Data Types)
- **Best Choice**: Ensures consistency without conflicts
- **Library**: Yjs (recommended)

#### Yjs Implementation
- **Description**: Framework for real-time P2P shared editing
- **Features**:
  - Automatic conflict resolution
  - Offline support
  - Editor bindings available
  - WebSocket and WebRTC providers

**Installation:**
```bash
npm install yjs y-websocket
```

**Basic Setup:**
```javascript
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// Create shared document
const ydoc = new Y.Doc();

// Create shared types
const yComponents = ydoc.getArray('components');
const yConnections = ydoc.getArray('connections');

// Connect to WebSocket server
const provider = new WebsocketProvider(
  'ws://localhost:1234',
  'wardley-map-room',
  ydoc
);

// Listen to changes
yComponents.observe(event => {
  // Update React state
  setComponents(yComponents.toArray());
});
```

#### WebSocket for Simple Sync
- **Libraries**: Socket.io, ws
- **Use Case**: Simpler apps without offline support
- **Cons**: Manual conflict resolution needed

#### Operational Transformation (OT)
- **Alternative to CRDT**
- **More Complex**: Requires central server
- **Libraries**: ShareDB

### Awareness (Presence)

Show where other users are working:
```javascript
const awareness = provider.awareness;

// Set local user state
awareness.setLocalState({
  user: { name: 'User 1', color: '#ff0000' },
  cursor: { x: 100, y: 200 }
});

// Listen to other users
awareness.on('change', () => {
  const states = awareness.getStates();
  // Render user cursors
});
```

### Real-time Features Priority

1. **Core (MVP)**:
   - Multiple users viewing same map
   - Basic concurrent editing

2. **Enhanced**:
   - User cursors/presence
   - Live updates without refresh
   - Change highlighting

3. **Advanced**:
   - Offline support
   - Conflict resolution
   - Version history
   - Comments/chat

---

## Existing Tools and Implementations

### Online Tools

#### 1. OnlineWardleyMaps.com
- **Description**: Free online tool for drawing Wardley Maps in seconds
- **GitHub**: [damonsk/onlinewardleymaps](https://github.com/damonsk/onlinewardleymaps)
- **Features**:
  - Maps-as-code approach
  - MapScript format
  - Export capabilities
  - VSCode extension available
- **Learning**: Great reference for MapScript parsing

#### 2. Atlas (Wardley Maps Tool)
- **URL**: atlas2.wardleymaps.com
- **GitHub**: [cdaniel/wardleymapstool](https://github.com/cdaniel/wardleymapstool)
- **Features**:
  - Create, manage, analyze maps
  - Share maps
  - Download as PNG
  - Submaps support
  - JSON export

#### 3. MapScript IDE
- **URL**: mapscript.org/ide/
- **Features**:
  - Browser-based editor
  - Syntax highlighting
  - Live preview
  - GitHub Gist integration

### Desktop/Editor Integrations

#### VSCode Wardley Maps Extension
- **Marketplace**: `damonsk.vscode-wardley-maps`
- **Features**:
  - Syntax highlighting for MapScript
  - Live preview
  - Based on OnlineWardleyMaps engine

### Libraries and Components

#### Web Components
- **wardley-map**: Web component by James Duncan
- **Usage**: `<wardley-map>` tag
- **Integration**: Can be used in React apps

### Other Tools

- **Miro**: Wardley mapping templates
- **Creately**: Wardley mapping tool with templates
- **MapKeep**: Simple, free, intuitive tool
- **Figma**: Templates available

### Community Resources

- **GitHub**: [wardley-maps-community/awesome-wardley-maps](https://github.com/wardley-maps-community/awesome-wardley-maps)
- **Community**: community.wardleymaps.com
- **Learning**: learnwardleymapping.com/tools/

---

## Recommended Technology Stack

### Core Stack

```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0"
}
```

### Visualization (Choose One)

**Option A: React Konva (Recommended for Performance)**
```json
{
  "react-konva": "^18.2.0",
  "konva": "^9.0.0"
}
```

**Option B: React Flow (Recommended for Ease of Use)**
```json
{
  "reactflow": "^11.10.0"
}
```

**Option C: Custom SVG**
- No additional dependencies
- Good for lightweight apps

### State Management

**Recommended: Zustand**
```json
{
  "zustand": "^4.5.0"
}
```

**Alternative: Redux Toolkit** (for large apps)
```json
{
  "@reduxjs/toolkit": "^2.0.0",
  "react-redux": "^9.0.0"
}
```

### Drag and Drop

**Recommended: dnd-kit**
```json
{
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.0"
}
```

**Alternative: React DnD** (if you need HTML5 drag-drop)
```json
{
  "react-dnd": "^16.0.0",
  "react-dnd-html5-backend": "^16.0.0"
}
```

### Undo/Redo

**Option A: Custom with Zustand middleware**
```json
{
  "zustand/middleware": "included in zustand"
}
```

**Option B: Dedicated library**
```json
{
  "use-undo": "^1.1.0"
}
```

### Export Utilities

```json
{
  "save-svg-as-png": "^1.4.0",
  "html-to-image": "^1.11.0"
}
```

### UI Components (Optional)

```json
{
  "shadcn/ui": "latest",
  "@radix-ui/react-*": "latest",
  "tailwindcss": "^3.4.0"
}
```

### Testing

```json
{
  "@testing-library/react": "^14.0.0",
  "@testing-library/user-event": "^14.5.0",
  "@testing-library/jest-dom": "^6.0.0",
  "jest": "^29.0.0",
  "jest-canvas-mock": "^2.5.0",
  "jest-svg-transformer": "^1.0.0"
}
```

### Real-time Collaboration (Optional)

```json
{
  "yjs": "^13.6.0",
  "y-websocket": "^1.5.0"
}
```

### Development Tools

```json
{
  "vite": "^5.0.0",
  "eslint": "^8.0.0",
  "prettier": "^3.0.0"
}
```

---

## Implementation Roadmap

### Phase 1: MVP (Minimum Viable Product)

**Goal**: Basic functional Wardley Map editor

**Features:**
- [ ] Canvas/drawing surface with grid
- [ ] Add components (manual positioning)
- [ ] Position components on both axes
- [ ] Draw connections between components
- [ ] Basic component labels
- [ ] Pan and zoom
- [ ] Save to JSON
- [ ] Load from JSON
- [ ] Export to PNG

**Tech Stack:**
- React + TypeScript
- React Konva or React Flow
- Zustand for state
- Basic UI (no component library yet)

**Timeline**: 2-3 weeks

---

### Phase 2: Enhanced Editing

**Goal**: Improve editing experience

**Features:**
- [ ] Drag-and-drop components
- [ ] Component palette/toolbar
- [ ] Undo/redo
- [ ] Multi-select
- [ ] Copy/paste
- [ ] Keyboard shortcuts
- [ ] Context menus
- [ ] Component styling (colors, sizes)
- [ ] Connection styling
- [ ] Annotations support
- [ ] Grid snap

**Tech Stack:**
- Add @dnd-kit/core
- Add undo library
- Add UI component library (shadcn/ui)

**Timeline**: 2-3 weeks

---

### Phase 3: MapScript & Interoperability

**Goal**: Support text-based map creation and external tool compatibility

**Features:**
- [ ] MapScript parser
- [ ] MapScript editor (side-by-side)
- [ ] Import from MapScript
- [ ] Export to MapScript
- [ ] Import from OnlineWardleyMaps JSON
- [ ] Export to SVG
- [ ] Map metadata (title, purpose, scope)
- [ ] Evolution axis labels
- [ ] Value chain labels

**Tech Stack:**
- Custom MapScript parser
- Monaco Editor (optional, for code editing)

**Timeline**: 2 weeks

---

### Phase 4: Advanced Features

**Goal**: Professional-grade features

**Features:**
- [ ] Component types (user, need, capability)
- [ ] Inertia indicators
- [ ] Pipeline components
- [ ] Build/buy/outsource indicators
- [ ] Submaps/ecosystems
- [ ] Map templates
- [ ] Auto-layout assistance
- [ ] Search/filter components
- [ ] Map validation
- [ ] Dark mode

**Timeline**: 3-4 weeks

---

### Phase 5: Collaboration & Sharing

**Goal**: Multi-user support and sharing

**Features:**
- [ ] Real-time collaboration (Yjs)
- [ ] User presence indicators
- [ ] Share maps via URL
- [ ] Public/private maps
- [ ] Version history
- [ ] Comments/discussions
- [ ] User authentication
- [ ] Cloud storage backend

**Tech Stack:**
- Yjs + y-websocket
- Backend API (Node.js/Express or Firebase)
- Authentication (Auth0, Firebase Auth, or Clerk)

**Timeline**: 4-6 weeks

---

### Phase 6: Accessibility & Polish

**Goal**: WCAG compliance and refined UX

**Features:**
- [ ] Full keyboard navigation
- [ ] Screen reader support
- [ ] High contrast mode
- [ ] Keyboard shortcut help
- [ ] Onboarding tutorial
- [ ] Help documentation
- [ ] Mobile-responsive design
- [ ] Touch gesture support
- [ ] Performance optimization
- [ ] Comprehensive testing

**Timeline**: 2-3 weeks

---

### Phase 7: Advanced Analysis (Future)

**Goal**: AI and analytical features

**Features:**
- [ ] AI-assisted component positioning
- [ ] Pattern recognition
- [ ] Strategic recommendations
- [ ] Map comparison
- [ ] Evolution prediction
- [ ] Export to presentation formats
- [ ] Integration with other tools
- [ ] API for programmatic access

**Timeline**: Ongoing

---

## Development Best Practices

### Code Organization

```
src/
├── components/
│   ├── Canvas/
│   │   ├── WardleyCanvas.tsx
│   │   ├── Component.tsx
│   │   ├── Connection.tsx
│   │   └── Grid.tsx
│   ├── Toolbar/
│   │   ├── Toolbar.tsx
│   │   ├── ComponentPalette.tsx
│   │   └── ExportMenu.tsx
│   ├── MapEditor/
│   │   └── MapEditor.tsx
│   └── UI/
│       ├── Button.tsx
│       └── ContextMenu.tsx
├── hooks/
│   ├── useMapStore.ts
│   ├── useKeyboard.ts
│   ├── useDragAndDrop.ts
│   └── useUndo.ts
├── stores/
│   └── mapStore.ts
├── types/
│   ├── component.ts
│   ├── connection.ts
│   └── map.ts
├── utils/
│   ├── export.ts
│   ├── import.ts
│   ├── mapscript-parser.ts
│   └── validation.ts
└── App.tsx
```

### TypeScript Types

Create comprehensive types for all data structures. This ensures type safety and better developer experience.

### Performance Optimization

1. **Memoization**: Use `React.memo()` for components
2. **useCallback**: Wrap event handlers
3. **useMemo**: Expensive calculations
4. **Virtual Rendering**: For large maps (100+ components)
5. **Debounce**: Auto-save and search
6. **Code Splitting**: Lazy load features

### Version Control

- Use conventional commits
- Feature branches
- Regular commits
- Document breaking changes

---

## Security Considerations

### Data Privacy
- Don't store sensitive data in maps by default
- Provide encryption option for cloud storage
- Clear privacy policy

### Input Validation
- Sanitize user input
- Validate imported files
- Prevent XSS attacks
- File size limits

### Authentication & Authorization
- Secure authentication (OAuth 2.0)
- Role-based access control
- API rate limiting

---

## Conclusion

Building a React application for Wardley Mapping requires careful consideration of visualization libraries, state management, and user experience. The recommended approach:

1. **Start with React Konva** or **React Flow** for visualization
2. **Use Zustand** for state management
3. **Implement core features first** (MVP)
4. **Add MapScript support** for interoperability
5. **Gradually add advanced features** based on user feedback
6. **Consider Yjs** for real-time collaboration when needed
7. **Prioritize accessibility** throughout development

### Key Success Factors

- **Simplicity**: Don't over-engineer the initial version
- **Interoperability**: Support MapScript for compatibility
- **Performance**: Optimize for large maps (100+ components)
- **Accessibility**: Make it usable for everyone
- **Community**: Learn from existing tools and the Wardley community

### Resources

- **Community**: wardley-maps-community on GitHub
- **Learning**: learnwardleymapping.com
- **Documentation**: wardleymaps.com
- **Examples**: OnlineWardleyMaps.com

---

*This research document was compiled on 2025-11-17 and reflects current best practices and available technologies for building React-based Wardley Mapping applications.*
