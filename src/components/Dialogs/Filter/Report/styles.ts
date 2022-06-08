import FormLabel from "@mui/material/FormLabel";
import Box, { BoxProps } from "@mui/material/Box";
import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";

export const BoxCalendar = styled(Box)`
  display: flex;
  gap: 16px;
  label {
    font-style: italic;
  }
  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border: 2px solid var(--secondary);
  }
  .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-error
    .MuiOutlinedInput-notchedOutline {
    border: 2px solid var(--danger);
  }
`;
export const BoxTooltip = styledMui(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  backgroundColor: theme.palette.grey[300],
  borderRadius: "10px",
  textAlign: "center",
  marginRight: "5.3px",
  color: theme.palette.secondary.main,
  fontWeight: 600,
  cursor: "help",
}));

export const FormLabelRadio = styled(FormLabel)`
  color: var(--black);
  font-weight: bold;
`;
