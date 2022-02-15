import styled from "styled-components";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { FormControl } from "@material-ui/core";
import Box from "@mui/material/Box";

export const TabContent = styled(AppBar)`
  //margin-bottom: 10px;
  height: 48px;
  /* display: flex; */
  /* width: 100%; */
  box-shadow: none;
`;

export const TabNav = styled(Tabs)`
  background: #f2f2f2;
  box-shadow: 1px 1px 3px #00000029;
  /* width: 100%; */

  display: flex;
  flex-direction: row;
`;

export const TabNavItem = styled(Tab)`
  /* font-weight: bold; */
  color: #cccccc;
  /* display: flex; */

  cursor: pointer;

  max-width: 100%;
  box-shadow: none;

  &.active {
    color: var(--secondary);
  }

  &:focus {
    outline: 0 !important;
  }
`;

export const TabNavItem_1 = styled(Tab)`
  font-weight: bold;
  color: var(--gray-dark);
  /* display: flex; */
  width: 100%;
  cursor: pointer;

  max-width: 100%;
  box-shadow: none;

  &.active {
    color: var(--primary);
  }

  &:focus {
    outline: 0 !important;
  }
`;

// export const TabNavItem_1 = styled(Tab);

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

export const TabNavItemDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 32px;
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

  & MaleIcon {
    width: 14px;
    height: 14px;
  }
  svg {
    /* min-width: 32px; */
  }
`;
export const TabNavItemAlingRigth = styled.div`
  display: flex;
  justify-self: flex-end;
  justify-items: flex-end;
  align-items: center;
  gap: 30px;
  margin-right: 21px;
  /* width: 100%; */
`;

export const WrapperName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 16px;
  font-weight: bold;

  margin-left: 16px;
`;

export const TabNavItemPermission = styled(Tab)`
  color: var(--gray-dark);
  text-transform: capitalize;

  /* display: flex; */

  cursor: pointer;

  /* max-width: 100%; */
  box-shadow: none;

  border-radius: 30px;
  color: var(--white);
  margin-right: 8px;
  font-size: 11px;
  height: 32px;
  font-weight: normal;

  &.active {
    background-color: var(--secondary);
    border: 1px solid #0786a3;
    color: var(--white);
    svg {
      fill: #f9f9f9;
    }
  }
  &.desactive {
    background-color: none;
    border: 1px solid #e0e0e0;
    color: #9e9e9e;
    svg {
      fill: #9e9e9e;
    }
  }

  &:focus {
    outline: 0 !important;
  }
  .MuiTab-root {
    min-height: 32px;
  }
`;

export const TabNavPermission = styled(Tabs)`
  background: var(--gray-light);
  cursor: pointer;

  display: flex;
  flex-direction: row;

  .MuiTab-root {
    min-height: 32px;
    min-width: 100px;
  }
`;

export const WrapperHeaderForm = styled(Box)`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: var(--gray-dark);
  border-radius: 8px 8px 0 0;
  background-color: var(--gray-light);
  gap: 17px;
  padding: 15.3px;
  width: min-content;
  height: 35px;
  margin-right: 1.7px;
  margin-bottom: 4px;
`;
