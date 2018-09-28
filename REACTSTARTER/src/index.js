import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import reducer from './reducers';
import middleware, { history } from './middleware';

const store = createStore(
  reducer,
  middleware,
);

/* eslint-disable */

import App from 'components/App';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);

/* eslint-enable */
