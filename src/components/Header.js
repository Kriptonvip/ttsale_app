// src/components/QuantitySelector.js
import React from 'react';

const Header = ({ onSelect }) => {
  return (
    <div className="header">
    <div className="container">
      <div className="logo">Магазин TTSALE.RU</div>
      <div className="links">
     <a href="https://www.ozon.ru/seller/ttsale-1044608/" class="link">
        Магазин в ОЗОН (Ссылка)
        </a>
      </div>
      <div className="address">
        <p>Адрес: г. Сочи, ул. Донская, 3/9</p>
      </div>
    </div>
    <div className="dealer-info">
        <p>
          Дилер ТТСПОРТ - Сторожев Максим
          <a href="https://www.ttshop.ru/diler-v-krasnodarskom-krae.html" class="link">
            (Cсылка)
          </a>
        </p>
      </div>
  </div>
  );
};

export default Header;
