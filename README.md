# Wardley Map Builder

A modern, interactive web application for creating and editing Wardley Maps built with React, TypeScript, and Konva.

## Features

### Phase 1 - MVP (Current Implementation)

- ✅ Interactive canvas with grid and Wardley Map axes
- ✅ Add components by clicking on the canvas
- ✅ Drag and drop components to position them
- ✅ Visual representation of Evolution (X-axis) and Value Chain (Y-axis)
- ✅ Pan and zoom functionality
- ✅ Export maps as PNG images
- ✅ Save maps to JSON format
- ✅ Load maps from JSON files
- ✅ Component selection and highlighting
- ✅ Grid toggle
- ✅ Map title editing

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Konva** - Canvas rendering
- **Zustand** - State management

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd WardleyMapBuilder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Usage

### Creating a Map

1. **Add Components**: Click the "Add Component" button in the toolbar, then click anywhere on the canvas to place components
2. **Move Components**: Use the "Select" tool to drag components to different positions
3. **Zoom**: Use the mouse wheel to zoom in/out, or use the zoom buttons in the toolbar
4. **Pan**: Drag the canvas background while zoomed in
5. **Edit Title**: Click on the map title in the toolbar to edit it

### Saving and Loading

- **Save**: Click "Save JSON" to download your map as a JSON file
- **Load**: Click "Load JSON" to open a previously saved map
- **Export**: Click "Export PNG" to download your map as an image

### Wardley Map Axes

- **X-Axis (Evolution)**: Ranges from Genesis (left) to Commodity (right)
  - Genesis (0.0-0.25): New, unproven concepts
  - Custom (0.25-0.5): Tailored solutions
  - Product (0.5-0.75): Productized offerings
  - Commodity (0.75-1.0): Standardized utilities

- **Y-Axis (Value Chain)**: Ranges from Visible (top) to Invisible (bottom)
  - Top: User-facing components
  - Bottom: Infrastructure components

## Keyboard Shortcuts

- **Mouse Wheel**: Zoom in/out
- **Click + Drag**: Pan the canvas (when zoomed)
- **Click**: Select component or place new component (depending on active tool)

## Project Structure

```
src/
├── components/
│   ├── Canvas/
│   │   ├── WardleyCanvas.tsx    # Main canvas component
│   │   ├── Grid.tsx              # Grid and axes
│   │   ├── MapComponent.tsx      # Individual component rendering
│   │   └── MapConnection.tsx     # Connection lines
│   └── Toolbar/
│       ├── Toolbar.tsx           # Main toolbar
│       └── Toolbar.css           # Toolbar styles
├── stores/
│   └── mapStore.ts               # Zustand state management
├── types/
│   ├── component.ts              # Component types
│   ├── connection.ts             # Connection types
│   ├── annotation.ts             # Annotation types
│   └── map.ts                    # Map state types
├── utils/
│   └── export.ts                 # Export/import utilities
├── App.tsx                       # Main app component
├── App.css                       # App styles
└── main.tsx                      # Entry point
```

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Roadmap

### Phase 2 - Enhanced Editing (Coming Soon)
- [ ] Connection drawing between components
- [ ] Multi-select components
- [ ] Undo/redo functionality
- [ ] Copy/paste
- [ ] Keyboard shortcuts
- [ ] Context menus
- [ ] Component styling (colors, sizes)

### Phase 3 - MapScript & Interoperability
- [ ] MapScript parser
- [ ] Import/export MapScript format
- [ ] Export to SVG
- [ ] Map metadata editing

### Phase 4 - Advanced Features
- [ ] Component types (user, need, capability)
- [ ] Inertia indicators
- [ ] Pipeline components
- [ ] Build/buy/outsource indicators
- [ ] Dark mode

### Phase 5 - Collaboration
- [ ] Real-time collaboration
- [ ] User presence
- [ ] Share maps via URL
- [ ] Version history

## Documentation

See the [docs/research.md](docs/research.md) file for comprehensive research on Wardley Mapping and technical implementation details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See LICENSE file for details.

## Acknowledgments

- Simon Wardley for creating Wardley Mapping
- [LearnWardleyMapping.com](https://learnwardleymapping.com/) for excellent learning resources
- [OnlineWardleyMaps.com](https://onlinewardleymaps.com/) for inspiration
