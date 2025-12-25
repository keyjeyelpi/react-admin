import { LicenseInfo } from '@mui/x-license';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/index.tsx';
import App from './App.tsx';

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_LICENSE_KEY);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider
      {...{
        store,
      }}
    >
      <BrowserRouter basename="/react-admin">
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
