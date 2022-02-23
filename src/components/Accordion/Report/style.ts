import styled from "styled-components";
import Accordion, { AccordionProps } from "@mui/material/Accordion";
import AccordionDetails, {
  AccordionDetailsProps,
} from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";

export const AccordionStyled = styled(Accordion)`
  color: var(--black);

  .Mui-expanded {
    transition: 100ms;
    background-color: var(--primary);
    color: var(--white);
    svg {
      color: var(--white);
      fill: var(--white);
    }
  }
  ${(props: AccordionProps) => (props.expanded ? "background-color:black" : "")}
`;

export const AccordionDetailsStyled = styled(AccordionDetails)``;

export const AccordionSummaryStyled = styled(AccordionSummary)``;

export const HeaderDetailsAccordion = styled(Box)`
  color: var(--gray-dark);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export const ContentDetailsAccordion = styled(Box)`
  display: flex;
  justify-content: space-between;
  text-align: center;
`;
