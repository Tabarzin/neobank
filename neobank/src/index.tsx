import * as React from 'react';
import * as ReactDom from 'react-dom/client';
import App from './App';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
