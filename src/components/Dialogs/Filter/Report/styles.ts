import FormLabel from "@material-ui/core/FormLabel";
import Box from "@mui/material/Box";
import styled from "styled-components";

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
export const BoxTooltip = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  background-color: var(--gray);
  border-radius: 10px;
  text-align: center;
  margin-right: 5.3px;
  color: var(--white);
  font-weight: bold;
`;

export const FormLabelRadio = styled(FormLabel)`
  color: var(--black);
  font-weight: bold;
`;
