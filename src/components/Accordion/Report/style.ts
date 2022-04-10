import styled from "styled-components";
import { styled as styledMui } from "@mui/material/styles";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails, {
  AccordionDetailsProps,
} from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button, { ButtonProps } from "@mui/material/Button";
import Paper, { PaperProps } from "@mui/material/Paper";
import Stack, { StackProps } from "@mui/material/Stack";

export const AccordionStyled = styled(Accordion)`
  color: var(--black);
  margin: 0 16px;

  .MuiAccordionSummary-root {
  }
  .Mui-expanded {
    transition: 100ms;
    background-color: var(--secondary);
    color: var(--white);

    svg {
      color: var(--white);
      fill: var(--white);
    }
  }
`;

export const AccordionDetailsStyled = styledMui(
  AccordionDetails
)<AccordionDetailsProps>(({ theme }) => ({
  padding: "0 16px",
}));

export const AccordionSummaryStyled = styled(AccordionSummary)``;

export const HeaderDetailsAccordion = styled(Box)`
  color: var(--gray-dark);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-height: 48px;
`;
export const ContentDetailsAccordion = styled(Box)`
  color: var(--black);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  min-height: 48px;
`;

export const TextCenterDetails = styled(Box)`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 200px;
  margin: auto 0;
`;

export const ContainerStyled = styled(Container)`
  padding-bottom: 24px;

  .MuiContainer-root {
    margin: 16px 0 0 0;
  }

  // MuiAccordion
  .MuiAccordion-root {
    background-color: var(--white);

    margin-bottom: 8px;
  }
  .MuiAccordion-root.Mui-expanded {
    margin: 16px !important;
  }
  .MuiAccordion-root::before {
    display: none;
  }

  .MuiAccordion-rounded {
    border-radius: 12px !important;
  }
  // muiAccordionSumary
  .MuiAccordionSummary-root {
    border-radius: 12px 12px 12px 12px;
    svg {
      color: var(--secondary);
    }
  }
  .MuiAccordionSummary-root.Mui-expanded {
    border-radius: 12px 12px 0 0;
  }
  .MuiAccordionSummary-content {
    display: flex;
    justify-content: space-between;
    color: var(--gray-dark);
  }
  .MuiAccordionSummary-content.Mui-expanded {
    color: var(--white);
  }
`;

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
