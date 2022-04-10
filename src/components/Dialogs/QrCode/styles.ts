import styled from "styled-components";
import Box from "@mui/material/Box";

import ButtonTabs from "../../Button/ButtonTabs";

export const ButtonGeneration = styled(ButtonTabs)``;
export const ButtonPrint = styled.button`
  height: 36px;
  padding: 5px 33.5px;
  border-radius: 4px;
  background: var(--primary);
  color: var(--white);
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  &:hover {
    background: var(--primary-hover);
  }
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition-property: background-color, box-shadow, border;
  transition-duration: 250ms, 250ms, 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1),
    cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0ms, 0ms, 0ms; ;
`;
