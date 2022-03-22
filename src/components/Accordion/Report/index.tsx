import React, { useState } from "react";
// aplication
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";

// icons
import IconMeasurement from "../../Icons/measurement";
import PrintIcon from "@mui/icons-material/Print";
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
import _ from "lodash";
// components
import Loading from "../../Loading";
// types
import {
  AllergiesInterface,
  AllergiesItem,
} from "../../../store/ducks/allergies/types";
import { IconButton } from "@mui/material";
import { loadCheckinReportRequest } from "../../../store/ducks/cares/actions";
import { useDispatch } from "react-redux";

interface IAccordionReport {
  content: {
    loading: boolean;
    error: boolean;
    data: any;
  };
  company_id: string;
  reportType: string;
  allergic?: boolean;

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
  const { content, company_id, reportType } = props;
  const dispatch = useDispatch();
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const [expanded, setExpanded] = useState<string | false>("panel0");
  // if (reportType === "Alergias" && content.data) {
  //   // MOCANDO EVENTOS ADVERSOS
  //   content.data.event = [
  //     {
  //       _id: 79019,
  //       item: ["ABAIXADOR DE LINGUA DESCARTAVEL"],
  //       type: ["ALERGIA"],
  //       profession: "MEDICO(A)",
  //       created_by: "MEDICO PEP TESTE",
  //       created_at: "2022-02-09T11:47:54.000Z",
  //     },
  //     {
  //       _id: 79020,
  //       item: ["DIPRIVAN PFS  20 MG/ML, 2% 50ML", "AAS INFANTIL 100 MG"],
  //       type: ["CONSTIPAÇÃO", "TAQUICARDIA"],
  //       profession: "MEDICO(A)",
  //       created_by: "MEDICO PEP TESTE",
  //       created_at: "2022-02-09T13:09:22.000Z",
  //     },
  //   ];
  // }

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
              width: `${type === "allergy" ? "250px" : "200px"}`,
            }}
          >
            Profissional
          </TextCenterDetails>
          <TextCenterDetails
            sx={{
              width: `${type === "allergy" ? "250px" : "200px"}`,
            }}
          >
            {reportType === "Evolução" ? "Especialidade" : "Função"}
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
              ? "Item de prescrição"
              : reportType === "Evolução"
              ? "Tipo Evolução"
              : reportType === "Check-in/out"
              ? "Entrada"
              : "Conteúdo"}
          </TextCenterDetails>
          {reportType === "Alergias" && type === "allergy" ? (
            ""
          ) : (
            <TextCenterDetails
              sx={{
                width: `${
                  reportType === "Evolução" ||
                  reportType === "Check-in/out" ||
                  type === "event"
                    ? "200px"
                    : "100px"
                }`,
                justifyContent: "center",
              }}
            >
              {reportType === "Check-in/out"
                ? "Saída"
                : type === "event"
                ? "Eventos adversos"
                : "Opções"}
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
                margin: "16px 0 8px",
              }}
            >
              Não há alergias registrados para este paciente.
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
                margin: "16px 0 8px",
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
                  <TextCenterDetails sx={{ width: "200px" }}>
                    {column.created_by &&
                      integration &&
                      getFirstAndLastName(capitalizeText(column.created_by))}
                    {column.created_by &&
                      !integration &&
                      getFirstAndLastName(capitalizeText(column.created_by))}
                    {!column.created_by && "-"}
                  </TextCenterDetails>
                  <TextCenterDetails sx={{ width: "200px" }}>
                    {column.profession
                      ? capitalizeText(column.profession)
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
                {getFirstAndLastName(capitalizeText(column.created_by[0].name))}
              </TextCenterDetails>
              <TextCenterDetails
                sx={{
                  textDecoration: `${column.active ? "none" : "line-through"}`,
                  color: `${column.active ? "#333333" : "#7D7D7D"}`,
                }}
              >
                {column.created_by[0].main_specialty_id[0].name
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
                <PrintIcon sx={{ color: "var(--secondary)" }} />
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
                  {handleMeasurementItemsIcons(column.itens, column.canceled)}
                </Box>
              </TextCenterDetails>
              <TextCenterDetails
                sx={{ width: "100px", justifyContent: "center" }}
              >
                <PrintIcon sx={{ color: "var(--secondary)" }} />
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

  return (
    <>
      {content.loading && <Loading />}

      {content.data ? (
        reportType === "Aferições" ||
        reportType === "Evolução" ||
        reportType === "Check-in/out" ? (
          <Container>
            {content.data.map(
              ({ _id, list }: IDataAccordion, index: number) => {
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
                      <Box>
                        <IconButton
                          color="secondary"
                          aria-label="print"
                          sx={{ cursor: "pointer", height: "10px" }}
                          onClick={() => {
                            dispatch(loadCheckinReportRequest("asd"));
                          }}
                        >
                          <PrintIcon
                            sx={{ cursor: "pointer", marginRight: "12px" }}
                          />
                        </IconButton>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {handleHeaderDetails()}
                      {handleRow(list)}
                    </AccordionDetails>
                  </Accordion>
                );
              }
            )}
          </Container>
        ) : reportType === "Alergias" ? (
          <Container>
            {Object.keys(content.data).map((item: any, index: number) => {
              return (
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
                    sx={{ display: "flex", justifyContent: "space-between" }}
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

                      {item === "allergy" && "Alergias"}
                      {item === "event" && "Eventos adversos"}
                    </Box>
                    <Box>
                      <IconButton
                        color="secondary"
                        aria-label="print"
                        sx={{ cursor: "pointer", height: "10px" }}
                        onClick={() => {
                          console.log("clikei");
                          // dispatch(loadCheckinReportRequest("asd"));
                        }}
                      >
                        <PrintIcon
                          sx={{ cursor: "pointer", marginRight: "12px" }}
                        />
                      </IconButton>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {handleHeaderDetails(item)}
                    {handleRow(content.data[item], item)}
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Container>
        ) : (
          ""
        )
      ) : (
        <Box
          sx={{
            textAlign: "center",
            color: "var(--gray-dark)",
            padding: "8px 0 16px",
          }}
        >
          Não há relatórios para o prontuário de{" "}
          {reportType === "Alergias"
            ? "Alergias e Eventos Adversos"
            : reportType}
        </Box>
      )}

      {content.error &&
        toast.error("Não foi possível carregar os relatórios deste prontuário")}
    </>
  );
}
