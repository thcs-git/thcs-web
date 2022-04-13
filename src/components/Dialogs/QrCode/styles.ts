import styled from "styled-components";
import Box from "@mui/material/Box";
import { styled as styledMui } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

import ButtonTabs from "../../Button/ButtonTabs";

export const ButtonGeneration = styledMui(Button)<ButtonProps>(({ theme }) => ({
  background: "var(--primary)",
  padding: "6px 8px",
  color: "var(--white)",
  textTransform: "capitalize",
  "&:hover": {
    background: "var(--primary-hover)",
  },
}));

export const ButtonToPrint = styledMui(Button)<ButtonProps>(({ theme }) => ({
  background: "var(--primary)",
  padding: "5px 33.5px",
  color: "var(--white)",
  "&:hover": {
    background: "var(--primary-hover)",
  },
  "& svg, path": {
    cursor: "pointer",
  },
}));
