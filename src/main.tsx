import { LicenseInfo } from '@mui/x-license';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/store/index.tsx';
import App from './App.tsx';

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_LICENSE_KEY);

createRoot(document.getElementById('root')!).render(
  <Provider
    {...{
      store,
    }}
  >
    <HashRouter>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </HashRouter>
  </Provider>,
);
