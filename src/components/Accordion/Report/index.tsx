import React, { useState } from "react";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AccordionProps } from "@mui/material";
import Divider from "@mui/material/Divider";

// icons
import { ReactComponent as IconsCouting } from "../../../assets/img/icon-plantao.svg";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

// styled components
import {
  AccordionStyled as Accordion,
  AccordionDetailsStyled as AccordionDetails,
  AccordionSummaryStyled as AccordionSummary,
  HeaderDetailsAccordion,
  ContentDetailsAccordion,
} from "./style";
import Container from "@mui/material/Container";

interface IAccordionReport {
  rows: IRowsAccordion[];
}
interface IRowsAccordion {
  hour: string;
  professional: string;
  function: string;
  documentName: string;
  options: any;
}

export default function AccordionReport(props: IAccordionReport) {
  const { rows } = props;
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  function handleRow(content: IRowsAccordion[]) {
    const rows = content.map((row: IRowsAccordion) => {
      return (
        <>
          <ContentDetailsAccordion>
            <Box sx={{ width: "150px", textAlign: "center" }}>{row.hour}</Box>
            <Box sx={{ width: "150px", textAlign: "center" }}>
              {row.professional}
            </Box>
            <Box sx={{ width: "150px", textAlign: "center" }}>
              {row.function}
            </Box>
            <Box sx={{ width: "150px", textAlign: "center" }}>
              {row.documentName}
            </Box>
            <Box sx={{ width: "150px", textAlign: "center" }}>
              <DownloadIcon sx={{ color: "var(--secondary)" }} />
              <PrintIcon sx={{ color: "var(--secondary)" }} />
            </Box>
          </ContentDetailsAccordion>
          <Divider sx={{ margin: "4px 0" }} />
        </>
      );
    });
    return rows;
  }
  function handleHeaderDetails() {
    return (
      <>
        <HeaderDetailsAccordion>
          <Box sx={{ width: "150px", textAlign: "center" }}>Hora</Box>
          <Box sx={{ width: "150px", textAlign: "center" }}>Profissional</Box>
          <Box sx={{ width: "150px", textAlign: "center" }}>Função</Box>
          <Box sx={{ width: "150px", textAlign: "center" }}>
            Nome do Documento
          </Box>
          <Box sx={{ width: "150px", textAlign: "center" }}>Opções</Box>
        </HeaderDetailsAccordion>
        <Divider sx={{ margin: "4px 0" }} />
      </>
    );
  }

  return (
    <Container>
      <Accordion
        disableGutters={true}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        defaultExpanded={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Box sx={{ display: "flex", gap: "8px" }}>
            {(props: AccordionProps) =>
              props.expanded ? <IconsCouting /> : "eeee"
            }
            <IconsCouting />
            <Box>22/02/2022</Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {handleHeaderDetails()}
          {handleRow(rows)}
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters={true}
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Box sx={{ display: "flex", gap: "8px" }}>
            <IconsCouting />
            <Box>21/02/2022</Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {handleHeaderDetails()}
          {handleRow(rows)}
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters={true}
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Box sx={{ display: "flex", gap: "8px" }}>
            <IconsCouting />
            <Box>20/02/2022</Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {handleHeaderDetails()}
          {handleRow(rows)}
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters={true}
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Box sx={{ display: "flex", gap: "8px" }}>
            <IconsCouting />
            <Box>19/02/2022</Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {handleHeaderDetails()}
          {handleRow(rows)}
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
