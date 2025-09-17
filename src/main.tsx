import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from "redux-persist/integration/react";

import App from './App.tsx'
import { persistor, store } from './store/index.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider {...{ store }}>
      <BrowserRouter basename='/react-admin'>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
