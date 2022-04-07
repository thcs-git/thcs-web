import React, { useState, useEffect } from "react";
// React router dom

import { Link } from "react-router-dom";
// aplication
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";

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
import Allergy from "../../Icons/allergic";
import Evolution from "../../Icons/Evolution";
import Check from "../../Icons/Check";
import Drug from "../../Icons/Drug";
import AdverseEvent from "../../Icons/AdverseEvent";
import Prescription from "../../Icons/Prescription";
import Antibiotic from "../../Icons/Antibiotic";
import ExamsIcon from "../../Icons/ExamsReport";
import AttestIcon from "../../Icons/Attest";
// styled components and style
import {
  AccordionStyled as Accordion,
  AccordionDetailsStyled as AccordionDetails,
  AccordionSummaryStyled as AccordionSummary,
  HeaderDetailsAccordion,
  ContentDetailsAccordion,
  TextCenterDetails,
  ContainerStyled as Container,
  PaperStyled,
} from "./style";

// Helps
import { formatDate } from "../../../helpers/date";
import { toast } from "react-toastify";
import _ from "lodash";
// components
import Loading from "../../Loading";
// types
import {
  AllergiesInterface,
  AllergiesItem,
} from "../../../store/ducks/allergies/types";
import { IconButton } from "@mui/material";
import {
  loadAdverseEventFilterRequest,
  loadAllergyFilterRequest,
  loadCheckinFilterRequest,
  loadCheckinReportRequest,
  loadEvolutionFilterRequest,
  loadMeasurementFilterRequest,
} from "../../../store/ducks/cares/actions";
import { useDispatch, useSelector } from "react-redux";
import { CareState } from "../../../store/ducks/cares/types";
import { ApplicationState } from "../../../store";
import dayjs from "dayjs";
import { ExamsItem } from "../../../store/ducks/exams/types";

interface IAccordionReport {
  content: {
    error: boolean;
    data: any;
  };
  loading: boolean;
  company_id: string;
  reportType: string;
  allergic?: boolean;
  state?: any;
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
  const { content, company_id, reportType, state, loading } = props;
  const dispatch = useDispatch();
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

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

  const NoData = () => (
    <Box
      sx={{
        textAlign: "center",
        color: "var(--gray-dark)",
        padding: "8px 0 16px",
      }}
    >
      Não há relatórios para o prontuário de {reportType}
    </Box>
  );
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const capitalizeText = (words: string) => {
    if (words) {
      return words
        .toLowerCase()
        .split(" ")
        .map((text: string) => {
          return (text = text.charAt(0).toUpperCase() + text.substring(1));
        })
        .join(" ");
    } else return "";
  };

  const getFirstAndLastName = (fullName: string) => {
    return `${fullName.split(" ")[0]} ${
      fullName.split(" ")[fullName.split(" ").length - 1]
    }`;
  };
  const handleFunction = (list: any, company: string, type?: string) => {
    if (type === "allergy" || type === "event") {
      if (!list.created_by?.companies_links || list.created_by === null)
        return "-";
      return list.created_by.companies_links.map((item: any, index: number) => {
        if (item.companie_id === company) {
          return item.function;
        }
      });
    } else if (reportType === "Check-in/out") {
      return list.map((item: any, index: number) => {
        if (item.companie_id === company) {
          return item.function;
        }
      });
    } else {
      return list.created_by[0].companies_links.map(
        (item: any, index: number) => {
          if (item.companie_id === company) {
            return item.function;
          }
        }
      );
    }
  };

  function checkMeasurementValue(measurements: IAccordionItem[]) {
    let measurementCheck: IAccordionItem[] = [];
    measurements.map((item: IAccordionItem) => {
      if (item.value !== "-") {
        return measurementCheck.push(item);
      }
    });
    return measurementCheck;
  }

  const handleMeasurementItemsIcons = (
    measurements: IAccordionItem[],
    canceled: boolean
  ) => {
    return measurements.map(
      (measurementItem: IAccordionItem, index: number) => {
        switch (measurementItem.name) {
          case "PAD":
            return (
              <Tooltip title={measurementItem.name}>
                <Box>
                  <Presure
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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
                    fill={canceled ? "#7D7D7D" : "var(--secondary)"}
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

  function handleHeaderDetails(type?: any) {
    return (
      <>
        <HeaderDetailsAccordion>
          {reportType !== "Check-in/out" && (
            <TextCenterDetails
              sx={{
                width: `${
                  type === "allergy" || type === "event" ? "100px" : "80px"
                }`,
              }}
            >
              Hora
            </TextCenterDetails>
          )}
          <TextCenterDetails
            sx={{
              width: `${
                type === "allergy" || type === "event" ? "250px" : "200px"
              }`,
            }}
          >
            Profissional
          </TextCenterDetails>
          <TextCenterDetails
            sx={{
              width: `${
                type === "allergy" || type === "event" ? "250px" : "200px"
              }`,
            }}
          >
            {reportType === "Evolução"
              ? "Especialidade"
              : type === "event"
              ? "Item de prescrição"
              : "Função"}
          </TextCenterDetails>
          <TextCenterDetails
            sx={{
              width: `${
                type === "allergy" ||
                type === "event" ||
                reportType === "Evolução" ||
                reportType === "Check-in/out"
                  ? "200px"
                  : "320px"
              }`,
            }}
          >
            {type === "allergy"
              ? "Alergia"
              : type === "event"
              ? "Eventos adversos"
              : reportType === "Evolução"
              ? "Tipo Evolução"
              : reportType === "Check-in/out"
              ? "Entrada"
              : "Conteúdo"}
          </TextCenterDetails>
          {reportType === "Alergias" ? (
            ""
          ) : (
            <TextCenterDetails
              sx={{
                width: `${
                  reportType === "Evolução" || reportType === "Check-in/out"
                    ? "200px"
                    : "100px"
                }`,
                justifyContent: "center",
              }}
            >
              {reportType === "Check-in/out" ? "Saída" : "Opções"}
            </TextCenterDetails>
          )}
        </HeaderDetailsAccordion>
        <Divider sx={{ width: "100%", margin: "0 auto" }} />
      </>
    );
  }

  const handleRow = (list: any, type?: string) => {
    if (type) {
      if (type === "allergy") {
        if (content.data.allergy.length === 0) {
          return (
            <Box
              sx={{
                color: "var(--gray-dark)",
                textAlign: "center",
                margin: "16px 0",
              }}
            >
              Não há alergias registradas para este paciente.
            </Box>
          );
        } else
          return list.map((column: any, index: number) => {
            return (
              <>
                <ContentDetailsAccordion key={column._id}>
                  <TextCenterDetails sx={{ width: "100px" }}>
                    {formatDate(column.created_at, "DD/MM/YY HH:mm")}
                  </TextCenterDetails>
                  <TextCenterDetails sx={{ width: "250px" }}>
                    {column.created_by
                      ? integration
                        ? getFirstAndLastName(capitalizeText(column.created_by))
                        : getFirstAndLastName(
                            capitalizeText(column.created_by.name)
                          )
                      : "-"}
                  </TextCenterDetails>
                  <TextCenterDetails sx={{ width: "250px" }}>
                    {handleFunction(column, company_id, type)}
                  </TextCenterDetails>
                  <TextCenterDetails sx={{ width: "200px" }}>
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
                      {integration
                        ? capitalizeText(column.name)
                        : capitalizeText(column.description)}
                    </Box>
                  </TextCenterDetails>
                </ContentDetailsAccordion>
                {list.length !== index + 1 ? (
                  <Divider sx={{ width: "100%", margin: "0 auto" }} />
                ) : (
                  ""
                )}
              </>
            );
          });
      } else if (type === "event") {
        if (content.data.event.length === 0) {
          return (
            <Box
              sx={{
                color: "var(--gray-dark)",
                textAlign: "center",
                margin: "16px 0",
              }}
            >
              Não há eventos adversos registrados para este paciente.
            </Box>
          );
        } else
          return list.map((column: any, index: number) => {
            return (
              <>
                <ContentDetailsAccordion key={column._id}>
                  <TextCenterDetails sx={{ width: "100px" }}>
                    {formatDate(column.created_at, "DD/MM/YY HH:mm")}
                  </TextCenterDetails>
                  <TextCenterDetails sx={{ width: "250px" }}>
                    {column.created_by
                      ? integration
                        ? typeof column.created_by === "string"
                          ? getFirstAndLastName(
                              capitalizeText(column.created_by)
                            )
                          : "-"
                        : typeof column.created_by === "string"
                        ? getFirstAndLastName(
                            capitalizeText(column.created_by.name)
                          )
                        : "-"
                      : "-"}
                  </TextCenterDetails>
                  <TextCenterDetails sx={{ width: "200px" }}>
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
                      <Badge
                        badgeContent={column.item.length}
                        showZero
                        color="primary"
                        overlap="rectangular"
                        sx={{
                          ".MuiBadge-colorPrimary": {
                            backgroundColor: "var(--secondary)",
                            borderRadius: "4px",
                            fontSize: "10px !important",
                            right: "-2px",
                            height: "16px",
                            padding: "5px",
                            minWidth: "min-content",
                          },
                        }}
                      >
                        <Drug
                          fill={"var(--secondary)"}
                          width={"20px"}
                          height={"20px"}
                        />
                      </Badge>
                    </Box>
                  </TextCenterDetails>
                  <TextCenterDetails sx={{ width: "200px" }}>
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
                      <Badge
                        badgeContent={column.type.length}
                        showZero
                        color="primary"
                        overlap="rectangular"
                        sx={{
                          ".MuiBadge-colorPrimary": {
                            backgroundColor: "var(--secondary)",
                            borderRadius: "4px",
                            fontSize: "10px !important",
                            right: "-9px",
                            height: "14px",
                            padding: "5px",
                            minWidth: "min-content",
                          },
                        }}
                      >
                        <AdverseEvent
                          fill={"var(--secondary)"}
                          width={"18px"}
                          height={"18px"}
                        />
                      </Badge>
                    </Box>
                  </TextCenterDetails>
                </ContentDetailsAccordion>
                {list.length !== index + 1 ? (
                  <Divider sx={{ width: "100%", margin: "0 auto" }} />
                ) : (
                  ""
                )}
              </>
            );
          });
      }
    } else if (reportType === "Evolução") {
      return list.map((column: any, index: number) => {
        return (
          <>
            <ContentDetailsAccordion key={column._id}>
              <TextCenterDetails
                sx={{
                  width: "80px",
                  textDecoration: `${column.active ? "none" : "line-through"}`,
                  color: `${column.active ? "#333333" : "#7D7D7D"}`,
                }}
              >
                {formatDate(column.created_at, "HH:mm")}
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  textDecoration: `${column.active ? "none" : "line-through"}`,
                  color: `${column.active ? "#333333" : "#7D7D7D"}`,
                }}
              >
                {getFirstAndLastName(
                  capitalizeText(column.created_by[0]?.name)
                )}
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  textDecoration: `${column.active ? "none" : "line-through"}`,
                  color: `${column.active ? "#333333" : "#7D7D7D"}`,
                }}
              >
                {column.created_by[0]?.main_specialty_id[0]?.name
                  ? column.created_by[0].main_specialty_id[0].name
                  : "-"}
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  textDecoration: `${column.active ? "none" : "line-through"}`,
                  color: `${column.active ? "#333333" : "#7D7D7D"}`,
                }}
              >
                {column.type}
              </TextCenterDetails>
              <TextCenterDetails>
                {/*<DownloadIcon*/}
                {/*  sx={{ color: "var(--secondary)", marginRight: "8px" }}*/}
                {/*/>*/}
                <IconButton
                  color="secondary"
                  aria-label="print"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    height: "36px",
                    width: "36px",
                    "& svg, path": { cursor: "pointer" },
                  }}
                  onClick={() => {
                    const payload = {
                      _id: column._id,
                      type: "Id",
                      name: column._id,
                      dataStart: "",
                      dataEnd: "",
                      reportType: "Evolução",
                      attendance_id: state?.data?._id,
                    };
                    dispatch(loadEvolutionFilterRequest(payload));
                  }}
                >
                  <PrintIcon
                    sx={{ cursor: "pointer", color: "var(--secondary)" }}
                  />
                </IconButton>
              </TextCenterDetails>
            </ContentDetailsAccordion>
            {list.length !== index + 1 ? (
              <Divider sx={{ width: "100%", margin: "0 auto" }} />
            ) : (
              ""
            )}
          </>
        );
      });
    } else if (reportType === "Check-in/out") {
      return list.map((data: any, index: number) => {
        return data.list.map((column: any, index: number) => {
          return (
            <>
              <ContentDetailsAccordion key={index}>
                <TextCenterDetails>
                  {getFirstAndLastName(capitalizeText(data._id.user[0].name))}
                </TextCenterDetails>

                <TextCenterDetails>
                  {handleFunction(data._id.user[0].companies_links, company_id)}
                </TextCenterDetails>

                <TextCenterDetails>
                  {formatDate(column[0].created_at, "HH:mm")}
                </TextCenterDetails>
                <TextCenterDetails>
                  {column[1] ? formatDate(column[1].created_at, "HH:mm") : "-"}
                </TextCenterDetails>
              </ContentDetailsAccordion>
              {list.length !== index + 1 ? (
                <Divider sx={{ width: "100%", margin: "0 auto" }} />
              ) : (
                ""
              )}
            </>
          );
        });
      });
    } else {
      return list.map((column: IAccordionInfo, index: number) => {
        return (
          <>
            <ContentDetailsAccordion key={column._id}>
              <TextCenterDetails
                sx={{
                  width: "80px",
                  textDecoration: `${
                    column.canceled ? "line-through" : "none"
                  }`,
                  color: `${column.canceled ? "#7D7D7D" : "#333333"}`,
                }}
              >
                {formatDate(column.created_at, "HH:mm")}
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  textDecoration: `${
                    column.canceled ? "line-through" : "none"
                  }`,
                  color: `${column.canceled ? "#7D7D7D" : "#333333"}`,
                }}
              >
                {getFirstAndLastName(capitalizeText(column.created_by[0].name))}
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  textDecoration: `${
                    column.canceled ? "line-through" : "none"
                  }`,
                  color: `${column.canceled ? "#7D7D7D" : "#333333"}`,
                }}
              >
                {handleFunction(column, company_id)}
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  width: "320px",
                  textDecoration: `${
                    column.canceled ? "line-through" : "none"
                  }`,
                  color: `${column.canceled ? "#7D7D7D" : "#333333"}`,
                }}
              >
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
                  {handleMeasurementItemsIcons(
                    checkMeasurementValue(column.itens),
                    column.canceled
                  )}
                </Box>
              </TextCenterDetails>
              <TextCenterDetails
                sx={{ width: "100px", justifyContent: "center" }}
              >
                <IconButton
                  color="secondary"
                  aria-label="print"
                  sx={{
                    cursor: "pointer",
                    color: "var(--secondary)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "36px",
                    width: "36px",
                  }}
                  onClick={() => {
                    if (reportType === "Aferições") {
                      const payload = {
                        _id: column._id,
                        type: "Id",
                        name: column._id,
                        dataStart: "",
                        dataEnd: "",
                        reportType: "Aferições",
                        attendance_id: state?.data?._id,
                      };
                      dispatch(loadMeasurementFilterRequest(payload));
                    }
                  }}
                >
                  <PrintIcon sx={{ cursor: "pointer" }} />
                </IconButton>
              </TextCenterDetails>
            </ContentDetailsAccordion>
            {list.length !== index + 1 ? (
              <Divider sx={{ width: "100%", margin: "0 auto" }} />
            ) : (
              ""
            )}
          </>
        );
      });
    }
  };

  // Accordion das Prescrições
  const prescriptionAccordion = (data: any) =>
    data.map((day: any, index: number) => (
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5000,
            left: "57rem",
            top: "0.4rem",
          }}
        >
          <IconButton
            aria-label="print"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              height: "36px",
              width: "36px",
            }}
            onClick={() => {}}
          >
            <PrintIcon
              sx={{
                color:
                  expanded === `panel${index}`
                    ? "var(--white)"
                    : "var(--secondary)",
                cursor: "pointer",
                "& path": { cursor: "pointer" },
              }}
            />
          </IconButton>
        </Box>
        <Accordion
          key={day[0]}
          disableGutters={true}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
            sx={{
              "& div, svg, path, circle, rect": { cursor: "pointer" },
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Prescription
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
                {day[0]}
              </Box>
            </Box>
            <Box sx={{ cursor: "pointer", width: "36px" }}></Box>
          </AccordionSummary>
          <AccordionDetails>
            {prescriptionAccordionHeader()}
            {prescriptionAccordionDetails(day[1])}
          </AccordionDetails>
        </Accordion>
      </Box>
    ));
  const prescriptionAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails>Id. Prescrição</TextCenterDetails>
        <TextCenterDetails>Profissional</TextCenterDetails>
        <TextCenterDetails>Função</TextCenterDetails>
        <TextCenterDetails>Data Início</TextCenterDetails>
        <TextCenterDetails>Data Fim</TextCenterDetails>
        <TextCenterDetails sx={{ width: "100px" }}>Opções</TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const prescriptionAccordionDetails = (data: any) =>
    data.map((column: any, index: number) => (
      <>
        <ContentDetailsAccordion key={column._id}>
          <TextCenterDetails>{column._id}</TextCenterDetails>
          <TextCenterDetails>
            {getFirstAndLastName(capitalizeText(column.created_by))}
          </TextCenterDetails>
          <TextCenterDetails>
            {capitalizeText(column.function)}
          </TextCenterDetails>
          <TextCenterDetails>
            {column.start_at
              ? formatDate(column.start_at, "DD/MM/YYYY")
              : "Não informado"}
          </TextCenterDetails>
          <TextCenterDetails>
            {column.end_at
              ? formatDate(column.end_at, "DD/MM/YYYY")
              : "Não informado"}
          </TextCenterDetails>
          <TextCenterDetails sx={{ width: "100px" }}>
            <IconButton
              aria-label="print"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "36px",
                width: "36px",
              }}
              onClick={() => {}}
            >
              <PrintIcon
                sx={{
                  color: "var(--secondary)",
                  cursor: "pointer",
                  "& > path": { cursor: "pointer" },
                }}
              />
            </IconButton>
          </TextCenterDetails>
        </ContentDetailsAccordion>
        {data.length !== index + 1 ? (
          <Divider sx={{ width: "100%", margin: "0 auto" }} />
        ) : (
          ""
        )}
      </>
    ));
  // Accordion dos Antibióticos
  const antibioticAccordion = (data: any) =>
    data.map((day: any) =>
      day[1].map((item: any) => (
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 5000,
              left: "57rem",
              top: "0.4rem",
            }}
          >
            <IconButton
              aria-label="print"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                height: "36px",
                width: "36px",
              }}
              onClick={() => {}}
            >
              <PrintIcon
                sx={{
                  color:
                    expanded === `panel${item.id}`
                      ? "var(--white)"
                      : "var(--secondary)",
                  cursor: "pointer",
                  "& path": { cursor: "pointer" },
                }}
              />
            </IconButton>
          </Box>
          <Accordion
            key={item.id}
            disableGutters={true}
            expanded={expanded === `panel${item.id}`}
            onChange={handleChange(`panel${item.id}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${item.id}bh-content`}
              id={`panel${item.id}bh-header`}
              sx={{
                "& div, svg, path, circle, rect": { cursor: "pointer" },
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Antibiotic
                  fill={
                    expanded === `panel${item.id}`
                      ? "var(--white)"
                      : "var(--gray-dark)"
                  }
                  width="22px"
                  height={"22px"}
                />

                <Box>{formatDate(item.start_at, "DD/MM/YYYY")}</Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "85%",
                  }}
                >
                  <Box>{item.name}</Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      border:
                        expanded === `panel${item.id}`
                          ? "1px solid var(--white)"
                          : "1px solid var(--secondary)",
                      borderRadius: "20px",
                      padding: "0 4px",
                      width: "115px",
                    }}
                  >
                    {`Ciclo: D${item.actual_days}/D${item.qtd_days}`}
                  </Box>
                </Box>
              </Box>
              <Box sx={{ cursor: "pointer", width: "36px" }}></Box>
            </AccordionSummary>
            <AccordionDetails key={item.id}>
              {antibioticAccordionDetailsRows(item)}
            </AccordionDetails>
          </Accordion>
        </Box>
      ))
    );
  const antibioticAccordionDetailsRows = (item: any) => (
    <>
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails
          sx={{ width: "min-content", color: "var(--gray-dark)" }}
        >
          Unidade:
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "100%", justifyContent: "flex-start" }}>
          {item.unity}
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails
          sx={{ width: "min-content", color: "var(--gray-dark)" }}
        >
          Quantidade:
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "100%", justifyContent: "flex-start" }}>
          {item.amount}
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails
          sx={{ width: "min-content", color: "var(--gray-dark)" }}
        >
          Frequência:
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "100%", justifyContent: "flex-start" }}>
          {item.frequency}
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails
          sx={{ width: "min-content", color: "var(--gray-dark)" }}
        >
          Horários:
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "100%", justifyContent: "flex-start" }}>
          {item.hritem.map(
            (itemHora: any, index: number) =>
              `${formatDate(itemHora.time, "HH:mm")} ${
                item.hritem.length - 1 === index ? "" : " - "
              }`
          )}
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails
          sx={{ width: "min-content", color: "var(--gray-dark)" }}
        >
          Observações:
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            whiteSpace: "nowrap",
          }}
        >
          {item.description.length < 115 ? (
            capitalizeText(item.description)
          ) : (
            <Tooltip title={item.description}>
              <Box>{`${capitalizeText(
                item.description.substr(0, 115)
              )} ...`}</Box>
            </Tooltip>
          )}
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails
          sx={{
            width: "min-content",
            color: "var(--gray-dark)",
            justifyContent: "flex-start",
          }}
        >
          Componentes:
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "space-between",
          }}
        >
          {item.components.map((component: any, index: number) => (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  minHeight: "36px",
                }}
              >
                <Box>
                  {
                    <Box sx={{ color: "var(--secondary)", display: "inline" }}>
                      {index + 1}
                    </Box>
                  }{" "}
                  - {capitalizeText(component.name)},{" "}
                  {capitalizeText(component.unity)}
                </Box>

                <Box mr={"12px"}>Quantidade: {component.amount}</Box>
              </Box>
              {item.components.length === index + 1 ? (
                ""
              ) : (
                <Divider
                  component="li"
                  sx={{ listStyle: "none", width: "100%" }}
                />
              )}
            </>
          ))}
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails
          sx={{ width: "max-content", color: "var(--gray-dark)" }}
        >
          {capitalizeText(item.function)}:
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          {capitalizeText(item.created_by)}
        </TextCenterDetails>
      </ContentDetailsAccordion>
    </>
  );
  // Accordion de Exames
  const examsAccordion = (data: any) =>
    data.map((date: any, index: number) => (
      <Accordion
        key={index}
        disableGutters={true}
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
          sx={{
            "& div, svg, path, circle, rect": { cursor: "pointer" },
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <ExamsIcon
              fill={
                expanded === `panel${index}`
                  ? "var(--white)"
                  : "var(--gray-dark)"
              }
              width="22px"
              height={"22px"}
            />

            <Box>{date.day}</Box>
          </Box>
          <Box sx={{ cursor: "pointer", width: "36px" }}></Box>
        </AccordionSummary>
        <AccordionDetails key={index}>
          {examsAccordionHeader()}
          {examsAccordionDetails(date.exams)}
        </AccordionDetails>
      </Accordion>
    ));
  const examsAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails sx={{ width: "100px" }}>Hora</TextCenterDetails>
        <TextCenterDetails sx={{ width: "350px" }}>
          Solicitante
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "350px" }}>Exame</TextCenterDetails>
        <TextCenterDetails sx={{ width: "100px" }}>Opções</TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const examsAccordionDetails = (data: any) =>
    data
      .sort((a: any, b: any) => {
        return a.DataCriacao < b.DataCriacao
          ? -1
          : a.DataCriacao > b.DataCriacao
          ? 1
          : 0;
      })
      .map((column: any, index: number) => (
        <>
          <ContentDetailsAccordion key={index}>
            <TextCenterDetails sx={{ width: "100px" }}>
              {formatDate(column.DataCriacao, "HH:mm")}
            </TextCenterDetails>
            <TextCenterDetails sx={{ width: "350px" }}>
              {column?.Prescritor?.Nome
                ? getFirstAndLastName(capitalizeText(column?.Prescritor?.Nome))
                : "Não informado"}
            </TextCenterDetails>
            <TextCenterDetails sx={{ width: "350px" }}>
              {column?.Exames[0]?.Nome
                ? capitalizeText(column.Exames[0].Nome)
                : "Não informado"}
            </TextCenterDetails>

            <TextCenterDetails sx={{ width: "100px" }}>
              <IconButton
                aria-label="print"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  height: "36px",
                  width: "36px",
                }}
                onClick={() => window.open(column.ExamePDFUrl, "_blank")}
              >
                <PrintIcon
                  sx={{
                    color: "var(--secondary)",
                    cursor: "pointer",
                    "& > path": { cursor: "pointer" },
                  }}
                />
              </IconButton>
            </TextCenterDetails>
          </ContentDetailsAccordion>
          {data.length !== index + 1 ? (
            <Divider sx={{ width: "100%", margin: "0 auto" }} />
          ) : (
            ""
          )}
        </>
      ));
  function groupExamsByDate(data: any) {
    const group: any[] = [];

    data.map((exams: any) => {
      let existDate = false;
      let indexExistDate = -1;
      group.map((data: any, index: number) => {
        if (data.day === formatDate(exams.DataCriacao, "DD/MM/YYYY")) {
          existDate = true;
          indexExistDate = index;
        }
      });

      if (!existDate) {
        group.push({
          day: formatDate(exams.DataCriacao, "DD/MM/YYYY"),
          exams: [{ ...exams }],
        });
      } else {
        group[indexExistDate].exams.push(exams);
      }
    });
    return group;
  }

  // accordion de Atestados
  const attestAccordion = (data: any) =>
    data.map((date: any, index: number) => (
      <Accordion
        key={index}
        disableGutters={true}
        expanded={expanded === `panel${index}`}
        onChange={handleChange(`panel${index}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
          sx={{
            "& div, svg, path, circle, rect": { cursor: "pointer" },
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              flexDirection: "row",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <AttestIcon
              fill={
                expanded === `panel${index}`
                  ? "var(--white)"
                  : "var(--gray-dark)"
              }
              width="22px"
              height={"22px"}
            />

            <Box>{date.day}</Box>
          </Box>
          <Box sx={{ cursor: "pointer", width: "36px" }}></Box>
        </AccordionSummary>
        <AccordionDetails key={index}>
          {attestAccordionHeader()}
          {attestAccordionDetails(date.attest)}
        </AccordionDetails>
      </Accordion>
    ));
  const attestAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails sx={{ width: "300px" }}>
          Prescritor
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "100px" }}>CID</TextCenterDetails>
        <TextCenterDetails sx={{ width: "140px" }}>Início</TextCenterDetails>
        <TextCenterDetails sx={{ width: "140px" }}>Término</TextCenterDetails>
        <TextCenterDetails sx={{ width: "100px" }}>Opções</TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const attestAccordionDetails = (data: any) =>
    data
      .sort((a: any, b: any) => {
        return a.DataCriacao < b.DataCriacao
          ? -1
          : a.DataCriacao > b.DataCriacao
          ? 1
          : 0;
      })
      .map((column: any, index: number) => (
        <>
          <ContentDetailsAccordion key={index}>
            <TextCenterDetails sx={{ width: "300px" }}>
              {column?.Prescritor?.Nome
                ? column?.Prescritor?.Nome.length > 35
                  ? getFirstAndLastName(
                      capitalizeText(column?.Prescritor?.Nome)
                    )
                  : capitalizeText(column?.Prescritor?.Nome)
                : "Não informado"}
            </TextCenterDetails>
            <Tooltip title={column?.Atestado?.CID10Estruturado[0]?.Descricao}>
              <TextCenterDetails sx={{ cursor: "help", width: "100px" }}>
                {column?.Atestado?.CID10Estruturado[0]?.Codigo}
              </TextCenterDetails>
            </Tooltip>

            <TextCenterDetails sx={{ width: "140px" }}>
              {`${formatDate(
                column.Atestado.DataInicio,
                "DD/MM/YY"
              )} às ${formatDate(column.Atestado.DataInicio, "HH:mm")}`}
            </TextCenterDetails>
            <TextCenterDetails sx={{ width: "140px" }}>
              {`${formatDate(
                column.Atestado.DataTermino,
                "DD/MM/YY"
              )} às ${formatDate(column.Atestado.DataTermino, "HH:mm")}`}
            </TextCenterDetails>

            <TextCenterDetails sx={{ width: "100px" }}>
              <IconButton
                aria-label="print"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  height: "36px",
                  width: "36px",
                }}
                onClick={() => window.open(column.AtestadoPDFUrl, "_blank")}
              >
                <PrintIcon
                  sx={{
                    color: "var(--secondary)",
                    cursor: "pointer",
                    "& > path": { cursor: "pointer" },
                  }}
                />
              </IconButton>
            </TextCenterDetails>
          </ContentDetailsAccordion>
          {data.length !== index + 1 ? (
            <Divider sx={{ width: "100%", margin: "0 auto" }} />
          ) : (
            ""
          )}
        </>
      ));
  function groupAttestsByDate(data: any) {
    const group: any[] = [];

    data.map((attest: any) => {
      let existDate = false;
      let indexExistDate = -1;
      group.map((data: any, index: number) => {
        if (data.day === formatDate(attest.DataCriacao, "DD/MM/YYYY")) {
          existDate = true;
          indexExistDate = index;
        }
      });

      if (!existDate) {
        group.push({
          day: formatDate(attest.DataCriacao, "DD/MM/YYYY"),
          attest: [{ ...attest }],
        });
      } else {
        group[indexExistDate].attest.push(attest);
      }
    });
    return group;
  }
  console.log(content.data);
  console.log(loading, "loading");
  return (
    <>
      {loading && <Loading />}

      {content.data ? (
        reportType === "Aferições" ||
        reportType === "Evolução" ||
        reportType === "Check-in/out" ? (
          <Container>
            {content.data.map(
              ({ _id, list }: IDataAccordion, index: number) => {
                return (
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 5000,
                        left: "57rem",
                        top: "0.4rem",
                      }}
                    >
                      <IconButton
                        aria-label="print"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          cursor: "pointer",
                          height: "36px",
                          width: "36px",
                        }}
                        onClick={() => {
                          if (reportType === "Check-in/out") {
                            const payload = {
                              _id: "",
                              type: "Group",
                              name: "",
                              dataStart: _id,
                              dataEnd: _id,
                              reportType: "Check-in/out",
                              attendance_id: state?.data?._id,
                            };
                            dispatch(loadCheckinFilterRequest(payload));
                          } else if (reportType === "Evolução") {
                            const payload = {
                              _id: "",
                              type: "Group",
                              name: "",
                              dataStart: _id,
                              dataEnd: _id,
                              reportType: "Evolução",
                              attendance_id: state?.data?._id,
                            };
                            dispatch(loadEvolutionFilterRequest(payload));
                          } else if (reportType === "Aferições") {
                            const payload = {
                              _id: "",
                              type: "Group",
                              name: "",
                              dataStart: _id,
                              dataEnd: _id,
                              reportType: "Aferições",
                              attendance_id: state?.data?._id,
                            };
                            dispatch(loadMeasurementFilterRequest(payload));
                          }
                        }}
                      >
                        <PrintIcon
                          sx={{
                            color:
                              expanded === `panel${index}`
                                ? "var(--white)"
                                : "var(--secondary)",
                            cursor: "pointer",
                            "& path": { cursor: "pointer" },
                          }}
                        />
                      </IconButton>
                    </Box>
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
                        sx={{
                          "& div, svg, path, circle, rect": {
                            cursor: "pointer",
                          },
                          cursor: "pointer",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: "8px",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          {reportType === "Aferições" ? (
                            <IconMeasurement
                              fill={
                                expanded === `panel${index}`
                                  ? "var(--white)"
                                  : "var(--gray-dark)"
                              }
                              width="22px"
                              height={"22px"}
                            />
                          ) : reportType === "Evolução" ? (
                            <Evolution
                              fill={
                                expanded === `panel${index}`
                                  ? "var(--white)"
                                  : "var(--gray-dark)"
                              }
                              width={"22px"}
                              height={"22px"}
                            />
                          ) : reportType === "Check-in/out" ? (
                            <Check
                              fill={
                                expanded === `panel${index}`
                                  ? "var(--white)"
                                  : "var(--gray-dark)"
                              }
                              width={"22px"}
                              height={"22px"}
                            />
                          ) : (
                            ""
                          )}

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {formatDate(_id, "DD/MM/YY")}
                          </Box>
                        </Box>
                        <Box sx={{ width: "36px" }}></Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        {handleHeaderDetails()}
                        {handleRow(list)}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                );
              }
            )}
          </Container>
        ) : reportType === "Alergias" ? (
          <Container>
            {Object.keys(content.data).map((item: any, index: number) => {
              return (
                <Box sx={{ position: "relative" }}>
                  <Box
                    sx={{
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 5000,
                      left: "57rem",
                      top: "0.4rem",
                    }}
                  >
                    <IconButton
                      aria-label="print"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        height: "36px",
                        width: "36px",
                      }}
                      onClick={() => {
                        if (item === "allergy") {
                          const payload = {
                            _id: "",
                            type: "Group",
                            name: "",
                            dataStart: "",
                            dataEnd: "",
                            reportType: "Alergias",
                            attendance_id: state?.data?._id,
                            patient_id: state?.data?.patient_id?._id,
                          };
                          dispatch(loadAllergyFilterRequest(payload));
                        } else if (item === "event") {
                          const payload = {
                            _id: "",
                            type: "Group",
                            name: "",
                            dataStart: "",
                            dataEnd: "",
                            reportType: "Evento Adverso",
                            attendance_id: state?.data?._id,
                            patient_id: state?.data?.patient_id?._id,
                          };
                          dispatch(loadAdverseEventFilterRequest(payload));
                        }
                      }}
                    >
                      <PrintIcon
                        sx={{
                          color:
                            expanded === `panel${index}`
                              ? "var(--white)"
                              : "var(--secondary)",
                          cursor: "pointer",
                          "& path": { cursor: "pointer" },
                        }}
                      />
                    </IconButton>
                  </Box>
                  <Accordion
                    key={item}
                    disableGutters={true}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}bh-content`}
                      id={`panel${index}bh-header`}
                      sx={{
                        "& div, svg, path, circle, rect": { cursor: "pointer" },
                        cursor: "pointer",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Allergy
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
                          {item === "allergy" && "Alergias"}
                          {item === "event" && "Eventos adversos"}
                        </Box>
                      </Box>
                      <Box sx={{ width: "36px" }}></Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {handleHeaderDetails(item)}
                      {handleRow(content.data[item], item)}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              );
            })}
          </Container>
        ) : reportType === "Prescrições" ? (
          content.data.length > 0 ? (
            <Container>
              {integration ? (
                prescriptionAccordion(content.data)
              ) : (
                <Box sx={{ textAlign: "center", color: "var(--gray-dark)" }}>
                  Acordion de Prescrição não configurada para ambiente sem
                  integração
                </Box>
              )}
            </Container>
          ) : (
            NoData()
          )
        ) : reportType === "Antibióticos" ? (
          <Container>{antibioticAccordion(content.data)}</Container>
        ) : reportType === "Exames" ? (
          <Container>
            {examsAccordion(groupExamsByDate(content.data))}
          </Container>
        ) : reportType === "Atestados" ? (
          <Container>
            {attestAccordion(groupAttestsByDate(content.data))}
          </Container>
        ) : (
          ""
        )
      ) : (
        NoData()
      )}

      {content.error &&
        toast.error("Não foi possível carregar os relatórios deste prontuário")}
    </>
  );
}
