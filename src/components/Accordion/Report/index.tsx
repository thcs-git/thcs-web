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
import { IconButton, Tab, Tabs } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
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
import CheckMedIcon from "../../Icons/CheckMed";
import DigitalIcon from "../../Icons/Digital";
import TelemedicineIcon from "../../Icons/Telemedicine";
import AttachmentIcon from "../../Icons/Attachment";
import FormIcon from "../../Icons/Form";
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
  TypographyFontWeight400,
} from "./style";
import theme from "../../../theme/theme";
// Helps
import { formatDate } from "../../../helpers/date";
import { toast } from "react-toastify";
import _ from "lodash";
import dayjs from "dayjs";

// components
import Loading from "../../Loading";
// types REDUX
import {
  AllergiesInterface,
  AllergiesItem,
} from "../../../store/ducks/allergies/types";
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
import { ExamsItem } from "../../../store/ducks/exams/types";
import {
  loadRequestReportUnique as loadRequestReportPrescriptionUnique,
  loadRequestReportCheck,
} from "../../../store/ducks/prescripition/actions";

import { loadRequestReportUnique as loadRequestReportAntibioticUnique } from "../../../store/ducks/antibiotic/actions";
import {
  loadRequestReportUnique,
  loadRequestReportByDay,
} from "../../../store/ducks/telemedicine/actions";
import {
  attachmentList,
  attachments,
} from "../../../store/ducks/attachment/types";
import { loadRequestFile } from "../../../store/ducks/attachment/actions";
import { loadRequestReportByDate } from "../../../store/ducks/prescripition/actions";
import {
  FormGroup,
  FormsData,
} from "../../../store/ducks/forms/types";
import {
  loadFormsFilterRequest,
  loadFormsGroupByDateRequest,
  loadRequest,
} from "../../../store/ducks/forms/actions";

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function AccordionReport(props: IAccordionReport) {
  const { content, company_id, reportType, state, loading } = props;
  const formState = useSelector((state: ApplicationState) => state.forms);
  const dispatch = useDispatch();
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  const [valueTabForm, setValueTabForm] = useState(0);
  const careState = useSelector((state: ApplicationState) => state.cares);
  const colorBackgroundActive = theme.palette.primary.main;
  const colorBackgroundInactive = theme.palette.common.white;
  const colorText = theme.palette.black60.main;
  const colorTextDetails = theme.palette.text.primary;
  const colorTextDesable = theme.palette.text.disabled;
  const timeZone =
    sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION_TIME_ZONE) || undefined;

  useEffect(() => {
    if (!formState.data.length && formState.loading == false && !!content.data) {
      dispatch(loadRequest({
        external_attendance_id: careState.data._id,
        document_id: content?.data[0]?._id,
      }))
    }
  }, [formState.success])

  const NoData = () => (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          textAlign: "center",
          color: colorText,
          padding: "8px 0 16px",
          margin: "0 auto",
        }}
      >
        Não há relatórios para o prontuário de {reportType}
      </Typography>
    </Box>
  );

  const PrintPrescriptionButton = (data) => {
    if (
      !!data.data.items[0].frequency.doses.length ||
      data.data.items[0].acm ||
      data.data.items[0].sn
    ) {
      return (
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
            dispatch(
              loadRequestReportPrescriptionUnique({
                id: data.data._id,
                careId: careState.data._id,
              })
            );
          }}
        >
          <PrintIcon
            sx={{
              color: colorBackgroundActive,
              cursor: "pointer",
              "& > path": { cursor: "pointer" },
            }}
          />
        </IconButton>
      );
    }
  };

  function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
      <Box role="tabpanel" hidden={value !== index} id={`tab-${index}`}>
        {value === index && (
          <Box sx={{ p: 2 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </Box>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `tab-${index}`,
    };
  }

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleChangeTabForm = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValueTabForm(newValue);
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
      if (integration) {
        return list.function ? capitalizeText(list.function) : "-";
      } else if (!list.created_by?.companies_links || list.created_by === null)
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
  const handleSpecialty = (list: any, company: string) => {
    return list.created_by[0].companies_links.map((item: any) => {
      return item.companie_id === company ? item.main_specialty : "";
    });
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
    const measurementsItems = measurements.map(
      (measurementItem: IAccordionItem, index: number) => {
        switch (measurementItem.name) {
          case "Frequência Respiratória":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <Lung
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Frequência Cardíaca":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <Frequency
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Superfície Corpórea":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <BodilySurface
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "IMC":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <Exam
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Altura":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <Height
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Peso":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <Weight
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "HGT":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <BloodGlucose
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Dor":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <Pain
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "SpO2":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <Saturation
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
          case "Temperatura":
            return (
              <Tooltip
                title={`${measurementItem.name}: ${measurementItem.value} ${measurementItem.unit_id[0].short_name}`}
              >
                <Box
                  sx={{
                    cursor: "help",
                    "& svg, path, circle": { cursor: "help" },
                  }}
                >
                  <Temperature
                    fill={canceled ? colorTextDesable : colorBackgroundActive}
                    width={"20px"}
                    height={"20px"}
                  />
                </Box>
              </Tooltip>
            );
        }
      }
    );
    let padOrPas: IAccordionItem[] = [];
    measurements.map((measurementItem: IAccordionItem, index: number) => {
      if (measurementItem.name === "PAD" || measurementItem.name === "PAS") {
        padOrPas.push(measurementItem);
      }
    });
    if (padOrPas.length > 0) {
      measurementsItems.push(
        <Tooltip
          title={
            padOrPas.length === 1
              ? `${padOrPas[0].name}: ${padOrPas[0].value} ${padOrPas[0].unit_id[0].short_name}`
              : padOrPas[0].name === "PAS"
              ? `PA: ${padOrPas[0].value}/ ${padOrPas[1].value} ${padOrPas[1].unit_id[0].short_name}`
              : `PA: ${padOrPas[1].value}/ ${padOrPas[0].value} ${padOrPas[1].unit_id[0].short_name}`
          }
        >
          <Box
            sx={{ "& svg, path, circle": { cursor: "help" }, cursor: "help" }}
          >
            <Presure
              fill={canceled ? colorTextDesable : colorBackgroundActive}
              width={"20px"}
              height={"20px"}
            />
          </Box>
        </Tooltip>
      );
    }
    return measurementsItems;
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
            left: "calc(100% - 7rem)",
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
              let dayModify = day[0].split("/");
              dayModify = `${dayModify[2]}-${dayModify[1]}-${dayModify[0]}`;
              let params = {
                careId: careState.data._id,
                date: dayModify,
                external_sector_id: careState.data.capture?.sector_id,
              };
              dispatch(loadRequestReportByDate(params));
            }}
          >
            <PrintIcon
              sx={{
                color:
                  expanded === `panel${index}`
                    ? colorBackgroundInactive
                    : colorBackgroundActive,
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
                    ? colorBackgroundInactive
                    : colorText
                }
                width="22px"
                height={"22px"}
              />

              <Typography>{day[0]}</Typography>
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
        <TextCenterDetails>
          <Typography fontWeight={500}>Id. Prescrição</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Profissional</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Função</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Data Início</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Data Fim</Typography>
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "100px" }}>
          <Typography fontWeight={500}>Opções</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const prescriptionAccordionDetails = (data: any) =>
    data.map((column: any, index: number) => (
      <>
        <ContentDetailsAccordion key={column._id}>
          <TextCenterDetails
            sx={{
              textDecoration: `${!column.active ? "line-through" : "none"}`,
              color: `${!column.active ? colorTextDesable : colorTextDetails}`,
            }}
          >
            <Typography>{column._id}</Typography>
          </TextCenterDetails>
          <TextCenterDetails
            sx={{
              textDecoration: `${!column.active ? "line-through" : "none"}`,
              color: `${!column.active ? colorTextDesable : colorTextDetails}`,
            }}
          >
            <Typography>
              {getFirstAndLastName(capitalizeText(column.created_by))}
            </Typography>
          </TextCenterDetails>
          <TextCenterDetails
            sx={{
              textDecoration: `${!column.active ? "line-through" : "none"}`,
              color: `${!column.active ? colorTextDesable : colorTextDetails}`,
            }}
          >
            <Typography>{capitalizeText(column.function)}</Typography>
          </TextCenterDetails>
          <TextCenterDetails
            sx={{
              textDecoration: `${!column.active ? "line-through" : "none"}`,
              color: `${!column.active ? colorTextDesable : colorTextDetails}`,
            }}
          >
            <Typography>
              {column.start_at
                ? `${formatDate(
                    column.start_at,
                    "DD/MM/YYYY [às] HH:mm",
                    timeZone
                  )}`
                : "Não informado"}
            </Typography>
          </TextCenterDetails>
          <TextCenterDetails
            sx={{
              textDecoration: `${!column.active ? "line-through" : "none"}`,
              color: `${!column.active ? colorTextDesable : colorTextDetails}`,
            }}
          >
            <Typography>
              {column.end_at
                ? `${formatDate(
                    column.end_at,
                    "DD/MM/YYYY [às] HH:mm",
                    timeZone
                  )}`
                : "Não informado"}
            </Typography>
          </TextCenterDetails>
          <TextCenterDetails sx={{ width: "100px" }}>
            <PrintPrescriptionButton data={column} />
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
              left: "calc(100% - 6rem)",
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
                dispatch(
                  loadRequestReportAntibioticUnique({
                    id: item.id,
                    careId: careState.data._id,
                  })
                );
              }}
            >
              <PrintIcon
                sx={{
                  color:
                    expanded === `panel${item.id}`
                      ? colorBackgroundInactive
                      : colorBackgroundActive,
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
                      ? colorBackgroundInactive
                      : colorText
                  }
                  width="22px"
                  height={"22px"}
                />

                <Typography>
                  {formatDate(item.start_at, "DD/MM/YYYY")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "85%",
                  }}
                >
                  <Typography
                    sx={{
                      textDecoration: `${
                        !item.active ? "line-through" : "none"
                      }`,
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      border:
                        expanded === `panel${item.id}`
                          ? `2px solid ${colorBackgroundInactive}`
                          : `${
                              item.active
                                ? `2px solid ${theme.palette.secondary.main}`
                                : `2px solid ${colorTextDesable}`
                            }`,
                      borderRadius: "20px",
                      padding: "0 4px",
                      width: "115px",
                    }}
                  >
                    <TypographyFontWeight400>
                      {`Ciclo: D${item.actual_days}/D${item.qtd_days}`}
                    </TypographyFontWeight400>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ cursor: "pointer", width: "42px" }}></Box>
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
          sx={{
            width: "min-content",
            color: colorText,
            whiteSpace: "nowrap",
          }}
        >
          <Typography>Id. Prescrição:</Typography>
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "100%", justifyContent: "flex-start" }}>
          <Typography>{item.prescription_id}</Typography>
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails sx={{ width: "min-content", color: colorText }}>
          <Typography>Unidade:</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            textDecoration: `${!item.active ? "line-through" : "none"}`,
            color: `${!item.active ? colorTextDesable : colorTextDetails}`,
          }}
        >
          <Typography>{item.unity}</Typography>
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails sx={{ width: "min-content", color: colorText }}>
          <Typography>Quantidade:</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            textDecoration: `${!item.active ? "line-through" : "none"}`,
            color: `${!item.active ? colorTextDesable : colorTextDetails}`,
          }}
        >
          <Typography>{item.amount}</Typography>
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails sx={{ width: "min-content", color: colorText }}>
          <Typography>Frequência:</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            textDecoration: `${!item.active ? "line-through" : "none"}`,
            color: `${!item.active ? colorTextDesable : colorTextDetails}`,
          }}
        >
          <Typography>{item.frequency}</Typography>
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails sx={{ width: "min-content", color: colorText }}>
          <Typography>Horários:</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            textDecoration: `${!item.active ? "line-through" : "none"}`,
            color: `${!item.active ? colorTextDesable : colorTextDetails}`,
          }}
        >
          <Typography>
            {item.hritem.map(
              (itemHora: any, index: number) =>
                `${formatDate(itemHora.time, "HH:mm", timeZone)} ${
                  item.hritem.length - 1 === index ? "" : " - "
                }`
            )}
          </Typography>
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails sx={{ width: "min-content", color: colorText }}>
          <Typography>Observações:</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            whiteSpace: "nowrap",
            textDecoration: `${!item.active ? "line-through" : "none"}`,
            color: `${!item.active ? colorTextDesable : colorTextDetails}`,
          }}
        >
          {item.description.length < 115 ? (
            <Typography>{capitalizeText(item.description)}</Typography>
          ) : (
            <Tooltip title={item.description}>
              <Typography>{`${capitalizeText(
                item.description.substr(0, 115)
              )} ...`}</Typography>
            </Tooltip>
          )}
        </TextCenterDetails>
      </ContentDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
      <ContentDetailsAccordion sx={{ gap: "8px" }}>
        <TextCenterDetails
          sx={{
            width: "min-content",
            color: colorText,
            justifyContent: "flex-start",
          }}
        >
          <Typography>Componentes:</Typography>
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
                  textDecoration: `${!item.active ? "line-through" : "none"}`,
                  color: `${
                    !item.active ? colorTextDesable : colorTextDetails
                  }`,
                }}
              >
                <Typography>
                  {
                    <Typography
                      sx={{
                        color: theme.palette.secondary.main,
                        display: "inline",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  }{" "}
                  - {capitalizeText(component.name)},{" "}
                  {capitalizeText(component.unity)}
                </Typography>

                <Typography mr={"12px"}>
                  Quantidade: {component.amount}
                </Typography>
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
        <TextCenterDetails sx={{ width: "max-content", color: colorText }}>
          <Typography>{capitalizeText(item.function)}:</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: "100%",
            justifyContent: "flex-start",
            textDecoration: `${!item.active ? "line-through" : "none"}`,
            color: `${!item.active ? colorTextDesable : colorTextDetails}`,
          }}
        >
          <Typography>{capitalizeText(item.created_by)}</Typography>
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
              {formatDate(column.DataCriacao, "HH:mm", timeZone)}
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
        if (
          data.day === formatDate(exams.DataCriacao, "DD/MM/YYYY", timeZone)
        ) {
          existDate = true;
          indexExistDate = index;
        }
      });

      if (!existDate) {
        group.push({
          day: formatDate(exams.DataCriacao, "DD/MM/YYYY", timeZone),
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
            <Tooltip
              title={cidSplit(
                column?.Atestado?.CID10Estruturado[0]?.Codigo,
                "description"
              )}
            >
              <TextCenterDetails sx={{ cursor: "help", width: "100px" }}>
                {cidSplit(
                  column?.Atestado?.CID10Estruturado[0]?.Codigo,
                  "codigo"
                )}
              </TextCenterDetails>
            </Tooltip>
            <TextCenterDetails sx={{ width: "140px" }}>
              {`${formatDate(
                column.Atestado.DataInicio,
                "DD/MM/YY [às] HH:mm",
                timeZone
              )}`}
            </TextCenterDetails>
            <TextCenterDetails sx={{ width: "140px" }}>
              {`${formatDate(
                column.Atestado.DataTermino,
                "DD/MM/YY [às] HH:mm",
                timeZone
              )}`}
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
        if (
          data.day === formatDate(attest.DataCriacao, "DD/MM/YYYY", timeZone)
        ) {
          existDate = true;
          indexExistDate = index;
        }
      });

      if (!existDate) {
        group.push({
          day: formatDate(attest.DataCriacao, "DD/MM/YYYY", timeZone),
          attest: [{ ...attest }],
        });
      } else {
        group[indexExistDate].attest.push(attest);
      }
    });
    return group;
  }
  function cidSplit(data: any, type: string) {
    const dataSlit = data.split("-");

    return type === "description" ? dataSlit[1] : dataSlit[0];
  }

  // acordion de checagem
  const checkAccordion = (data: any) => {
    return data.map((day: any, index: number) =>
      day[1].map(
        (prescription: any, index_sub: number) =>
          (prescription.tp_obj !== "TRATMT" || prescription.converted_at) && (
            <Box sx={{ position: "relative" }}>
              <Box
                sx={{
                  position: "absolute",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 5000,
                  left: "calc(100% - 7rem)",
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
                    dispatch(
                      loadRequestReportCheck({
                        id: prescription._id,
                        careId: careState.data._id,
                      })
                    );
                  }}
                >
                  <PrintIcon
                    sx={{
                      color:
                        expanded === `panel${prescription._id}`
                          ? colorBackgroundInactive
                          : colorBackgroundActive,
                      cursor: "pointer",
                      "& path": { cursor: "pointer" },
                    }}
                  />
                </IconButton>
              </Box>
              <Accordion
                key={prescription._id}
                disableGutters={true}
                expanded={expanded === `panel${prescription._id}`}
                onChange={handleChange(`panel${prescription._id}`)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${prescription._id}bh-content`}
                  id={`panel${prescription._id}bh-header`}
                  sx={{
                    "& div, svg, path, circle, rect": { cursor: "pointer" },
                    cursor: "pointer",
                    fontWeight: "600",
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
                    <CheckMedIcon
                      fill={
                        expanded === `panel${prescription._id}`
                          ? colorBackgroundInactive
                          : colorText
                      }
                      width="22px"
                      height={"22px"}
                    />

                    <Typography>Prescrição Médica</Typography>
                  </Box>
                  <Box sx={{ paddingRight: "calc(9%)" }}>
                    <Typography>{`Validade: ${formatDate(
                      prescription.start_at,
                      "DD/MM/YYYY [às] HH:mm",
                      timeZone
                    )} | ${formatDate(
                      prescription.end_at,
                      "DD/MM/YYYY [às] HH:mm",
                      timeZone
                    )}`}</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: 0 }}>
                  {checkAccordionHeader(
                    prescription._id,
                    prescription.created_by
                  )}
                  {checkAccordionDetails(prescription)}
                </AccordionDetails>
              </Accordion>
            </Box>
          )
      )
    );
  };
  const checkAccordionHeader = (
    idPrescription: string,
    professional: string
  ) => (
    <>
      <HeaderDetailsAccordion
        sx={{
          justifyContent: "flex-start",
          background: theme.palette.secondary.light,
        }}
      >
        <TextCenterDetails
          sx={{
            gap: "0.5rem",
            justifyContent: "flex-start",
            padding: "0 0 0 16px",
          }}
        >
          <Typography>{`Código: ${idPrescription}`}</Typography>
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "auto", paddingLeft: "268px" }}>
          <Typography>{`Prestador: ${professional}`}</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <HeaderDetailsAccordion sx={{ padding: "0 16px", fontWeight: "600" }}>
        <TextCenterDetails
          sx={{ width: "405px", justifyContent: "flex-start" }}
        >
          <Typography fontWeight={500}>Itens de Prescrição</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{ width: "100px", justifyContent: "flex-start" }}
        >
          <Typography fontWeight={500}>Frequência</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Horário</Typography>
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "100px" }}>
          <Typography fontWeight={500}>Opções</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const checkAccordionDetails = (data: any) =>
    data.items.map((item: any, index: number) => {
      return (
        <>
          <ContentDetailsAccordion key={item._id} sx={{ padding: "0 16px" }}>
            <TextCenterDetails
              sx={{
                textDecoration: `${!item.active ? "line-through" : "none"}`,
                color: `${!item.active ? colorTextDesable : colorTextDetails}`,
                justifyContent: "flex-start",
                width: "406px",
              }}
            >
              <Typography>{item?.medication?.Nome}</Typography>
            </TextCenterDetails>
            <TextCenterDetails
              sx={{
                textDecoration: `${!item.active ? "line-through" : "none"}`,
                color: `${!item.active ? colorTextDesable : colorTextDetails}`,
                width: "100px",
                justifyContent: "flex-start",
              }}
            >
              <Typography>
                {`${parseFloat(item?.frequency?.interval) / 3600}h/${
                  parseFloat(item?.frequency?.interval) / 3600
                }h`}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails
              sx={{
                textDecoration: `${!item.active ? "line-through" : "none"}`,
                color: `${!item.active ? colorTextDesable : colorTextDetails}`,
              }}
            >
              <Typography>
                {item?.frequency?.doses?.length > 0 &&
                  item?.frequency?.doses?.map((dose: any, index: number) => {
                    if (dose.original) {
                      return `${formatDate(
                        dose.original_date || dose.administer_date,
                        "HH:mm",
                        timeZone
                      )} ${
                        _.filter(item.frequency.doses, { original: true })
                          .length -
                          1 ===
                        index
                          ? ""
                          : " - "
                      }`;
                    }
                  })}
              </Typography>
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
                onClick={() => {
                  dispatch(
                    loadRequestReportCheck({
                      id: data._id,
                      careId: careState.data._id,
                      typeReport: "uniqueItem",
                      idItem: item.external_item_id,
                    })
                  );
                }}
                // disabled={true}
              >
                <PrintIcon
                  sx={{
                    color: colorBackgroundActive,
                    cursor: "pointer",
                    "& path": { cursor: "pointer" },
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
      );
    });
  // Accordion das alergias e eventos
  const allergyAndEventsAccordion = (data: any) =>
    Object.keys(data).map((item: any, index: number) => {
      return (
        <Box sx={{ position: "relative", width: "100%" }}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 5000,
              left: "calc(100% - 7rem)",
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
                      ? colorBackgroundInactive
                      : colorBackgroundActive,
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
                      ? colorBackgroundInactive
                      : colorText
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
                  <Typography>
                    {item === "allergy" && "Alergias"}
                    {item === "event" && "Eventos adversos"}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "36px" }}></Box>
            </AccordionSummary>
            <AccordionDetails>
              {allergyAndEventsAccordionHeader(item)}
              {allergyAndEventsAccordionDetails(data[item], item)}
            </AccordionDetails>
          </Accordion>
        </Box>
      );
    });
  const allergyAndEventsAccordionHeader = (type: any) => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails
          sx={{
            width: `${"110px"}`,
          }}
        >
          <Typography fontWeight={500}>Hora</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"250px"}`,
          }}
        >
          <Typography fontWeight={500}>Profissional</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${type === "allergy" ? "250px" : "150px"}`,
          }}
        >
          <Typography fontWeight={500}>
            {type === "event" ? "Item de prescrição" : "Função"}
          </Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${type === "allergy" ? "200px" : "150px"}`,
          }}
        >
          <Typography fontWeight={500}>
            {type === "allergy" ? "Alergia" : "Eventos adversos"}
          </Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const allergyAndEventsAccordionDetails = (list: any, type: string) => {
    if (type === "allergy") {
      if (content.data.allergy.length === 0) {
        return (
          <Typography
            sx={{
              color: theme.palette.black60.main,
              textAlign: "center",
              margin: "16px 0",
            }}
          >
            Não há alergias registradas para este paciente.
          </Typography>
        );
      } else
        return list.map((column: any, index: number) => {
          return (
            <>
              <ContentDetailsAccordion key={column._id}>
                <TextCenterDetails sx={{ width: "110px" }}>
                  <Typography>
                    {formatDate(column.created_at, "DD/MM/YY HH:mm", timeZone)}
                  </Typography>
                </TextCenterDetails>
                <TextCenterDetails sx={{ width: "250px" }}>
                  <Typography>
                    {column.created_by
                      ? integration
                        ? getFirstAndLastName(capitalizeText(column.created_by))
                        : getFirstAndLastName(
                            capitalizeText(column.created_by.name)
                          )
                      : "-"}
                  </Typography>
                </TextCenterDetails>
                <TextCenterDetails sx={{ width: "250px" }}>
                  <Typography>
                    {handleFunction(column, company_id, type)}
                  </Typography>
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
                    <Typography>
                      {" "}
                      {integration
                        ? capitalizeText(column.name)
                        : capitalizeText(column.description)}
                    </Typography>
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
          <Typography
            sx={{
              color: theme.palette.black60.main,
              textAlign: "center",
              margin: "16px 0",
            }}
          >
            Não há eventos adversos registrados para este paciente.
          </Typography>
        );
      } else
        return list.map((column: any, index: number) => {
          return (
            <>
              <ContentDetailsAccordion key={column._id}>
                <TextCenterDetails sx={{ width: "110px" }}>
                  <Typography>
                    {formatDate(column.created_at, "DD/MM/YY HH:mm", timeZone)}
                  </Typography>
                </TextCenterDetails>
                <TextCenterDetails sx={{ width: "250px" }}>
                  <Typography>
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
                  </Typography>
                </TextCenterDetails>
                <TextCenterDetails sx={{ width: "150px" }}>
                  <Tooltip
                    title={column.item.map((item: any, index: number) =>
                      index === column.item.length - 1 ? item : item + " + "
                    )}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        margin: "2px",
                        cursor: "help",
                        "& svg, path": { cursor: "help" },
                      }}
                    >
                      <Badge
                        badgeContent={column.item.length}
                        showZero
                        color="primary"
                        overlap="rectangular"
                        sx={{
                          ".MuiBadge-colorPrimary": {
                            borderRadius: "4px",
                            fontSize: "10px",
                            right: "-2px",
                            height: "16px",
                            padding: "5px",
                            minWidth: "min-content",
                            cursor: "help",
                          },
                        }}
                      >
                        <Drug
                          fill={theme.palette.primary.main}
                          width={"20px"}
                          height={"20px"}
                        />
                      </Badge>
                    </Box>
                  </Tooltip>
                </TextCenterDetails>
                <TextCenterDetails sx={{ width: "150px" }}>
                  <Tooltip
                    title={column.type.map((item: any, index: number) =>
                      index === column.type.length - 1
                        ? capitalizeText(item)
                        : capitalizeText(item) + ", "
                    )}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "4px",
                        margin: "2px",
                        cursor: "help",
                        "& svg, path": { cursor: "help" },
                      }}
                    >
                      <Badge
                        badgeContent={column.type.length}
                        showZero
                        color="primary"
                        overlap="rectangular"
                        sx={{
                          ".MuiBadge-colorPrimary": {
                            borderRadius: "4px",
                            fontSize: "10px !important",
                            right: "-9px",
                            height: "14px",
                            padding: "5px",
                            minWidth: "min-content",
                            cursor: "help",
                          },
                        }}
                      >
                        <AdverseEvent
                          fill={theme.palette.primary.main}
                          width={"18px"}
                          height={"18px"}
                        />
                      </Badge>
                    </Box>
                  </Tooltip>
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
  // Accordion de check-in/out
  const checkInOutAccordion = (data: any) =>
    data.map(({ _id, list }: IDataAccordion, index: number) => {
      return (
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 5000,
              left: "calc(100% - 7rem)",
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
              }}
            >
              <PrintIcon
                sx={{
                  color:
                    expanded === `panel${index}`
                      ? theme.palette.common.white
                      : theme.palette.primary.main,
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
                <Check
                  fill={
                    expanded === `panel${index}`
                      ? colorBackgroundInactive
                      : colorText
                  }
                  width={"22px"}
                  height={"22px"}
                />

                <Typography>{formatDate(_id, "DD/MM/YY", timeZone)}</Typography>
              </Box>
              <Box sx={{ width: "36px" }}></Box>
            </AccordionSummary>
            <AccordionDetails>
              {checkInOutAccordionHeader()}
              {checkInOutAccordionDetails(list)}
            </AccordionDetails>
          </Accordion>
        </Box>
      );
    });
  const checkInOutAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        {reportType !== "Check-in/out" && (
          <TextCenterDetails
            sx={{
              width: `${"80px"}`,
            }}
          >
            <Typography fontWeight={500}>Hora</Typography>
          </TextCenterDetails>
        )}
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Profissional</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Função</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Entrada</Typography>
        </TextCenterDetails>

        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
            justifyContent: "center",
          }}
        >
          <Typography fontWeight={500}>Saída</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const checkInOutAccordionDetails = (list: any) => {
    return list.map((itemList: any, index: number) => {
      return (
        <>
          <ContentDetailsAccordion key={index}>
            <TextCenterDetails>
              <Typography>
                {getFirstAndLastName(capitalizeText(itemList.user_name))}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails>
              <Typography>{itemList.function}</Typography>
            </TextCenterDetails>
            <TextCenterDetails>
              <Typography>
                {formatDate(itemList.in.created_at, "DD/MM - HH:mm", timeZone)}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails>
              <Typography>
                {itemList.out
                  ? formatDate(
                      itemList.out.created_at,
                      "DD/MM - HH:mm",
                      timeZone
                    )
                  : "-"}
              </Typography>
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
  };
  // Evolution accordion
  const evolutionAccordion = (data: any) =>
    content.data.map(({ _id, list }: IDataAccordion, index: number) => (
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5000,
            left: "calc(100% - 7rem)",
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
            }}
          >
            <PrintIcon
              sx={{
                color:
                  expanded === `panel${index}`
                    ? colorBackgroundInactive
                    : colorBackgroundActive,
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
              <Evolution
                fill={
                  expanded === `panel${index}`
                    ? colorBackgroundInactive
                    : colorText
                }
                width={"22px"}
                height={"22px"}
              />

              <Typography>{formatDate(_id, "DD/MM/YY", timeZone)}</Typography>
            </Box>
            <Box sx={{ width: "36px" }}></Box>
          </AccordionSummary>
          <AccordionDetails>
            {evolutionAccordionHeader()}
            {evolutionAccordionDetails(list)}
          </AccordionDetails>
        </Accordion>
      </Box>
    ));
  const evolutionAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails
          sx={{
            width: `${"80px"}`,
          }}
        >
          <Typography fontWeight={500}>Hora</Typography>
        </TextCenterDetails>

        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Profissional</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Especialidade</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Tipo Evolução</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
            justifyContent: "center",
          }}
        >
          <Typography fontWeight={500}>Opções</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const evolutionAccordionDetails = (list: any) =>
    list.map((column: any, index: number) => {
      return (
        <>
          <ContentDetailsAccordion key={column._id}>
            <TextCenterDetails
              sx={{
                width: "80px",
                textDecoration: `${column.active ? "none" : "line-through"}`,
                color: `${column.active ? colorTextDetails : colorTextDesable}`,
              }}
            >
              <Typography>
                {formatDate(column.created_at, "HH:mm", timeZone)}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails
              sx={{
                textDecoration: `${column.active ? "none" : "line-through"}`,
                color: `${column.active ? colorTextDetails : colorTextDesable}`,
              }}
            >
              <Typography>
                {getFirstAndLastName(
                  capitalizeText(column.created_by[0]?.name)
                )}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails
              sx={{
                textDecoration: `${column.active ? "none" : "line-through"}`,
                color: `${column.active ? colorTextDetails : colorTextDesable}`,
              }}
            >
              <Typography>
                {handleSpecialty(column, company_id)
                  ? handleSpecialty(column, company_id)
                  : "Não informado"}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails
              sx={{
                textDecoration: `${column.active ? "none" : "line-through"}`,
                color: `${column.active ? colorTextDetails : colorTextDesable}`,
              }}
            >
              <Typography>{column.type}</Typography>
            </TextCenterDetails>
            <TextCenterDetails>
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
                  sx={{ cursor: "pointer", color: colorBackgroundActive }}
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
  // Measurements accordion
  const measurementsAccordion = (data: any) =>
    data.map(({ _id, list }: IDataAccordion, index: number) => {
      return (
        <Box sx={{ position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 5000,
              left: "calc(100% - 7rem)",
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
                if (reportType === "Aferições") {
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
                      ? colorBackgroundInactive
                      : colorBackgroundActive,
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
                <IconMeasurement
                  fill={
                    expanded === `panel${index}`
                      ? colorBackgroundInactive
                      : colorText
                  }
                  width="22px"
                  height={"22px"}
                />

                <Typography>{formatDate(_id, "DD/MM/YY", timeZone)}</Typography>
              </Box>
              <Box sx={{ width: "36px" }}></Box>
            </AccordionSummary>
            <AccordionDetails>
              {measurementsAccordionHeader()}
              {measurementsAccordionDetails(list)}
            </AccordionDetails>
          </Accordion>
        </Box>
      );
    });
  const measurementsAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails
          sx={{
            width: `${"80px"}`,
          }}
        >
          <Typography fontWeight={500}>Hora</Typography>
        </TextCenterDetails>

        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Profissional</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Função</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"320px"}`,
          }}
        >
          <Typography fontWeight={500}>Conteúdo</Typography>
        </TextCenterDetails>

        <TextCenterDetails
          sx={{
            width: `${"100px"}`,
            justifyContent: "center",
          }}
        >
          <Typography fontWeight={500}>Opções</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const measurementsAccordionDetails = (list: any) =>
    list
      .sort(
        (a: any, b: any) =>
          Number(new Date(b.created_at)) - Number(new Date(a.created_at))
      )
      .map((column: IAccordionInfo, index: number) => {
        return (
          <>
            <ContentDetailsAccordion key={column._id}>
              <TextCenterDetails
                sx={{
                  width: "80px",
                  textDecoration: `${
                    column.canceled ? "line-through" : "none"
                  }`,
                  color: `${column.canceled ? colorTextDesable : colorText}`,
                }}
              >
                <Typography>
                  {formatDate(column.created_at, "HH:mm", timeZone)}
                </Typography>
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  textDecoration: `${
                    column.canceled ? "line-through" : "none"
                  }`,
                  color: `${column.canceled ? colorTextDesable : colorText}`,
                }}
              >
                <Typography>
                  {getFirstAndLastName(
                    capitalizeText(column.created_by[0].name)
                  )}
                </Typography>
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  textDecoration: `${
                    column.canceled ? "line-through" : "none"
                  }`,
                  color: `${column.canceled ? colorTextDesable : colorText}`,
                }}
              >
                <Typography>{handleFunction(column, company_id)}</Typography>
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  width: "320px",
                  textDecoration: `${
                    column.canceled ? "line-through" : "none"
                  }`,
                  color: `${column.canceled ? colorTextDesable : colorText}`,
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
                    color: colorBackgroundActive,
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
                  <PrintIcon
                    sx={{
                      cursor: "pointer",
                      "& svg, path": { cursor: "pointer" },
                    }}
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
  // Accordion das Telemedicines
  const telemedicineAccordion = (data: any) =>
    content.data.map(({ _id, list }: any, index: number) => (
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5000,
            left: "calc(100% - 7rem)",
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
              // const payload = {
              //   _id: "",
              //   type: "Group",
              //   name: "",
              //   dataStart: _id,
              //   dataEnd: _id,
              //   reportType: "Evolução",
              //   attendance_id: state?.data?._id,
              // };
              dispatch(
                loadRequestReportByDay({
                  date: _id,
                  external_attendance_id: careState.data._id,
                })
              );
            }}
          >
            <PrintIcon
              sx={{
                color:
                  expanded === `panel${index}`
                    ? colorBackgroundInactive
                    : colorBackgroundActive,
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
              <TelemedicineIcon
                fill={
                  expanded === `panel${index}`
                    ? colorBackgroundInactive
                    : colorText
                }
                width={"22px"}
                height={"22px"}
              />

              <Typography>{_id.date.split("-").join("/")}</Typography>
            </Box>
            <Box sx={{ width: "36px" }}></Box>
          </AccordionSummary>
          <AccordionDetails>
            {telemedicineAccordionHeader()}
            {telemedicineAccordionDetails(list)}
          </AccordionDetails>
        </Accordion>
      </Box>
    ));
  const telemedicineAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Hora de Solicitação</Typography>
        </TextCenterDetails>

        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Status do atendimento</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"200px"}`,
          }}
        >
          <Typography fontWeight={500}>Hora do status</Typography>
        </TextCenterDetails>
        <TextCenterDetails
          sx={{
            width: `${"125px"}`,
            justifyContent: "center",
          }}
        >
          <Typography fontWeight={500}>Opções</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const telemedicineAccordionDetails = (list: any): any =>
    list.map((doc: any, index: number) => {
      return (
        <>
          <ContentDetailsAccordion key={index}>
            <TextCenterDetails>
              <Typography>{formatDate(doc.created_at, "HH:mm")}</Typography>
            </TextCenterDetails>
            <TextCenterDetails>
              <Typography>{handleStatusTelemedicine(doc).status}</Typography>
            </TextCenterDetails>
            <TextCenterDetails>
              <Typography>{handleStatusTelemedicine(doc).time}</Typography>
            </TextCenterDetails>
            <TextCenterDetails
              sx={{ width: "125px", justifyContent: "center" }}
            >
              <IconButton
                color="secondary"
                aria-label="print"
                sx={{
                  cursor: "pointer",
                  color: colorBackgroundActive,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "36px",
                  width: "36px",
                }}
                onClick={() => {
                  // if (reportType === "Aferições") {
                  //   const payload = {
                  //     _id: column._id,
                  //     type: "Id",
                  //     name: column._id,
                  //     dataStart: "",
                  //     dataEnd: "",
                  //     reportType: "Aferições",
                  //     attendance_id: state?.data?._id,
                  //   };
                  // }
                  let payload = {
                    telemedicine_id: doc._id,
                    external_attendance_id: careState.data._id,
                  };
                  dispatch(loadRequestReportUnique(payload));
                }}
              >
                <PrintIcon
                  sx={{
                    cursor: "pointer",
                    "& svg, path": { cursor: "pointer" },
                  }}
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
  const handleStatusTelemedicine = (doc: any) => {
    let statusDetails = {
      status: "indefinido",
      time: "",
    };
    const detailsForStatus = [
      "active",
      "start_at",
      "finished_at",
      "link_timestamp",
      "link_click_timestamp",
      "patient_canceled_at",
      "provider_canceled_at",
    ];

    if (doc.patient_canceled_at || doc.provider_canceled_at) {
      if (doc.patient_canceled_at) {
        statusDetails.status = "Cancelado pelo paciente";
        statusDetails.time = formatDate(
          doc.patient_canceled_at,
          "HH:mm",
          timeZone
        );
      } else if (doc.provider_canceled_at) {
        statusDetails.status = "Cancelado pelo prestador";
        statusDetails.time = formatDate(
          doc.provider_canceled_at,
          "HH:mm",
          timeZone
        );
      }
    } else if (doc.link_expired_timestamp) {
      statusDetails.status = "Sessão expirada";
      statusDetails.time = formatDate(doc.link_expired_timestamp, "HH:mm");
    } else if (doc.finished_at) {
      statusDetails.status = "Atendido";
      statusDetails.time = formatDate(doc.finished_at, "HH:mm");
    } else if (doc.attending_provider_id && doc.link_click_timestamp) {
      statusDetails.status = "Em atendimento";
      statusDetails.time = formatDate(doc.start_at, "HH:mm", timeZone);
    } else if (doc.link_click_timestamp) {
      statusDetails.status = "Paciente em sala";
      statusDetails.time = formatDate(
        doc.link_click_timestamp,
        "HH:mm",
        timeZone
      );
    } else if (doc.provider_click_timestemp) {
      statusDetails.status = "Prestador em sala";
      statusDetails.time = formatDate(
        doc.provider_click_timestemp,
        "HH:mm",
        timeZone
      );
    }
    // prstador na sala -> verificar attending provider id

    return statusDetails;
  };
  // Attachments accordion
  const attachmentsAccordion = (data: any) =>
    content.data.map(({ _id, list }: attachmentList, index: number) => (
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5000,
            left: "calc(100% - 7rem)",
            top: "0.4rem",
          }}
        >
          {/* <IconButton
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
              const payload = {
                _id: "",
                type: "Group",
                name: "",
                dataStart: _id,
                dataEnd: _id,
                reportType: "Evolução",
                attendance_id: state?.data?._id,
              };
              // dispatch(loadEvolutionFilterRequest(payload));
            }}
          >
            <PrintIcon
              sx={{
                color:
                  expanded === `panel${index}`
                    ? colorBackgroundInactive
                    : colorBackgroundActive,
                cursor: "pointer",
                "& path": { cursor: "pointer" },
              }}
            />
          </IconButton> */}
        </Box>
        <Accordion
          key={_id.type}
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
              <AttachmentIcon
                fill={
                  expanded === `panel${index}`
                    ? colorBackgroundInactive
                    : colorText
                }
                width={"22px"}
                height={"22px"}
              />

              <Typography>
                {_id.type === "image"
                  ? "Exames de imagem"
                  : _id.type === "laboratory"
                  ? "Exames de laboratório"
                  : _id.type === "other"
                  ? "Outros documentos"
                  : ""}
              </Typography>
            </Box>
            <Box sx={{ width: "36px" }}></Box>
          </AccordionSummary>
          <AccordionDetails>
            {attachmentsAccordionHeader()}
            {attachmentsAccordionDetails(list)}
          </AccordionDetails>
        </Accordion>
      </Box>
    ));
  const attachmentsAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails>
          <Typography fontWeight={500}>Anexado em</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Solicitante</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Nome do arquivo</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Opções</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const attachmentsAccordionDetails = (list: attachments[]) =>
    list.map((column: attachments, index: number) => {
      return (
        <>
          <ContentDetailsAccordion key={column._id}>
            <TextCenterDetails>
              <Typography sx={{ maxWidth: "248px" }}>
                {formatDate(
                  column.documents.upload_date,
                  "DD/MM/YYYY [às] HH:mm",
                  timeZone
                )}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails>
              <Typography sx={{ maxWidth: "248px" }}>
                {column.documents.requester_name
                  ? column.documents.requester_name
                  : "Não informado"}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails>
              <Typography sx={{ maxWidth: "248px" }}>
                {column.documents.name}
              </Typography>
            </TextCenterDetails>

            <TextCenterDetails>
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
                  dispatch(loadRequestFile(column.documents.name_file));
                }}
              >
                <PrintIcon
                  sx={{ cursor: "pointer", color: colorBackgroundActive }}
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
  // Forms Accordion
  const formsAccordion = (data: FormGroup[]) => {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Tabs
            value={valueTabForm}
            onChange={handleChangeTabForm}
            scrollButtons="auto"
          >
            {data?.map(({ _id, name }: FormGroup, index: number) => {
              return (
                <Tab
                  label={name}
                  key={`${_id}-${index}`}
                  {...a11yProps(index)}
                  onClick={() => {
                    const formId = data[index]?._id;
                    const payloadForms = {
                      external_attendance_id: careState.data._id,
                      document_id: formId,
                    };
                    dispatch(loadRequest(payloadForms));
                  }}
                />
              );
            })}
          </Tabs>
        </Box>
        {formState.data.length ? (
          formState?.data?.map(({ _id, list }: FormGroup, index: number) => {
            return (
              <TabPanel value={index} index={index} key={`${_id}-${index}`}>
                <Box sx={{ position: "relative", marginBottom: -3.5 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 5000,
                      left: "calc(100% - 7rem)",
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
                        const payload = {
                          dataStart: _id,
                          dataEnd: _id,
                          type: "Prestador",
                          attendance_id: state?.data?._id,
                          document_id: data[valueTabForm]?._id,
                        };
                        dispatch(loadFormsGroupByDateRequest(payload));
                      }}
                    >
                      <PrintIcon
                        sx={{
                          color:
                            expanded === `panel${index}`
                              ? colorBackgroundInactive
                              : colorBackgroundActive,
                          cursor: "pointer",
                          "& path": { cursor: "pointer" },
                        }}
                      />
                    </IconButton>
                  </Box>
                  <Accordion
                    key={`${_id}-${index}`}
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
                        <FormIcon
                          fill={
                            expanded === `panel${index}`
                              ? colorBackgroundInactive
                              : colorText
                          }
                          width={"22px"}
                          height={"22px"}
                        />

                        <Typography>{formatDate(_id, "DD/MM/YYYY")}</Typography>
                      </Box>
                      <Box sx={{ width: "36px" }}></Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {formsAccordionHeader()}
                      {formsAccordionDetails(list)}
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </TabPanel>
            );
          })
        ) : (
          <Box sx={{ width: "100%", mt: 3 }}>
            <Typography
              sx={{
                textAlign: "center",
                color: colorText,
                padding: "8px 0 16px",
                margin: "0 auto",
              }}
            >
              Não há relatórios para o Formulário de {data[valueTabForm].name}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };
  const formsAccordionHeader = () => (
    <>
      <HeaderDetailsAccordion>
        <TextCenterDetails sx={{ justifyContent: "flex-start" }}>
          <Typography fontWeight={500}>Prestador</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Horário</Typography>
        </TextCenterDetails>
        <TextCenterDetails>
          <Typography fontWeight={500}>Nome do arquivo</Typography>
        </TextCenterDetails>
        <TextCenterDetails sx={{ width: "125px" }}>
          <Typography fontWeight={500}>Opções</Typography>
        </TextCenterDetails>
      </HeaderDetailsAccordion>
      <Divider sx={{ width: "100%", margin: "0 auto" }} />
    </>
  );
  const formsAccordionDetails = (list: FormsData[]) =>
    list.map((form: FormsData, index: number) => {
      return (
        <>
          <ContentDetailsAccordion key={form._id}>
            <TextCenterDetails
              sx={{
                justifyContent: "flex-start",
                textDecoration: `${
                  form.status === "canceled" ? "line-through" : "none"
                }`,
                color: `${
                  form.status === "canceled" ? colorTextDesable : colorText
                }`,
              }}
            >
              <Typography sx={{ maxWidth: "248px" }}>
                {form.created_by.name}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails
              sx={{
                textDecoration: `${
                  form.status === "canceled" ? "line-through" : "none"
                }`,
                color: `${
                  form.status === "canceled" ? colorTextDesable : colorText
                }`,
              }}
            >
              <Typography sx={{ maxWidth: "248px" }}>
                {formatDate(form.created_at, "[ás] HH:mm", timeZone)}
              </Typography>
            </TextCenterDetails>
            <TextCenterDetails>
              <Typography
                sx={{
                  maxWidth: "248px",
                  textDecoration: `${
                    form.status === "canceled" ? "line-through" : "none"
                  }`,
                  color: `${
                    form.status === "canceled" ? colorTextDesable : colorText
                  }`,
                }}
              >
                {form.name}
              </Typography>
            </TextCenterDetails>

            <TextCenterDetails sx={{ width: "125px" }}>
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
                  dispatch(
                    loadFormsFilterRequest({
                      name_doc: form.name,
                      attendance_id: state?.data?._id,
                      name: form.created_by.name,
                      type: "Prestador",
                    })
                  );
                }}
              >
                <PrintIcon
                  sx={{ cursor: "pointer", color: colorBackgroundActive }}
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

  return (
    <>
      {content.data ? (
        reportType === "Aferições" ? (
          <Container>{measurementsAccordion(content.data)}</Container>
        ) : reportType === "Alergias" ? (
          <Container>{allergyAndEventsAccordion(content.data)}</Container>
        ) : reportType === "Evolução" ? (
          <Container>{evolutionAccordion(content.data)}</Container>
        ) : reportType === "Check-in/out" ? (
          <Container>{checkInOutAccordion(content.data)}</Container>
        ) : reportType === "Prescrições" ? (
          content.data.length > 0 ? (
            <Container>
              {integration ? (
                prescriptionAccordion(content.data)
              ) : (
                <Typography
                  sx={{
                    textAlign: "center",
                    color: theme.palette.black60.main,
                  }}
                >
                  Acordion de Prescrição não configurada para ambiente sem
                  integração
                </Typography>
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
        ) : reportType === "Checagens" ? (
          content.data.length > 0 ? (
            <Container>
              {integration ? (
                checkAccordion(content.data)
              ) : (
                <Typography sx={{ textAlign: "center", color: colorText }}>
                  Acordion de Checagens não configurada para ambiente sem
                  integração
                </Typography>
              )}
            </Container>
          ) : (
            NoData()
          )
        ) : reportType === "Anexos" ? (
          content.data.length > 0 ? (
            <Container>{attachmentsAccordion(content.data)}</Container>
          ) : (
            NoData()
          )
        ) : reportType === "Telemedicina" && content.data.length > 0 ? (
          <Container>{telemedicineAccordion(content.data)}</Container>
        ) : reportType === "Formulários" && content.data.length > 0 ? (
          <Container>{formsAccordion(content.data)}</Container>
        ) : (
          ""
        )
      ) : (
        NoData()
      )}

      {/*{content.error &&*/}
      {/*  toast.error("Não foi possível carregar os relatórios deste prontuário")}*/}
    </>
  );
}
