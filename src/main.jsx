import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

document.documentElement.classList.add('js'); // lets the CSS hide things only when JavaScript is running

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
