import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Pagination as TablePagination, Table } from './styles';
import PaginationActions from './paginationActions';

import { PaginationProps } from './intefaces';

const Pagination = (props: PaginationProps) => {
  const { totalRows, rowsPerPage, page, handleChangeRowsPerPage } = props;

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    // setPage(newPage);
    console.log('change page');
  };

  return (
    <Table>
      <tbody>
        <tr>
          <TablePagination
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
    </Table>
  );
}

export default React.memo(Pagination);
