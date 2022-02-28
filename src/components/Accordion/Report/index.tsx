import React, { useState } from "react";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";

// icons
import IconMeasurement from "../../Icons/measurement";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import BloodGlucose from "../../Icons/BloodGlucose";
import BodilySurface from "../../Icons/BodilySurface";
import Exam from "../../Icons/Exam";
import Frequency from "../../Icons/Frequency";
import Height from "../../Icons/Height";
import Lung from "../../Icons/Lung";
import Presure from "../../Icons/Presure";
import Saturation from "../../Icons/Saturation";
import Temperature from "../../Icons/Temperature";
import Weight from "../../Icons/Weight";

import Pain from "../../Icons/Pain";

// styled components and style
import {
  AccordionStyled as Accordion,
  AccordionDetailsStyled as AccordionDetails,
  AccordionSummaryStyled as AccordionSummary,
  HeaderDetailsAccordion,
  ContentDetailsAccordion,
  TextCenterDetails,
  ContainerStyled as Container,
} from "./style";

// Helps
import { formatDate } from "../../../helpers/date";
import { toast } from "react-toastify";
// components
import Loading from "../../Loading";

interface IAccordionReport {
  content: {
    loading: boolean;
    error: boolean;
    data: any;
  };
  company_id: string;
  // data: IDataAccordion[];
}
interface IDataAccordion {
  _id: string; // data
  list: IAccordionInfo[];
}
interface IAccordionInfo {
  _id: string;
  attendance_id: string;
  canceled: boolean;
  company_id: string;
  created_at: string;
  created_by: [
    {
      _id: string;
      companies_links: [
        {
          _id: string;
          active: boolean;
          companie_id: string;
          customer_id: string;
          exp: string;
          function: string;
          id_integration: string;
          linked_at: string;
        }
      ];
      name: string;
    }
  ];
  itens: IAccordionItem[];
  patient_id: string;
}
interface IAccordionItem {
  _id: string;
  name: string;
  reference: any; //tipar depois
  type: string;
  unit_id: any; //tipar depois
  value: string;
}

export default function AccordionReport(props: IAccordionReport) {
  const { content, company_id } = props;

  const [expanded, setExpanded] = useState<string | false>("panel0");
  const measurementsItemObjectIdMD = [
    {
      _id: "62026db535284c714701a9ac",
      name: "Pressão Arterial Diastólica",
    },
    {
      _id: "5f7f796167a82d0e01571c42",
      name: "Frequência Respiratória",
    },
    {
      _id: "5f7f78fc67a82d0e01571c40",
      name: "Frequência Cardíaca",
    },
    {
      _id: "5f7f773567a82d0e01571c3d",
      name: "Superfícia Corporal",
    },
    {
      _id: "5f7f772567a82d0e01571c3b",
      name: "Índice de Massa Corporal",
    },
    {
      _id: "5f7f771f67a82d0e01571c39",
      name: "Altura",
    },
    {
      _id: "5f7f771b67a82d0e01571c37",
      name: "Peso",
    },
    {
      _id: "5f7f768067a82d0e01571c35",
      name: "Hemoglico Teste",
    },
    {
      _id: "5f20a77811ebd813183e6a03",
      name: "Dor",
    },
    {
      _id: "5f20a76a11ebd813183e6a01",
      name: "SpO2",
    },
    {
      _id: "5f20a74011ebd813183e69ff",
      name: "Pressão Arterial Sistólica",
    },
    {
      _id: "5f1f660a8590e0d2df9ad113",
      name: "Temperatura",
    },
  ];
  console.log(content.data, "DATAAA");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleFunction = (list: IAccordionInfo, company: string) => {
    return list.created_by[0].companies_links.map(
      (item: any, index: number) => {
        if (item.companie_id === company) {
          return item.function;
        }
      }
    );
  };
  const handleMeasurementItemsIcons = (measurements: IAccordionItem[]) => {
    return measurements.map(
      (measurementItem: IAccordionItem, index: number) => {
        switch (measurementItem.name) {
          case "PAD":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Presure
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Frequência Respiratória":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Lung
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Frequência Cardíaca":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Frequency
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Superfície Corpórea":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <BodilySurface
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "IMC":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Exam
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Altura":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Height
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Peso":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Weight
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "HGT":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <BloodGlucose
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Dor":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Pain
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );

          case "SpO2":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Saturation
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "PAS":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Presure
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Temperatura":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Temperature
                    fill={"var(--secondary)"}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
        }
      }
    );
  };

  const handleRow = (list: IAccordionInfo[]) => {
    return list.map((column: IAccordionInfo, index: number) => {
      return (
        <>
          <ContentDetailsAccordion key={column._id}>
            <TextCenterDetails sx={{ width: "80px" }}>
              {formatDate(column.created_at, "HH:mm")}
            </TextCenterDetails>
            <TextCenterDetails>{column.created_by[0].name}</TextCenterDetails>
            <TextCenterDetails>
              {handleFunction(column, company_id)}
            </TextCenterDetails>
            <TextCenterDetails sx={{ width: "320px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  margin: "2px",
                }}
              >
                {handleMeasurementItemsIcons(column.itens)}
              </Box>
            </TextCenterDetails>
            <TextCenterDetails
              sx={{ width: "100px", justifyContent: "flex-start" }}
            >
              <DownloadIcon
                sx={{ color: "var(--secondary)", marginRight: "8px" }}
              />
              <PrintIcon sx={{ color: "var(--secondary)" }} />
            </TextCenterDetails>
          </ContentDetailsAccordion>
          {list.length !== index + 1 ? (
            <Divider sx={{ width: "97%", margin: "0 auto" }} />
          ) : (
            ""
          )}
        </>
      );
    });
  };

  function handleHeaderDetails() {
    return (
      <>
        <HeaderDetailsAccordion>
          <TextCenterDetails sx={{ width: "80px" }}>Hora</TextCenterDetails>
          <TextCenterDetails>Profissional</TextCenterDetails>
          <TextCenterDetails>Função</TextCenterDetails>
          <TextCenterDetails sx={{ width: "320px" }}>
            Conteúdo
          </TextCenterDetails>
          <TextCenterDetails
            sx={{ width: "100px", justifyContent: "flex-start" }}
          >
            Opções
          </TextCenterDetails>
        </HeaderDetailsAccordion>
        <Divider sx={{ width: "97%", margin: "0 auto" }} />
      </>
    );
  }

  return (
    <>
      {content.loading && <Loading />}
      {content.error &&
        toast.error("Não foi possível carregar os relatórios deste prontuário")}
      {content.data ? (
        <Container>
          {content.data.map(({ _id, list }: IDataAccordion, index: number) => {
            return (
              <Accordion
                key={_id}
                disableGutters={true}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}bh-content`}
                  id={`panel${index}bh-header`}
                >
                  <Box
                    sx={{
                      display: "flex",
                      gap: "8px",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <IconMeasurement
                      fill={
                        expanded === `panel${index}`
                          ? "var(--white)"
                          : "var(--gray-dark)"
                      }
                      width="22px"
                      height={"22px"}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {formatDate(_id, "DD/MM/YY")}
                    </Box>
                  </Box>
                  <PrintIcon sx={{ cursor: "pointer", marginRight: "12px" }} />
                </AccordionSummary>
                <AccordionDetails>
                  {handleHeaderDetails()}
                  {handleRow(list)}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Container>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            color: "var(--gray-dark)",
            padding: "8px 0 16px",
          }}
        >
          Não há relatórios para este prontuário
        </Box>
      )}
    </>
  );
}
