import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store from './store';
import GlobalStyles from './styles/globalStyles';

import Routes from './routes';
import history from './routes/history';

const App = () => {
  return (

    <Provider store={store}>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>

  );
}

export default App;
