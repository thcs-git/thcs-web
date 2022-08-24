import styled from "styled-components";
import { Button, ButtonProps, ButtonGroup, Tab, TabProps } from "@mui/material";
import { styled as styledMui } from "@mui/system";

import theme from "../../../theme/theme";
export const ButtonGroupComponent = styled(ButtonGroup)`
  justify-content: center;
  max-width: 350px;
  background: var(--grey);
  box-shadow: none;
`;

export const ButtonComponent = styled(Button)`
  /* height: 32px;
  color: ${(props) =>
    props.value === "selected"
      ? theme.palette.common.white
      : theme.palette.text.secondary};

  background-color: ${(props) =>
    props.value === "selected"
      ? theme.palette.secondary.main
      : theme.palette.background.paper};

  border: 1px solid
    ${(props) =>
    props.value === "selected"
      ? theme.palette.primaryLighter.main
      : theme.palette.text.secondary};

  box-shadow: none;
  border-radius: 26px;
  cursor: pointer;
  text-transform: none;
  font-weight: bold;
  span {
    cursor: pointer;
  }

  &:hover {
    box-shadow: none;
    background-color: ${(props) =>
    props.value === "selected"
      ? theme.palette.secondary.main
      : theme.palette.common.white};
  } */
`;

export const ButtonSwitchStyle = styledMui(Button)<ButtonProps>(
  ({ theme, value }) => ({
    textTransform: "capitalize",
    cursor: "pointer",
    boxShadow: "none",
    borderRadius: "30px",
    marginRight: "4px",
    fontSize: "11px",
    height: "32px",
    fontWeight: "normal",
    color:
      value === "selected"
        ? theme.palette.common.white
        : theme.palette.text.secondary,
    backgroundColor:
      value === "selected"
        ? theme.palette.secondary.main
        : theme.palette.background.paper,
    border: `1px solid ${
      value === "selected"
        ? theme.palette.primaryLighter.main
        : theme.palette.text.secondary
    }`,
    "&:hover": {
      boxShadow: "none",
      backgroundColor:
        value === "selected"
          ? theme.palette.secondary.main
          : theme.palette.common.white,
    },
  })
);
