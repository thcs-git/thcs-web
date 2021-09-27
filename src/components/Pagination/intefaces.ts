export interface PaginationProps {
  rowsPerPageOptions?: any;
  handleChangePage?: () => void;

  // values
  totalRows: number;
  rowsPerPage: string;
  page: string;

  // actions
  handleFirstPage: () => void;
  handlePreviosPage: () => void;
  handleNextPage: () => void;
  handleLastPage: () => void;

  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}


