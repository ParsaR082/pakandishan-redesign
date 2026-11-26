import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LanguageProvider } from './context/LanguageContext';
import { RouterProvider } from './context/RouterContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <RouterProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </RouterProvider>
);
