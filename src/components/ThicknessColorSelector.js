// src/components/ThicknessColorSelector.js
import React, { useState } from 'react';

const ThicknessColorSelector = ({
  thicknessOptions,
  colorOptions,
  options,
  onSelect,
  nextStep,
}) => {
  const {thickness, color, quantity} = options;
  const [selectedThickness, setSelectedThickness] = useState(thickness);
  const [selectedColor, setSelectedColor] = useState(color);
  const [selectedQuantity, setQuantity] = useState(quantity);


  const handleNext = () => {
    if (selectedThickness && selectedColor) {
      onSelect('thickness', selectedThickness);
      onSelect('color', selectedColor);
      onSelect('quantity', selectedQuantity);
      nextStep(6);
      // Переход на следующий шаг
    } else if (!thicknessOptions && !colorOptions) {
      onSelect('quantity', selectedQuantity);
      onSelect('color', ':');
      nextStep(6);
    } else {
      alert('Пожалуйста, выберите толщину, цвет и количество');
    }
  };

  const handleForward = () => {
    // Вызов функции handleNext при нажатии кнопки "Вперёд"
    handleNext();
  };

  const handleQuantityChange = (newQuantity) => {
    // Функция обновления количества
    setQuantity(newQuantity);
    onSelect('quantity', newQuantity);
  };

  const handleThicknessChange = (newThickness) => {
    // Функция обновления толщины
    setSelectedThickness(newThickness);
    onSelect('thickness', newThickness);
  };

  const handleColorChange = (newColor) => {
    // Функция обновления цвета
    setSelectedColor(newColor);
    onSelect('color', newColor);
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <h2 className="text-center">Выберите параметры:</h2>
        {thicknessOptions ? (
          <div className="col-12 text-center">
            <h4>Толщина:</h4>
            {thicknessOptions.map((thickness) => (
              <button
                key={thickness}
                className={`btn btn-outline-primary me-1 ${
                  selectedThickness === thickness ? 'active' : ''
                }`}
                onClick={() => handleThicknessChange(thickness)}>
                {thickness}
              </button>
            ))}
          </div>
        ) : (
          ''
        )}
        {colorOptions ? (
          <div className="col-12 text-center ">
            <h4>Цвет:</h4>
            {colorOptions.map((color) => (
              <button
                key={color}
                className={`btn  me-1  ${selectedColor === color ? 'active' : ''}`}
                style={{ background: color.split(':')[1], color: '#fff' }}
                onClick={() => handleColorChange(color)}>
                {color.split(':')[0]}
              </button>
            ))}
          </div>
        ) : (
          ''
        )}
        <div className="row justify-content-center mt-3 col-12 text-center">
          <h4>Количество:</h4>
          {[1, 2, 3, 4].map((quantityOption) => (
            <button
              key={quantityOption}
              className={`btn btn-outline-secondary m-1 col-1 text-center ${
                selectedQuantity === quantityOption ? 'active' : ''
              }`}
              onClick={() => handleQuantityChange(quantityOption)}>
              {quantityOption}
            </button>
          ))}
        </div>
        <button className="btn btn-primary mt-3 mx-auto col-12" onClick={handleForward}>
          Вперёд
        </button>
      </div>
    </div>
  );
};

export default ThicknessColorSelector;
