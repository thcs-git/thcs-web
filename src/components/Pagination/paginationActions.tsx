import React from "react";
// Router
// Redux e sagas
// MUI
import { Box, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { ThemeProvider } from "@mui/material/styles";
//Styles
import theme from "../../theme/theme";
import { ContainerPaginationActions } from "./styles";
//Uitls
// types
import { PaginationProps } from "./intefaces";

const INITIAL_PAGE = 1;

function TablePaginationActions(props: PaginationProps) {
  const theme = useTheme();

  const {
    totalRows,
    page,
    rowsPerPage,
    handleFirstPage,
    handleLastPage,
    handleNextPage,
    handlePreviosPage,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", marginLeft: "0.5rem" }}>
        <IconButton
          onClick={handleFirstPage}
          disabled={parseInt(page) == INITIAL_PAGE}
          aria-label="first page"
          sx={{ "& svg, path": { cursor: "pointer" } }}
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handlePreviosPage}
          disabled={parseInt(page) === INITIAL_PAGE}
          aria-label="previous page"
          sx={{ "& svg, path": { cursor: "pointer" } }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextPage}
          disabled={
            parseInt(page) >= Math.ceil(totalRows / parseInt(rowsPerPage))
          }
          aria-label="next page"
          sx={{ "& svg, path": { cursor: "pointer" } }}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPage}
          disabled={
            parseInt(page) >= Math.ceil(totalRows / parseInt(rowsPerPage))
          }
          aria-label="last page"
          sx={{ "& svg, path": { cursor: "pointer" } }}
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    </ThemeProvider>
  );
}

export default React.memo(TablePaginationActions);
