import React, { useState, useEffect } from 'react';
import { useMapStore } from '../../stores/mapStore';
import { Component } from '../../types';
import './ComponentEditor.css';

export const ComponentEditor: React.FC = () => {
  const { components, ui, updateComponent } = useMapStore();

  const selectedComponent = ui.selectedComponents.length === 1
    ? components.find(c => c.id === ui.selectedComponents[0])
    : null;

  const [name, setName] = useState('');
  const [type, setType] = useState<'user' | 'need' | 'capability'>('capability');
  const [color, setColor] = useState('#3b82f6');
  const [size, setSize] = useState(8);

  useEffect(() => {
    if (selectedComponent) {
      setName(selectedComponent.name);
      setType(selectedComponent.type);
      setColor(selectedComponent.style?.color || '#3b82f6');
      setSize(selectedComponent.style?.size || 8);
    }
  }, [selectedComponent]);

  if (!selectedComponent) {
    return (
      <div className="component-editor">
        <div className="editor-empty">
          <p>Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<Component>) => {
    updateComponent(selectedComponent.id, updates);
  };

  return (
    <div className="component-editor">
      <h3>Component Properties</h3>

      <div className="editor-section">
        <label className="editor-label">Name</label>
        <input
          type="text"
          className="editor-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            handleUpdate({ name: e.target.value });
          }}
          placeholder="Component name"
        />
      </div>

      <div className="editor-section">
        <label className="editor-label">Type</label>
        <select
          className="editor-select"
          value={type}
          onChange={(e) => {
            const newType = e.target.value as 'user' | 'need' | 'capability';
            setType(newType);
            handleUpdate({ type: newType });
          }}
        >
          <option value="user">User</option>
          <option value="need">Need</option>
          <option value="capability">Capability</option>
        </select>
      </div>

      <div className="editor-section">
        <label className="editor-label">Color</label>
        <div className="color-picker-container">
          <input
            type="color"
            className="editor-color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              handleUpdate({
                style: {
                  ...selectedComponent.style,
                  color: e.target.value,
                },
              });
            }}
          />
          <span className="color-value">{color}</span>
        </div>
      </div>

      <div className="editor-section">
        <label className="editor-label">Size: {size}px</label>
        <input
          type="range"
          className="editor-slider"
          min="4"
          max="20"
          value={size}
          onChange={(e) => {
            const newSize = parseInt(e.target.value);
            setSize(newSize);
            handleUpdate({
              style: {
                ...selectedComponent.style,
                size: newSize,
              },
            });
          }}
        />
      </div>

      <div className="editor-section">
        <label className="editor-label">Position</label>
        <div className="position-info">
          <div className="position-item">
            <span>Evolution:</span>
            <span>{(selectedComponent.position.evolution * 100).toFixed(1)}%</span>
          </div>
          <div className="position-item">
            <span>Visibility:</span>
            <span>{(selectedComponent.position.visibility * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      <div className="editor-section">
        <label className="editor-label">Notes</label>
        <textarea
          className="editor-textarea"
          value={selectedComponent.notes || ''}
          onChange={(e) => {
            handleUpdate({ notes: e.target.value });
          }}
          placeholder="Add notes about this component..."
          rows={4}
        />
      </div>
    </div>
  );
};
