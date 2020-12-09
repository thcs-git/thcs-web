import React from 'react';
import { IconButton } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { PaginationProps } from './intefaces';
import { ContainerPaginationActions } from './styles';

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
    handlePreviosPage
  } = props;

  return (
    <ContainerPaginationActions>
      <IconButton
        onClick={handleFirstPage}
        disabled={parseInt(page) == INITIAL_PAGE}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handlePreviosPage} disabled={parseInt(page) === INITIAL_PAGE} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextPage}
        disabled={parseInt(page) >= Math.ceil(totalRows / parseInt(rowsPerPage))}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPage}
        disabled={parseInt(page) >= Math.ceil(totalRows / parseInt(rowsPerPage))}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </ContainerPaginationActions>
  );
}

export default React.memo(TablePaginationActions);
