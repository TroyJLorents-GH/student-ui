import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ WRAPS App */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// When i publish and I want to start measuring performance in app, pass a function
// to log results (reportWebVitals(console.log))
// or send to an analytics endpoint. given this link to look in to https://bit.ly/CRA-vitals
reportWebVitals();
