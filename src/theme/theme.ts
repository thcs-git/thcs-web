import { PaletteOptions } from "@mui/material/styles/createPalette";
import { Margin } from "@mui/icons-material";
import {
  createTheme,
  ThemeProvider,
  styled,
  Theme,
  ThemeOptions,
  experimental_sx as sx,
} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    //primary
    primaryDarker: Palette["primary"];
    primaryDark: Palette["primary"];
    primaryLight: Palette["primary"];
    primaryLighter: Palette["primary"];
    //secondary
    secondaryLight: Palette["primary"];
    secondaryLighter: Palette["primary"];
    secondaryLighter2: Palette["primary"];
    secondaryLighter3: Palette["primary"];
    //terciary
    terciaryDark: Palette["primary"];
    terciary: Palette["primary"];
    terciaryLight: Palette["primary"];
  }
  interface PaletteOptions {
    //primary
    primaryDarker: PaletteOptions["primary"];
    primaryDark: PaletteOptions["primary"];
    primaryLight: PaletteOptions["primary"];
    primaryLighter: PaletteOptions["primary"];
    //secondary
    secondaryLight: PaletteOptions["primary"];
    secondaryLighter: PaletteOptions["primary"];
    secondaryLighter2: PaletteOptions["primary"];
    secondaryLighter3: PaletteOptions["primary"];
    //terciary
    terciaryDark: PaletteOptions["primary"];
    terciary: PaletteOptions["primary"];
    terciaryLight: PaletteOptions["primary"];
  }
}
const defaultTheme = createTheme();

let theme: Theme = createTheme({
  palette: {
    mode: "light",
    common: { white: "#F7FFF7" },
    // primary colors
    primaryDarker: { main: "#000042" },
    primaryDark: { main: "#171761" },
    primary: { main: "#000083" },
    primaryLight: { main: "#2727A1" },
    primaryLighter: { main: "#3C3CBA" },
    // secondary colors
    secondary: { main: "#4949F3" },
    secondaryLight: { main: "#7979F6" },
    secondaryLighter: { main: "#9F9FF9" },
    secondaryLighter2: { main: "#C5C5FB" },
    secondaryLighter3: { main: "#ECECFE" },
    // terciary
    terciaryDark: { main: "#70D49F" },
    terciary: { main: "#7EEDB1" },
    terciaryLight: { main: "#84FABB" },
    error: { main: "#E73A3A" },
    warning: { main: "#F9CA24" },
    success: { main: "#4FC66A" },
    background: { default: "#fafafa", paper: "#FFF" },
  },
  typography: {
    fontFamily: "GeneralSans-Variable",
  },
  components: {
    // se precisar usar o intelisense do VScode, usar a variável defaultTheme
  },
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
    //BUTON
    MuiButton: {
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            "&:hover": { backgroundColor: theme.palette.primaryLighter.main },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            "&:hover": { backgroundColor: theme.palette.secondary.light },
          },
        },
        {
          props: { variant: "contained", color: "success" },
          style: {
            color: theme.palette.common.white,
            "&:hover": { backgroundColor: theme.palette.success.light },
          },
        },
      ],
    },
  },
});

export default theme;
