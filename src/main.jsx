import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RecVelvet from './RecVelvet.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecVelvet />
  </StrictMode>,
);
