import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Pagination as TablePagination } from './styles';
import PaginationActions from './paginationActions';

import { PaginationProps } from './intefaces';

const Pagination = (props: PaginationProps) => {
  const { totalRows, rowsPerPage, page, handleChangeRowsPerPage } = props;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    // setPage(newPage);
    console.log('change page');

  };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  // ) => {
  //   // setRowsPerPage(parseInt(event.target.value, 10));
  //   // setPage(0);
  //   console.log('change rows per page');
  // };

  return (
    <table>
      <tbody>
        <tr>
          <TablePagination
            variant="head"
            rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: totalRows }]}
            count={totalRows}
            rowsPerPage={parseInt(rowsPerPage)}
            page={parseInt(page)}
            labelRowsPerPage="Resultados por página:"
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={
              () =>
              <PaginationActions
                {...props}
              />
            }
          />
        </tr>
      </tbody>
    </table>
  );
}

export default React.memo(Pagination);
