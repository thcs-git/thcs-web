import React from "react";

import { Pagination as TablePagination, Table, Caption } from "./styles";
import PaginationActions from "./paginationActions";

import { PaginationProps } from "./intefaces";

const Pagination = (props: PaginationProps) => {
  const {
    totalRows,
    rowsPerPage,
    page,
    handleChangeRowsPerPage,
    rowsPerPageOptions,
  } = props;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    // console.log('change page');
  };

  return (
    <Table>
      <tbody>
        <tr>
          <TablePagination
            style={{ fontSize: "13px" }}
            rowsPerPageOptions={
              rowsPerPageOptions
                ? rowsPerPageOptions
                : [5, 10, 25, { label: "Todos", value: totalRows }]
            }
            count={totalRows}
            rowsPerPage={parseInt(rowsPerPage)}
            page={parseInt(page)}
            labelRowsPerPage="Resultados por página:"
            labelDisplayedRows={({ from, to, count, page }) =>
              `${count} itens    ${page} de ${Math.ceil(
                count / parseInt(rowsPerPage)
              )}`
            }
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={() => <PaginationActions {...props} />}
          />
        </tr>
      </tbody>
    </Table>
  );
};

export default React.memo(Pagination);
