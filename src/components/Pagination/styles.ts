import styled from 'styled-components';
import TablePagination from '@material-ui/core/TablePagination';

export const Pagination = styled(TablePagination)`
  border-bottom: none;
`;

export const ContainerPaginationActions = styled.div`
  flex-shrink: 0;
`;

export const Table = styled.table`
  display: flex;
  justify-content: flex-end;
`;
