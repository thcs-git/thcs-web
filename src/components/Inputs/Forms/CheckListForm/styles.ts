import styled from "styled-components";
import Box from "@mui/material/Box";
import { FormControl } from "@material-ui/core";

export const FormGroupSection = styled(FormControl)`
  display: block;
  background-color: var(--white);

  margin-bottom: 30px;
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
