import { Margin } from "@mui/icons-material";
import {
  createTheme,
  ThemeProvider,
  styled,
  Theme,
} from "@mui/material/styles";

let theme: Theme = createTheme({
  palette: {
    mode: "light",
    common: { white: "#F4F7FF" },
    primary: {
      main: "#000083",
    },
    secondary: { main: "#4949F3" },
    error: { main: "#E73A3A" },
    warning: { main: "#F9CA24" },
    success: { main: "#4FC66A" },
    background: { default: "#F9F9F9", paper: "#F7F7F7" },
  },
  typography: {
    fontFamily: "GeneralSans-Variable",
  },
  components: {},
});

theme = createTheme(theme, {
  components: {
    // DIALOG
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          fontWeight: "600",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: "0",
          margin: "0 24px 20px",
          // cursor: "pointer",
          "& span, p": {
            cursor: "pointer",
          },
        },
      },
    },
    // AUTOCOMPLETE
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.secondary.main,
            },
          },
          "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
            color: theme.palette.secondary.main,
          },
        },
      },
    },
  },
});

export default theme;
