import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Box from "@mui/material/Box";
import Container from "@material-ui/core/Container";

export const ContainerStyle = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--secondary);
  box-shadow: none;
  min-height: 101px;
  gap: 14px;
  border-radius: 8px 8px 0 0;
  padding-bottom: 12px;
  padding-top: 12px;
`;

export const TagAllergic = styled.div`
  background: var(--danger);
  border-radius: 14px;
  width: 82px;
  padding: 4px;
  font-size: 10px;
  display: inline-flex;
  gap: 4px;
`;

export const CardText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: end; */
  color: var(--white);
  font-size: 12px;
  div {
    &.name {
      padding: 0 0 4px 0;
      font-weight: bold;
      font-size: 18px;
    }
  }
`;
export const BoxIcon = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
  font-weight: bold;
  color: var(--black);
  font-size: 12px;
  text-align: center;
  width: 88px;
  border-radius: 8px;
  height: 70px;
  background-color: var(--white);
  cursor: pointer;
  svg {
    cursor: pointer;
    & path {
      cursor: pointer;
    }
  }
  div {
    cursor: pointer;
  }
`;
