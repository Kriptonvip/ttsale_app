// src/components/ThicknessColorSelector.js
import React, { useState } from 'react';

const ThicknessColorSelector = ({
  thicknessOptions,
  colorOptions,
  onSelect,
}) => {
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleNext = () => {
    if (selectedThickness && selectedColor) {
      onSelect('thickness', selectedThickness);
      onSelect('color', selectedColor);
      onSelect('quantity', quantity); 
      // Переход на следующий шаг
    } else if (!thicknessOptions && !colorOptions){
      onSelect('quantity', quantity);
      onSelect('color', true);
    } else{
      alert('Пожалуйста, выберите толщину, цвет и количество');
    }
  };

  const handleForward = () => {
    // Вызов функции handleNext при нажатии кнопки "Вперёд"
    handleNext();
  };

  return (
    <div className="container mt-2">
     
      <div className="row justify-content-center">
      {thicknessOptions ? (<div className="col-12 text-center">
          <h4>Толщина:</h4>
          {thicknessOptions.map((thickness) => (
            <button
              key={thickness}
              className={`btn btn-light ${
                selectedThickness === thickness ? 'active' : ''
              }`}
              onClick={() => setSelectedThickness(thickness)}>
              {thickness}
            </button>
          ))}
        </div>): ''}
        {colorOptions ? (<div className="col-12 text-center">
          <h4>Цвет:</h4>
          {colorOptions.map((color) => (
            <button
              key={color}
              className={`btn ${
                selectedColor === color ? 'active' : ''
              }`}
              style={{background: color.split(':')[1], color: '#fff' }}
              onClick={() => setSelectedColor(color)}>
              {color.split(':')[0]}
            </button>
          ))}
        </div>): ''}
     
        <div className="row justify-content-center mt-3 col-12 text-center">
          <h4>Количество:</h4>
          {[1, 2, 3, 4].map((quantityOption) => (
            <button
              key={quantityOption}
              className={`btn btn-light m-1 col-1 text-center ${
                quantity === quantityOption ? 'active' : ''
              }`}
              onClick={() => setQuantity(quantityOption)}>
              {quantityOption}
            </button>
          ))}
        </div>
        <button className="btn btn-primary mt-3 mx-auto  col-12" onClick={handleForward}>
        Вперёд
      </button>
      </div>
      
    </div>
  );
};

export default ThicknessColorSelector;
