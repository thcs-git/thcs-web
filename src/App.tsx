import React, { Suspense } from 'react';
import { Provider } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store';
import GlobalStyles from './styles/globalStyles';

import Routes from './routes';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
        <Routes />
      <ToastContainer />
    </Provider>

  );
}

export default App;
