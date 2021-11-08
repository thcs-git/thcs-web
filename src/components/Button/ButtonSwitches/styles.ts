import styled from "styled-components";
import {Button, ButtonGroup} from "@material-ui/core";

export const ButtonGroupComponent = styled(ButtonGroup)`
  justify-content: center;
  max-width: 350px;
  background: var(--grey) !important;
  box-shadow: none;
`;

export const ButtonComponent = styled(Button)`
  color: ${props => props.value === 'selected' ? "var(--white)" : "var(--white)"};
  background-color: ${props => props.value === 'selected' ? "var(--primary)" : "var(--gray)"};
`;
