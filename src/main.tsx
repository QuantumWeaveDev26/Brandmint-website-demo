import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionSettings } from './components/MotionSettings';
import App from './App';
import './style.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MotionSettings><App /></MotionSettings>
    </React.StrictMode>
  );
}
