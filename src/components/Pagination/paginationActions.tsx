import React from 'react';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  // const classes = useStyles1();
  // const theme = useTheme();
  // const { count, page, rowsPerPage, onChangePage } = props;

  // const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   onChangePage(event, 0);
  // };

  // const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   onChangePage(event, page - 1);
  // };

  // const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   onChangePage(event, page + 1);
  // };

  // const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  // };

  // return (
  //   <div className={classes.root}>
  //     <IconButton
  //       onClick={handleFirstPageButtonClick}
  //       disabled={page === 0}
  //       aria-label="first page"
  //     >
  //       {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
  //     </IconButton>
  //     <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
  //       {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
  //     </IconButton>
  //     <IconButton
  //       onClick={handleNextButtonClick}
  //       disabled={page >= Math.ceil(count / rowsPerPage) - 1}
  //       aria-label="next page"
  //     >
  //       {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
  //     </IconButton>
  //     <IconButton
  //       onClick={handleLastPageButtonClick}
  //       disabled={page >= Math.ceil(count / rowsPerPage) - 1}
  //       aria-label="last page"
  //     >
  //       {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
  //     </IconButton>
  //   </div>
  // );
}
