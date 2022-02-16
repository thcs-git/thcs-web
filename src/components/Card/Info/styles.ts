import styled from "styled-components";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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

export const WrapperTittle = styled(Box)`
  font-weight: bold;
  color: var(--secondary);
  min-width: 300px;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;
