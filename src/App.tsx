import React, { Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import GlobalStyles from "./styles/globalStyles";
import Routes from "./routes";

import "./fonts/css/general-sans.css";
import theme from "./theme/theme";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Routes />
          <ToastContainer />
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
