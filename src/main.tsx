import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'styles/index.css';
import { myHistory } from '@/router/history';
import { HistoryRouter } from '@/router/HistoryRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);

postMessage({ payload: 'removeLoading' }, '*');
