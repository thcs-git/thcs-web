import styled from "styled-components";
import Box from "@material-ui/core/Box";

export const BoxCustom = styled(Box)`
  min-height: calc(100vh - 250px);
  margin: 20px 40px;

  .MuiOutlinedInput-input {
    height: 10px;
    /* padding: 16px; */
  }
  .MuiInputBase-input {
    padding: 19.5px 14px;
    color: var(--black);
  }
  .MuiInputBase-inputAdornedEnd {
  }
  .MuiInputLabel-root {
    background-color: var(--white);
    line-height: 18px;
    padding: 0 4px;
  }
  .MuiInputLabel-formControl {
  }
  .MuiInputLabel-outlined {
  }
  .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: var(--secondary);
  }
  .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border: 2px solid var(--secondary);
  }
  .MuiInputBase-input {
  }

  fieldset {
    &:hover {
      border: 2px solid var(--black);
    }
    &:focus {
      border: 2px solid pink;
    }
  }
`;

export const FeedbackTitle = styled.h2`
  color: var(--primary);
  margin-bottom: 27px;
  font-size: 20px;
  font-weight: bold;
`;

export const FeedbackDescription = styled.p`
  color: var(--black);
  font-size: 12px;
  /* margin-bottom: 14px; */
`;
