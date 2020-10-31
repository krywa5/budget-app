import React from 'react';
import ReactDOM from 'react-dom';
import './index.css.js';
import './i18n/i18n';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'data/store';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

