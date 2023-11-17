// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import InventoryApp from './InventoryApp';
import data from './data.js'; // Импорт вашего объекта данных
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <InventoryApp data={data} />
  </React.StrictMode>,
  document.getElementById('root')
);
