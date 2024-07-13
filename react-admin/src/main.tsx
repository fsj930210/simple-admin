import React from 'react';

import ReactDOM from 'react-dom/client';

import '@unocss/reset/eric-meyer.css';
import 'virtual:uno.css';

import App from './App.tsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
