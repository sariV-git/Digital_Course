import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./store/store"; // Make sure your store is configured correctly

import 'primereact/resources/themes/saga-blue/theme.css'; // נושא PrimeReact
import 'primereact/resources/primereact.min.css'; // סגנון ה-PrimeReact
import 'primeicons/primeicons.css'; // אייקונים של PrimeIcons
import 'primeflex/primeflex.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);