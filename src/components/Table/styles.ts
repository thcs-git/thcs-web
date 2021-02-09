import styled from 'styled-components';
import Menu from '@material-ui/core/Menu';

export const Th = styled.th`
  position: relative;
  padding:4px;
`;

export const MenuFilter = styled(Menu)`
  p {
    padding: 10px 14px;
    color: #666666;
    font-size: 12px;
    outline: none;
  }

  > div {
    /* top: 142px !important;
    left: 1195px !important; */

  }

  ul > li {
    padding: 0px !important;
  }
  th {
    padding:4px;
  }
`;

