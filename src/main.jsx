
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')).render(
  
  <Auth0Provider
  domain="dev-byhhsu41df6u7rfj.us.auth0.com"
  clientId="qKiXZMNuiZJRG8W0nZ5sQwnSvUPuM1w1"
  authorizationParams={{
    redirect_uri: window.location.origin
  }}
>
  <App />
</Auth0Provider>,
  
)
