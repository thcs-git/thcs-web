import styled from 'styled-components';
import { AppBar, Box, Tab } from '@material-ui/core';

export const TabContent = styled(Box)`
  background: var(--white);
  border-radius: 0px 0px 4px 4px;
`;

export const TabNavigation = styled(Tab)`
  color: var(--gray-dark);
  font-weight: bold;
`;

export const TabAppBar = styled(AppBar)`
  background: var(--gray-light);

  span.MuiTabs-indicator {
    background: var(--primary);
  }

  button.Mui-selected {
    color: var(--primary);
  }
`;
