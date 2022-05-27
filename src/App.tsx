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

import "./fonts/css/general-sans.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000083",
    },
    secondary: {
      main: "#4949fe",
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
