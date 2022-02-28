import React, { useState } from "react";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";

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

interface IAccordionReport {
  data: any;
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
  created_by: string;
  measurements: IAccordionItem[];
  user: [
    {
      __v: number;
      _id: string;
      active: boolean;
      address: string;
      birthdate: any;
      cellphone: string;
      companies: [];
      companies_links: [
        {
          _id: string;
          active: string;
          companie_id: string;
          customer_id: string;
          exp: string;
          function: string;
          id_integration: string;
          linked_at: string;
        }
      ];
      council_id: string;
      council_number: string;
      council_state: string;
      created_at: string;
      customer_id: string;
      email: string;
      fiscal_number: string;
      gender: string;
      issuing_organ: string;
      main_specialty_id: string;
      mother_name: string;
      name: string;
      national_id: string;
      nationality: string;
      password: string;
      phone: string;
      phones: [
        {
          _id: string;
          number: string;
          telegram: boolean;
          whatsapp: boolean;
        }
      ];
      profession_id: string;
      specialties: [];
      type_user: string;
      user_type: string;
      user_type_id: null;
      username: string;
      verified: false;
    }
  ];
}
interface IAccordionItem {
  _id: string;
  active: boolean;
  measurement_item_id: string;
  value: string;
}

export default function AccordionReport(props: IAccordionReport) {
  const { data, company_id } = props;
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
  console.log(data, "DATAAA");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  function handleFunction(list: IAccordionInfo, company: string) {
    const functionProfessional = list.user[0].companies_links.map(
      (item: any, index: number) => {
        if (item.companie_id === company) {
          return item.function;
        }
      }
    );
    return functionProfessional;
  }
  const handleMeasurementItemsIcons = (measurements: IAccordionItem[]) => {
    measurements.map((measurementItem: IAccordionItem, index: number) => {
      // console.log(measurementItem, "ITEMSS");
    });
    return "BOXXX";
  };

  function handleRow(list: IAccordionInfo[]) {
    const column = list.map((column: any, index: number) => {
      console.log(column);
      return (
        <>
          <ContentDetailsAccordion>
            <TextCenterDetails>
              {formatDate(column.created_at, "HH:mm")}
            </TextCenterDetails>
            <TextCenterDetails>{/* {column.user[0].name} */}</TextCenterDetails>
            <TextCenterDetails>
              {/* {handleFunction(column, company_id)} */}
            </TextCenterDetails>
            <TextCenterDetails sx={{ width: "200px" }}>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                {handleMeasurementItemsIcons(column.measurements)}

                {/* <BloodGlucose
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <BodilySurface
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <Exam
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <Frequency
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <Height
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <Lung
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <Presure
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <Saturation
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <Temperature
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                />
                <Weight
                  fill={"var(--secondary)"}
                  width={"20px"}
                  height={"20px"}
                /> */}
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
    return column;
  }

  function handleHeaderDetails() {
    return (
      <>
        <HeaderDetailsAccordion>
          <TextCenterDetails>Hora</TextCenterDetails>
          <TextCenterDetails>Profissional</TextCenterDetails>
          <TextCenterDetails>Função</TextCenterDetails>
          <TextCenterDetails sx={{ width: "200px" }}>
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
      <Container>
        {data.map(({ _id, list }: IDataAccordion, index: number) => {
          return (
            <Accordion
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
    </>
  );
}
