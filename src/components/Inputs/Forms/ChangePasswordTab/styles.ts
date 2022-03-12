import styled from "styled-components";
import Box from "@material-ui/core/Box";
import Button from "@mui/material/Button";

export const BoxCustom = styled(Box)`
  min-height: calc(100vh - 250px);
  margin: 20px 40px;

  .MuiOutlinedInput-input {
    height: 10px;
    /* padding: 16px; */
  }
  .MuiInputBase-input {
    padding: 19.5px 14px;
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
`;

export const BoxCustomFoot = styled(Box)`
  min-height: calc(100vh - 250px);
  margin: 20px;
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

export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-start;

  margin-bottom: 20px;

  button:first-child {
    margin-right: 10px;
  }
`;

export const ButtonDefault = styled(Button)`
  /* background: var(--success-hover);
  border: 1px solid var(--primary);
  color: var(--white);
  border-color: var(--success-hover);
  width: 10rem;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  color: #fff; */
  background: blue;
`;
