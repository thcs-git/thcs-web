import styled from "styled-components";
import Box from "@mui/material/Box";
import { styled as styledMui } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

import ButtonTabs from "../../Button/ButtonTabs";

export const ButtonGeneration = styledMui(Button)<ButtonProps>(({ theme }) => ({
  padding: "6px 8px",
}));

export const ButtonToPrint = styledMui(Button)<ButtonProps>(({ theme }) => ({
  padding: "5px 33.5px",
  "& svg, path": {
    cursor: "pointer",
  },
}));
