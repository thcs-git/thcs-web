import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import GlobalStyles from './styles/globalStyles';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
    </Provider>
  );
}

export default App;
