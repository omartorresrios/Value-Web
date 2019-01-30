import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import createRoutes from './routes';
import './index.css';
import * as serviceWorker from './serviceWorker';

const store = configureStore();
const routes = createRoutes(store);

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('root'));

serviceWorker.register();
