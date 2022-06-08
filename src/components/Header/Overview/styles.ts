import styled from "styled-components";
import Card from "@mui/material/Card";
import Box, { BoxProps } from "@mui/material/Box";
import Container, { ContainerProps } from "@mui/material/Container";
import { styled as styledMui } from "@mui/material/styles";
export const ContainerStyle = styledMui(Container)<ContainerProps>(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    boxShadow: "none",
    minHeight: "101px",
    gap: "14px",
    borderRadius: "8px 8px 0 0",
    paddingBottom: "12px",
    paddingTop: "12px",
  })
);

export const TagAllergic = styled.div`
  background: var(--danger);
  border-radius: 14px;
  width: 82px;
  padding: 4px;
  font-size: 10px;
  display: inline-flex;
  gap: 4px;
`;

export const CardText = styledMui(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  color: theme.palette.common.white,
  fontSize: "12px",
  "&.name": {
    padding: "0 0 4px 0",
    fontWeight: "bold",
    fontSize: "18px",
  },
}));
export const BoxIcon = styledMui(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  flexDirection: "column",
  fontWeight: "bold",
  color: theme.palette.common.black,
  fontSize: "12px",
  textAlign: "center",
  width: "88px",
  borderRadius: "8px",
  height: "70px",
  backgroundColor: theme.palette.common.white,
  cursor: "pointer",
  "& svg": {
    cursor: "pointer",
    " & path": {
      cursor: "pointer",
    },
  },
}));
