import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { getMsalConfig } from './utils/authConfig.jsx';
import { Provider } from 'react-redux';
import store from './Redux/store';

const container = document.getElementById('root');

const initApp = async () => {
  try {
    const config = await getMsalConfig();
    const msalInstance = new PublicClientApplication(config);

    createRoot(container).render(
      <StrictMode>
        <Provider store={store}>
          <MsalProvider instance={msalInstance}>
            <App />
          </MsalProvider>
        </Provider>
      </StrictMode>
    );
  } catch (err) {
    console.error('Failed to initialize MSAL:', err);
    container.innerHTML = '<h2>Failed to load auth configuration.</h2>';
  }
};

initApp();
