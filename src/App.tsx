import React, { Suspense } from "react";
import { Provider } from "react-redux";
import {
  ThemeProvider,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import store from "./store";
import GlobalStyles from "./styles/globalStyles";
import QRCode from "react-qr-code";

import Routes from "./routes";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#0899BA",
    },
  },
});

const useStyles = makeStyles((theme) => {
  root: {
    // some CSS that access to theme
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyles />
        <Routes />
        <ToastContainer />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
