import React, { useState } from 'react';
import InventoryTypeSelector from './components/InventoryTypeSelector';
import BrandSelector from './components/BrandSelector';
import SeriesSelector from './components/SeriesSelector';
import ModelSelector from './components/ModelSelector';
import ThicknessColorSelector from './components/ThicknessColorSelector';
import UserInfoForm from './components/UserInfoForm';

const InventoryApp = ({ data }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({ 'thickness': '', 'color': '' });
  const [quantity, setQuantity] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [displayedStep, setDisplayedStep] = useState(1);

  const handleSelectType = (type) => {
    setSelectedType(type);
    setDisplayedStep(2);
  };

  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setDisplayedStep(3);
  };

  const handleSelectSeries = (series) => {
    setSelectedSeries(series);
    setTotalPrice(data[selectedType][selectedBrand].series[series].price);
    setDisplayedStep(4);
  };

  const handleSelectModel = (model) => {
    setSelectedModel(model);
    setDisplayedStep(5);
  };

  const handleSelectOptions = (type, value) => {
    setSelectedOptions((prevOptions) => ({ ...prevOptions, [type]: value }));
    console.log(type, value);
    if (type === 'quantity') {
      setQuantity(value);
    }
    setDisplayedStep(6);
  };

  const handleUserInfoSubmit = (info) => {
    setUserInfo(info);
    // Здесь вы можете добавить логику для отправки данных о заказе на сервер или почту
    console.log('Данные о заказе:', {
      type: selectedType,
      brand: selectedBrand,
      series: selectedSeries,
      model: selectedModel,
      options: selectedOptions,
      quantity: quantity,
      userInfo: info,
    });
  };

  const handleReset = () => {
    setSelectedType('');
    setSelectedBrand('');
    setSelectedSeries('');
    setSelectedModel('');
    setSelectedOptions({ 'thickness': '', 'color': '' });
    setQuantity(1);
    setUserInfo(null);
    setTotalPrice(0);
    setDisplayedStep(1);
  };

  const handleForward = () => {
    // Можно добавить дополнительную логику перед переходом
    setDisplayedStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    // Можно добавить дополнительную логику перед переходом
    setDisplayedStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <div className="container mt-3">
        <p>Состав заказа:</p>
        <ul>
          <li>Тип: {selectedType}</li>
          <li>Бренд: {selectedBrand}</li>
          <li>Серия: {selectedSeries}</li>
          <li>Модель: {selectedModel}</li>
          <li>Толщина: {selectedOptions.thickness}</li>
          <li>Цвет: {selectedOptions.color}</li>
          <li>Количество: {quantity}</li>
          <li>Общая стоимость: {totalPrice * quantity} руб.</li>
        </ul>
      </div>
      {displayedStep === 1 && <InventoryTypeSelector onSelect={handleSelectType} />}
      {displayedStep === 2 && selectedType && (
        <BrandSelector brands={Object.keys(data[selectedType])} onSelect={handleSelectBrand} />
      )}
      {displayedStep === 3 && selectedBrand && (
        <SeriesSelector series={data[selectedType][selectedBrand].series} onSelect={handleSelectSeries} />
      )}
      {displayedStep === 4 && selectedSeries && (
        <ModelSelector
          models={data[selectedType][selectedBrand].series[selectedSeries].models}
          onSelect={handleSelectModel}
        />
      )}
      {displayedStep === 5 && selectedModel && (
        <ThicknessColorSelector
          thicknessOptions={data[selectedType][selectedBrand].series[selectedSeries].thickness}
          colorOptions={data[selectedType][selectedBrand].series[selectedSeries].color}
          onSelect={handleSelectOptions}
        />
      )}
      {displayedStep === 6 && selectedOptions.color && (
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
      )}
      <div className="container mt-3">
        <div className="d-flex justify-content-center">
          <button className="btn btn-secondary" onClick={handleBack} disabled={displayedStep === 1}>
            Назад
          </button>
          <div>
            <button className="btn btn-warning mr-2" onClick={handleReset}>
              Сбросить
            </button>
            <button className="btn btn-primary" onClick={handleForward} disabled={displayedStep === 6}>
              Вперед
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryApp;
