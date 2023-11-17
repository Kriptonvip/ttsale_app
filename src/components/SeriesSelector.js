// src/components/SeriesSelector.js
import React from 'react';

const SeriesSelector = ({ series, onSelect }) => {
  return (
    <div className="container mt-2">
      <h2 className="text-center">Выберите серию</h2>
      <div className="row justify-content-center">
        {Object.keys(series).map((seriesName) => (
          <button key={seriesName} className="btn btn-primary mx-2" onClick={() => onSelect(seriesName)}>
            {seriesName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeriesSelector;
