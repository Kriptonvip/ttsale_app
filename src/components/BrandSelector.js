// src/BrandSelector.js
import React from 'react';

const BrandSelector = ({ brands, onSelect }) => {
  return (
    <div className="container mt-2">
      <h2 className="text-center">Выберите бренд</h2>
      <div className="row justify-content-center">
        {brands.map((brand) => (
          <button key={brand} className="btn btn-primary mx-2" onClick={() => onSelect(brand)}>
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandSelector;
