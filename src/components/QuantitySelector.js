// src/components/QuantitySelector.js
import React from 'react';

const QuantitySelector = ({ onSelect }) => {
  return (
    <div className="container mt-2">
      <h2 className="text-center">Выберите количество</h2>
      <div className="row justify-content-center">
        <label className="col-2">Количество:</label>
        <input className="col-2" type="number" min="1" onChange={(e) => onSelect('quantity', e.target.value)} />
      </div>
    </div>
  );
};

export default QuantitySelector;
