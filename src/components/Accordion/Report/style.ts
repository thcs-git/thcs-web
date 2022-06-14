import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails, {
  AccordionDetailsProps,
} from "@mui/material/AccordionDetails";
import AccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import Box, { BoxProps } from "@mui/material/Box";
import Container, { ContainerProps } from "@mui/material/Container";
import Paper, { PaperProps } from "@mui/material/Paper";
import { Typography, TypographyProps } from "@mui/material";

export const TypographyFontWeight400 = styledMui(Typography)<TypographyProps>(
  ({ theme }) => ({
    fontWeight: 400,
  })
);
export const AccordionStyled = styled(Accordion)``;

export const AccordionDetailsStyled = styledMui(
  AccordionDetails
)<AccordionDetailsProps>(({ theme }) => ({}));

export const AccordionSummaryStyled = styledMui(
  AccordionSummary
)<AccordionSummaryProps>(({ theme }) => ({}));

export const HeaderDetailsAccordion = styledMui(Box)<BoxProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  minHeight: " 48px",
}));

export const ContentDetailsAccordion = styledMui(Box)<BoxProps>(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    minHeight: "48px",
  })
);
export const TextCenterDetails = styledMui(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
  width: "200px",
  margin: "auto 0",
}));

export const ContainerStyled = styledMui(Container)<ContainerProps>(
  ({ theme }) => ({
    paddingBottom: "24px",

    // "&.MuiContainer-root": {
    //   margin: "16px 0 0 0",
    // },
  })
);

export const PaperStyled = styledMui(Paper)<PaperProps>(({ theme }) => ({
  minHeight: "48px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
  gap: "4px",
  borderRadius: "12px",
  color: "var(--black)",
  svg: { color: "var(--secondary)" },
  transition: "200ms",
  "&:hover": {
    backgroundColor: "var(--secondary)",
    color: "var(--white)",
    svg: { color: "var(--white)" },
  },
}));
