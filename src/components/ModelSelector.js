// src/components/ModelSelector.js
import React from 'react';

const ModelSelector = ({ models, onSelect }) => {
  return (
    <div className="container mt-2">
      <h2 className="text-center">Выберите модель</h2>
      <div className="row justify-content-center">
        {models.map((model, index) => (
          <button key={index} className="btn btn-primary mx-2 col-3" onClick={() => onSelect(model)}>
            {model}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModelSelector;
