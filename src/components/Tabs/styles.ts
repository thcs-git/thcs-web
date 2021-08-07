import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


export const TabContent = styled(AppBar)`
  //margin-bottom: 10px;
  height: 48px;
`;

export const TabNav = styled(Tabs)`
  background: var(--gray-light);
  box-shadow: 1px 1px 3px #00000029;

  display: flex;
  flex-direction: row;
`;

export const TabNavItem = styled(Tab)`
  font-weight: bold;
  color: var(--gray-dark);

  cursor: pointer;

  max-width: 500px;

  &.active {
    color: var(--secondary);
  }

  &:focus {
    outline: 0 !important;
  }
`;

export const TabBody = styled.div`
  background: var(--white);
  border-radius: 0px 0px 4px 4px;

  padding: 40px 15px 15px 15px;

  height: 550px;

  overflow-x: hidden;
`;

export const TabBodyItem = styled.div`
  width: 100%;
  display: block;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;

  &.show {
    width: 100%;
    display: block;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
  }
`;
