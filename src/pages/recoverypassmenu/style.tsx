import styled from "styled-components";
import { TextField, OutlinedInput, Button, FormControl } from "@mui/material";

export const ButtonDefault = styled(Button)`
  background: var(--success-hover);
  border: 1px solid var(--primary);
  color: var(--white);
  border-color: var(--success-hover);
  width: 10rem;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
`;
export const ButtonsContent = styled.div`
  display: flex;
  justify-content: flex-start;

  margin-bottom: 20px;

  button:first-child {
    margin-right: 10px;
  }
`;
