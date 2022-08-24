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
    //Shadow
    shadowColor: Palette["primary"];
    // black
    black60: Palette["primary"];
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
    //Shadow
    shadowColor: PaletteOptions["primary"];
    // black
    black60: PaletteOptions["primary"];
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
    // shadow
    shadowColor: { main: "#00000012" },
    //black]
    black60: { main: "rgba(0, 0, 0, 0.7)" },
    // gerals
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
    // ACCORDION
    MuiAccordion: {
      styleOverrides: {
        root: {
          transition: "200ms",
          margin: "0 16px 8px",
          "&::before": { display: "none" },
          ".Mui-expanded": {
            transition: "200ms",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
          "&.MuiAccordion-rounded": {
            borderRadius: "12px",
            "&.Mui-expanded": {
              margin: "16px",
            },
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          transition: "200ms",
          borderRadius: "12px 12px 12px 12px",
          "& svg": {
            transition: "200ms",
            color: theme.palette.primary.main,
          },

          "& .MuiTypography-root": {
            fontWeight: 500,
            color: theme.palette.black60.main,
            cursor: "pointer",
          },

          "&.Mui-expanded": {
            transition: "200ms",
            borderRadius: "12px 12px 0 0",
            "& svg": {
              transition: "200ms",
              color: theme.palette.common.white,
            },

            ".MuiTypography-root": {
              color: theme.palette.common.white,
            },
          },

          "& .MuiAccordionSummary-content": {
            transition: "200ms",
            display: "flex",
            justifyContent: "space-between",
            background: theme.palette.background.paper,
            "&.Mui-expanded": {
              transition: "200ms",
              background: theme.palette.primary.main,
            },
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 16px",
        },
      },
    },
    // DIALOG
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          fontWeight: "700",
          fontSize: "1.5rem",
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
          "& .MuiInputLabel-root": {
            fontWeight: 400,
            fontStyle: "italic",
            width: "100%",
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
        {
          props: { variant: "contained", color: "error" },
          style: {
            "&:hover": { backgroundColor: theme.palette.error.light },
          },
        },
      ],
    },
    //TABLE
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: "all 150ms ease-in-out",
          "&.MuiTableRow-hover:hover": {},
        },
      },
    },
    //TABS
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          height: "100%",
        },
      },
    },
    // FORM
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: theme.palette.black60.main,
        },
      },
    },
    // PAPER
    MuiPaper: {
      styleOverrides: {
        root: {
          "& .MuiPickersDay-root": {
            "&.Mui-selected": {
              background: theme.palette.secondary.main,
              color: theme.palette.common.white,
              fontWeight: 600,
              "&:hover": { background: theme.palette.secondary.light },
            },
          },
        },
      },
    },
    // APPBAR
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
  },
});

export default theme;
