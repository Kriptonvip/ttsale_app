// src/InventoryTypeSelector.js
import React from 'react';

const InventoryTypeSelector = ({ onSelect }) => {
  return (
    <div className="container mt-2">
      <h2 className="text-center">Выберите тип инвентаря</h2>
      <div className="row justify-content-center">
        <button className="btn btn-primary mx-2" onClick={() => onSelect('Накладки')}>
          Накладки
        </button>
        <button className="btn btn-primary mx-2" onClick={() => onSelect('Основания')}>
          Основания
        </button>
      </div>
    </div>
  );
};

export default InventoryTypeSelector;