import * as React from 'react';

import * as ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store/store';

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
