import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import GlobalStyles from './styles/globalStyles';


import Login from './pages/login'

function App() {
  return (
    <Provider store={store}>
      <Login />
      <GlobalStyles />
    </Provider>
  );
}

export default App;
