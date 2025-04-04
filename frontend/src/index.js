import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { CssVarsProvider } from '@mui/joy/styles';
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/globalStyles.css'
import './assets/styles/bootstrap.custom.css'; // Import Bootstrap styles FIRST

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
            <App />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();