import styled from "styled-components";
import { styled as styledMui } from "@mui/system";
import Container from "@mui/material/Container";
import Grid, { GridProps } from "@mui/material/Grid";
import Box, { BoxProps } from "@mui/material/Box";

export const GridWrapper = styledMui(Grid)<GridProps>(({ theme }) => ({
  flex: "1",
  padding: "26.5px",
  backgroundColor: theme.palette.background.paper,
  boxShadow: `0px 1px 4px ${theme.palette.shadowColor.main} `,
  borderRadius: "8px",
  margin: "8px",
}));

export const GridStyle = styled(Grid)`
  background-color: var(--white);
  box-shadow: 0px 1px 4px #00000012;
  border-radius: 8px;
`;
export const BoxContainer = styled(Box)`
  background-color: var(--white);
  box-shadow: 0px 1px 4px #00000012;
  border-radius: 8px;
`;

export const TextRed = styled(Box)`
  display: inline;
  color: var(--danger);
  font-weight: bold;
`;
export const WrapperHeader = styled(Box)`
  display: flex;
  margin-bottom: 16px;
  position: relative;
`;

export const WrapperTittle = styledMui(Box)<BoxProps>(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.primary.main,
  minWidth: "300px",
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: "8px",
}));
