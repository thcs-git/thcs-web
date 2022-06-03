import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";

export const FormGroupSection = styled(FormControl)`
  display: block;
  background-color: var(--white);

  margin-bottom: 30px;
`;
export const CheckBoxInvalid = styledMui(Box)<BoxProps>(({ theme }) => ({
  width: "1.2rem",
  height: "1.2rem",
  borderRadius: "30px",
  border: "3px solid var(--gray)",
  color: "var(--gray)",
  display: "flex",
  flexShrink: 0,
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  fontWeight: "bold",
  fontSize: "1.5rem",
}));

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
