import React, {Suspense} from 'react';
import {Provider} from 'react-redux';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store';
import GlobalStyles from './styles/globalStyles';
import QRCode from "react-qr-code";

import Routes from './routes';
import {Connector} from "mqtt-react-hooks";

const App = () => {
  return (
    <Provider store={store}>
      {/*<Connector*/}
      {/*  brokerUrl="wss://idncmatm:OqfzZYeGyMls@driver.cloudmqtt.com:38621"*/}
      {/*  parserMethod={msg => msg} // msg is Buffer*/}
      {/*>*/}
        <GlobalStyles/>
        <Routes/>
        <ToastContainer/>
      {/*</Connector>*/}
    </Provider>

  );
}

export default App;
