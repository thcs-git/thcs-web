import styled from "styled-components";
import Box from "@mui/material/Box";

import ButtonTabs from "../../Button/ButtonTabs";

export const ButtonGeneration = styled(ButtonTabs)``;
export const ButtonPrint = styled.button`
  height: 36px;
  padding: 5px 33.5px;
  margin-top: 25px;
  border-radius: 4px;
  background: var(--primary);
  color: var(--white);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    background: var(--primary-hover);
  }
`;
