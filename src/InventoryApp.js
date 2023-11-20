import React, { useState } from 'react';
import InventoryTypeSelector from './components/InventoryTypeSelector';
import BrandSelector from './components/BrandSelector';
import SeriesSelector from './components/SeriesSelector';
import ModelSelector from './components/ModelSelector';
import ThicknessColorSelector from './components/ThicknessColorSelector';
import UserInfoForm from './components/UserInfoForm';
import Header from './components/Header';
import Footer from './components/Footer';

const InventoryApp = ({ data }) => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({
    thickness: '',
    color: '',
    quantity: 1,
  });
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
  };

  const handleUserInfoSubmit = async (info) => {
    setUserInfo(info);
  
    const formData = new FormData();
    formData.append('productType', selectedType);
    formData.append('brand', selectedBrand);
    formData.append('product', selectedModel);
    formData.append('fullName', info.name);
    formData.append('email', info.email);
    formData.append('phone', info.phone);
    formData.append('shipping', 'some_shipping_data'); // Замените на ваши данные
    formData.append('amount', totalPrice * selectedOptions['quantity']); // Замените на ваши данные
  
    try {
      const response = await fetch('https://ttsale.ru/mail1.php', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        // Успешный ответ от сервера
        const result = await response.text();
        alert(result);
        handleReset();
      } else {
        // Обработка ошибок
        alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      alert('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleReset = () => {
    setSelectedType('');
    setSelectedBrand('');
    setSelectedSeries('');
    setSelectedModel('');
    setSelectedOptions({ thickness: '', color: '', quantity : ''});
    setUserInfo(null);
    setTotalPrice(0);
    setDisplayedStep(1);
  };

  const handleBack = () => {
    // Можно добавить дополнительную логику перед переходом
    setDisplayedStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      <Header />
      {displayedStep === 1 && (
        <InventoryTypeSelector onSelect={handleSelectType} />
      )}
      {displayedStep === 2 && selectedType && (
        <BrandSelector
          brands={Object.keys(data[selectedType])}
          onSelect={handleSelectBrand}
        />
      )}
      {displayedStep === 3 && selectedBrand && (
        <SeriesSelector
          series={data[selectedType][selectedBrand].series}
          onSelect={handleSelectSeries}
        />
      )}
      {displayedStep === 4 && selectedSeries && (
        <ModelSelector
          models={
            data[selectedType][selectedBrand].series[selectedSeries].models
          }
          onSelect={handleSelectModel}
        />
      )}
      {displayedStep === 5 && selectedModel && (
        <ThicknessColorSelector
          options = {selectedOptions}
          thicknessOptions={
            data[selectedType][selectedBrand].series[selectedSeries].thickness
          }
          colorOptions={
            data[selectedType][selectedBrand].series[selectedSeries].color
          }
          quantityOptions={
            data[selectedType][selectedBrand].series[selectedSeries].quantity
          }
          onSelect={handleSelectOptions}
          nexStep = {setDisplayedStep}
        />
      )}

      {displayedStep === 6 && selectedOptions.color && (
        <UserInfoForm onSubmit={handleUserInfoSubmit} />
      )}
      <div className="fixed-bottom cost-bar">
        <div className="container col-6">
          <p className="text-center">Цена: {totalPrice * selectedOptions['quantity']} руб.</p>
        </div>
        <Footer />
      </div>
      <div className="container mt-3">
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-secondary"
            onClick={handleBack}
            disabled={displayedStep === 1}>
            Назад
          </button>
          <div>
            <button className="btn btn-warning mr-2" onClick={handleReset}>
              Сбросить
            </button>
          </div>
        </div>
      </div>
      <div className="container mb-1 mt-2">
        <div className="order-summary">
          <h5 className="text-center mb-1">Состав заказа</h5>
          <table className="table mb-0">
            <tbody>
              <tr>
                <td>Товар:</td>
                <td>{selectedSeries} {selectedModel} {selectedOptions.thickness} {selectedOptions.color.split(':')[0]}</td>
              </tr>
              <tr>
                <td>Количество:</td>
                <td>{selectedOptions['quantity']}</td>
              </tr>
              <tr>
                <td>Общая стоимость:</td>
                <td>{totalPrice * selectedOptions['quantity']} руб.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    
    </div>
  );
};

export default InventoryApp;
