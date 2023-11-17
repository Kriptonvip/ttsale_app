// src/components/QuantitySelector.js
import React from 'react';

const Footer = ({ onSelect }) => {
  return (
    <div className="footer">
      <div className="whatsapp">
        <p>
          По текущим заказам и вопросам - писать в Whatsapp:{' '}
          <a href="https://wa.me/79013014363" class="link">
            +79013014363
          </a>
        </p>
      </div>
      <div className="dealer-info">
        <p>
          Дилер ТТСПОРТ - Сторожев Максим{' '}
          <a href="https://www.ttshop.ru/diler-v-krasnodarskom-krae.html" class="link">
            (Cсылка)
          </a>
        </p>
      </div>
  </div >
  );
};

export default Footer;
