import React, { useState } from 'react';

const UserInfoForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e) => {
    // Позволяет вводить только цифры
    const inputValue = e.target.value.replace(/[^\d]/g, '');
    setPhone(inputValue);
  };

  const handlePhoneBlur = () => {
    // Проверка, если введены только цифры
    const isValid = /^\d+$/.test(phone);
    if (!isValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: 'Телефон должен содержать только цифры',
      }));
    }
  };

  const handleSubmit = () => {
    // Проверка валидности данных перед отправкой
    const validationErrors = {};

    if (!name.trim()) {
      validationErrors.name = 'Имя обязательно';
    }

    if (!phone.trim()) {
      validationErrors.phone = 'Телефон обязателен';
    } else if (!/^\d+$/.test(phone)) {
      validationErrors.phone = 'Телефон должен содержать только цифры';
    }

    // Другие проверки, если необходимо

    if (Object.keys(validationErrors).length === 0) {
      // Все данные валидны, отправляем форму
      onSubmit({ name, phone, email });
    } else {
      // Обновляем состояние ошибок
      setErrors(validationErrors);
    }
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center">Контактные данные</h2>
      <div className="row justify-content-center">
        <label className="col-3">Имя:</label>
        <input
          className={`col-8 ${errors.name ? 'is-invalid' : ''}`}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="row justify-content-center">
        <label className="col-3">Телефон:</label>
        <input
          className={`col-8 ${errors.phone ? 'is-invalid' : ''}`}
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
        />
        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
      </div>
      <div className="row justify-content-center">
        <label className="col-3">Email:</label>
        <input className="col-8" type="email" onChange={(e) => setEmail(e.target.value)} />
        {/* Добавьте аналогичные проверки для email, если необходимо */}
      </div>
      <button className="btn btn-primary mt-3 mx-auto d-block" onClick={handleSubmit}>
        Отправить заказ
      </button>
    </div>
  );
};

export default UserInfoForm;
