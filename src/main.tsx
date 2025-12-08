import { LicenseInfo } from '@mui/x-license';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import { persistor, store } from '@/store/index.tsx';

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_LICENSE_KEY);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider
      {...{
        store,
      }}
    >
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
