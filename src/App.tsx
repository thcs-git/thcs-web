import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import store from './store';
import GlobalStyles from './styles/globalStyles';

import Routes from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
        <Routes />
    </Provider>

  );
}

export default App;
