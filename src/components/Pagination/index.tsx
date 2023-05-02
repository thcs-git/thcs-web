import React from "react";
// MUI
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
//Styles
import { Table, Caption } from "./styles";
import PaginationActions from "./paginationActions";
import { PaginationProps } from "./intefaces";
import theme from "../../theme/theme";

const Pagination = (props: PaginationProps) => {
  const {
    totalRows,
    rowsPerPage,
    page,
    handleChangeRowsPerPage,
    rowsPerPageOptions,
  } = props;

  return (
    <ThemeProvider theme={theme}>
      <TablePagination
        color="pink"
        sx={{
          marginTop: "1rem",
          borderBottom: 0,
          display: "flex",
          justifyContent: "flex-end",
          "& .MuiTablePagination-displayedRows": {
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.body1,
          },
        }}
        rowsPerPageOptions={
          rowsPerPageOptions
            ? rowsPerPageOptions
            : [5, 10, 25, { label: "Todos", value: totalRows }]
        }
        count={totalRows}
        rowsPerPage={parseInt(rowsPerPage)}
        page={parseInt(page) - 1}
        onPageChange={(e, page) => {
          // a
        }}
        labelRowsPerPage={
          <Typography variant="body1" fontFamily={theme.typography.fontFamily}>
            Resultados por página:
          </Typography>
        }
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={() => <PaginationActions {...props} />}
        labelDisplayedRows={({ from, to, count, page }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
            }}
          >
            <Typography
              variant="body1"
              fontFamily={theme.typography.fontFamily}
            >
              {`${from}-${to} de ${count}`}
            </Typography>
          </Box>
        )}
        SelectProps={{
          MenuProps: {
            sx: {
              "& .MuiMenu-list": {
                padding: "0",
                display: "flex",
                flexDirection: "column",
                "& .MuiMenuItem-root": {
                  transition: "all 150ms ease-in-out",
                  padding: "0.2rem",
                  fontFamily: theme.typography.fontFamily,
                },
              },
            },
          },
          // inputProps: {
          //   "aria-label": "rows per page",
          // },
          // SelectDisplayProps: {
          //   style: {
          //     display: "flex",
          //     flexDirection: "column",
          //     background: "pink",
          //   },
          // },
          // variant: "standard",
          // native: true,
        }}
      />
    </ThemeProvider>
  );
};

export default React.memo(Pagination);
