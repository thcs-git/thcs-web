import styled from "styled-components";
import { Button, ButtonGroup } from "@material-ui/core";

export const ButtonGroupComponent = styled(ButtonGroup)`
  justify-content: center;
  max-width: 350px;
  background: var(--grey);
  box-shadow: none;
`;

export const ButtonComponent = styled(Button)`
  color: ${(props) =>
    props.value === "selected" ? "var(--white)" : "var(--gray-dark)"};
  background-color: ${(props) =>
    props.value === "selected" ? "var(--secondary)" : "var(--gray)"};
  box-shadow: none;
  border-radius: 26px;
  margin: 8px 14px 14px 0;
  cursor: pointer;
  text-transform: none;
  font-weight: bold;

  &:hover {
    background-color: ${(props) =>
      props.value === "selected" ? "var(--secondary)" : "var(--gray)"};
  }
`;
