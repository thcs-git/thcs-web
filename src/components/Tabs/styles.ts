import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export const TabContent = styled(AppBar)`
  //margin-bottom: 10px;
  height: 48px;
  /* display: flex; */
  /* width: 100%; */
`;

export const TabNav = styled(Tabs)`
  background: var(--gray-light);
  /* box-shadow: 1px 1px 3px #00000029; */
  /* width: 100%; */

  display: flex;
  flex-direction: row;
`;

export const TabNavItem = styled(Tab)`
  font-weight: bold;
  color: var(--gray-dark);
  /* display: flex; */

  cursor: pointer;
  width: 100%;
  max-width: 100%;
  box-shadow: none;

  &.active {
    color: var(--primary);
  }

  &:focus {
    outline: 0 !important;
  }
`;

export const TabBody = styled.div`
  background: var(--white);
  border-radius: 0px 0px 4px 4px;

  padding: 40px 15px 15px 15px;
  /* width: 100%; */
  //height: 750px;

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

export const TabNavItemCompany = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  gap: 8px;
  color: var(--black-intense);
  width: 100%;

  /* &:last-child {
    justify-self: end;
    background-color: rgb(1, 1, 1);
  } */
`;
export const TabNavItemAlingLeft = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  svg {
    min-width: 32px;
  }
`;
export const TabNavItemAlingRigth = styled.div`
  display: flex;
  justify-self: flex-end;
  justify-items: flex-end;
  align-items: center;
  gap: 30px;
  /* width: 100%; */
`;
