import React, { useRef, useState, useEffect } from 'react';
import WardleyCanvas from './components/Canvas/WardleyCanvas';
import { Toolbar } from './components/Toolbar/Toolbar';
import { ComponentEditor } from './components/Editor/ComponentEditor';
import { useMapStore } from './stores/mapStore';
import { exportToJSON, importFromJSON } from './utils/export';
import { downloadMapScript, importMapScript } from './utils/mapscript';
import './App.css';

function App() {
  const EDITOR_WIDTH = 300;
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth - EDITOR_WIDTH,
    height: window.innerHeight - 60, // Subtract toolbar height
  });

  const jsonFileInputRef = useRef<HTMLInputElement>(null);
  const mapScriptFileInputRef = useRef<HTMLInputElement>(null);
  const exportMap = useMapStore((state) => state.exportMap);
  const loadMap = useMapStore((state) => state.loadMap);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth - EDITOR_WIDTH,
        height: window.innerHeight - 60,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleExportPNG = () => {
    const stage = document.querySelector('canvas')?.parentElement;
    if (stage) {
      // Get the Konva stage from the canvas component
      const konvaStage = (stage as any).konvaNode;
      if (konvaStage) {
        const dataUrl = konvaStage.toDataURL({ pixelRatio: 2 });
        const link = document.createElement('a');
        link.download = 'wardley-map.png';
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  const handleSaveJSON = () => {
    const mapData = exportMap();
    exportToJSON(mapData);
  };

  const handleLoadJSON = () => {
    jsonFileInputRef.current?.click();
  };

  const handleSaveMapScript = () => {
    const mapData = exportMap();
    downloadMapScript(mapData);
  };

  const handleLoadMapScript = () => {
    mapScriptFileInputRef.current?.click();
  };

  const handleJSONFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const mapData = await importFromJSON(file);
        loadMap(mapData);
        alert('Map loaded successfully!');
      } catch (error) {
        alert('Failed to load map. Please check the file format.');
        console.error(error);
      }
    }
    // Reset file input
    if (jsonFileInputRef.current) {
      jsonFileInputRef.current.value = '';
    }
  };

  const handleMapScriptFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const mapData = await importMapScript(file);
        loadMap({
          map: {
            id: crypto.randomUUID(),
            title: mapData.title,
            purpose: mapData.purpose,
            scope: mapData.scope,
          },
          components: mapData.components,
          connections: mapData.connections,
          annotations: [],
        });
        alert('MapScript loaded successfully!');
      } catch (error) {
        alert('Failed to load MapScript. Please check the file format.');
        console.error(error);
      }
    }
    // Reset file input
    if (mapScriptFileInputRef.current) {
      mapScriptFileInputRef.current.value = '';
    }
  };

  return (
    <div className="app">
      <Toolbar
        onExportPNG={handleExportPNG}
        onSaveJSON={handleSaveJSON}
        onLoadJSON={handleLoadJSON}
        onSaveMapScript={handleSaveMapScript}
        onLoadMapScript={handleLoadMapScript}
      />
      <div className="main-content">
        <div className="canvas-container">
          <WardleyCanvas
            width={dimensions.width}
            height={dimensions.height}
          />
        </div>
        <ComponentEditor />
      </div>
      <input
        ref={jsonFileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleJSONFileChange}
      />
      <input
        ref={mapScriptFileInputRef}
        type="file"
        accept=".owm,.txt"
        style={{ display: 'none' }}
        onChange={handleMapScriptFileChange}
      />
    </div>
  );
}

export default App;
