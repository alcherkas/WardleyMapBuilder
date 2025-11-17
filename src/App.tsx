import React, { useRef, useState, useEffect } from 'react';
import WardleyCanvas from './components/Canvas/WardleyCanvas';
import { Toolbar } from './components/Toolbar/Toolbar';
import { useMapStore } from './stores/mapStore';
import { exportToJSON, importFromJSON } from './utils/export';
import './App.css';

function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight - 60, // Subtract toolbar height
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportMap = useMapStore((state) => state.exportMap);
  const loadMap = useMapStore((state) => state.loadMap);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
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
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="app">
      <Toolbar
        onExportPNG={handleExportPNG}
        onSaveJSON={handleSaveJSON}
        onLoadJSON={handleLoadJSON}
      />
      <div className="canvas-container">
        <WardleyCanvas
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default App;
