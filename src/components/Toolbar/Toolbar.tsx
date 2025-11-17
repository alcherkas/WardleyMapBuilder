import React from 'react';
import { useMapStore } from '../../stores/mapStore';
import './Toolbar.css';

interface ToolbarProps {
  onExportPNG: () => void;
  onSaveJSON: () => void;
  onLoadJSON: () => void;
  onSaveMapScript: () => void;
  onLoadMapScript: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  onExportPNG,
  onSaveJSON,
  onLoadJSON,
  onSaveMapScript,
  onLoadMapScript
}) => {
  const { ui, setTool, toggleGrid, setZoom, resetMap, map, setTitle } = useMapStore();

  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h2 className="toolbar-title">Wardley Map Builder</h2>
        <input
          type="text"
          className="map-title-input"
          value={map.title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Map Title"
        />
      </div>

      <div className="toolbar-section">
        <label className="toolbar-label">Tools:</label>
        <button
          className={`toolbar-button ${ui.tool === 'select' ? 'active' : ''}`}
          onClick={() => setTool('select')}
          title="Select Tool (drag to move components)"
        >
          ✋ Select
        </button>
        <button
          className={`toolbar-button ${ui.tool === 'component' ? 'active' : ''}`}
          onClick={() => setTool('component')}
          title="Add Component (click on canvas)"
        >
          ➕ Add Component
        </button>
        <button
          className={`toolbar-button ${ui.tool === 'connection' ? 'active' : ''}`}
          onClick={() => setTool('connection')}
          title="Draw Connection (click source then target)"
        >
          ↔️ Connect
        </button>
      </div>

      <div className="toolbar-section">
        <label className="toolbar-label">View:</label>
        <button
          className="toolbar-button"
          onClick={() => setZoom(ui.zoom * 1.2)}
          title="Zoom In"
        >
          🔍 +
        </button>
        <button
          className="toolbar-button"
          onClick={() => setZoom(ui.zoom / 1.2)}
          title="Zoom Out"
        >
          🔍 -
        </button>
        <button
          className="toolbar-button"
          onClick={() => setZoom(1)}
          title="Reset Zoom"
        >
          ↺ Reset Zoom
        </button>
        <button
          className={`toolbar-button ${ui.gridEnabled ? 'active' : ''}`}
          onClick={toggleGrid}
          title="Toggle Grid"
        >
          ⊞ Grid
        </button>
      </div>

      <div className="toolbar-section">
        <label className="toolbar-label">File:</label>
        <button
          className="toolbar-button"
          onClick={onSaveJSON}
          title="Save map as JSON"
        >
          💾 JSON
        </button>
        <button
          className="toolbar-button"
          onClick={onLoadJSON}
          title="Load map from JSON"
        >
          📁 JSON
        </button>
        <button
          className="toolbar-button"
          onClick={onSaveMapScript}
          title="Save as MapScript (.owm)"
        >
          💾 OWM
        </button>
        <button
          className="toolbar-button"
          onClick={onLoadMapScript}
          title="Load MapScript (.owm)"
        >
          📁 OWM
        </button>
        <button
          className="toolbar-button"
          onClick={onExportPNG}
          title="Export map as PNG"
        >
          📸 PNG
        </button>
        <button
          className="toolbar-button danger"
          onClick={() => {
            if (confirm('Are you sure you want to reset the map? This cannot be undone.')) {
              resetMap();
            }
          }}
          title="Reset map"
        >
          🗑️ Reset
        </button>
      </div>

      <div className="toolbar-section">
        <span className="toolbar-info">
          Components: {useMapStore.getState().components.length} |
          Zoom: {Math.round(ui.zoom * 100)}%
        </span>
      </div>
    </div>
  );
};
