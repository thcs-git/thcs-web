import React from "react";

import { Grid } from "@material-ui/core";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import {
  CardIcon,
  BoxCustomFoot,
  CardTitle,
  FeedbackTitle,
  WrapperTitleData,
  WrapperContentData,
} from "./styles";
import { any } from "cypress/types/bluebird";
import { RowingSharp } from "@material-ui/icons";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { data } from "cypress/types/jquery";

import { ReactComponent as Company2Icon } from "../../../assets/img/icon-company2.svg";
import { ReactComponent as ProfessionalIcon } from "../../../assets/img/icon-professional.svg";
import { ReactComponent as LocationIcon } from "../../../assets/img/icon-location.svg";
import { ReactComponent as PhoneIcon } from "../../../assets/img/icon-phone-details.svg";
import { ReactComponent as PacientDetailsIcon } from "../../../assets/img/icon-pacient-details.svg";
import { ReactComponent as MaleIcon } from "../../../assets/img/icon-male.svg";
import { ReactComponent as UserIcon } from "../../../assets/img/icon-user2.svg";
import { ReactComponent as SpecialtyIcon } from "../../../assets/img/icon-specialty.svg";

import { ThemeProvider } from "@mui/material/styles";

import theme from "../../../theme/theme";
// import eee from "../../../assets/img/icon-company2.svg"

interface IProps {
  content: Icontent;
  md?: any;
}

interface Icontent {
  tittle: string;
  icon?: any;
  rows: Irows[];
  detailsCompanyIs?: boolean;
  detailsPatientIs?: boolean;
  details?: string;
}

interface Irows {
  name: string;
  value: string;
}

export default function ViewCard(props: IProps) {
  const { content, md } = props;
  const md_value = md ? md : 12;

  {
    /* variaveis com informações da company */
  }
  let dataCompany: Irows[] = [];
  let dataResponsible: Irows[] = [];
  let addressData: Irows[] = [];
  let addressFull: Irows[] = [
    {
      name: "Endereço",
      value: "",
    },
  ];

  {
    /* variaveis com informações da company */
  }
  let patientData: Irows[] = [];
  let patientAdress: Irows[] = [];
  let patientContact: Irows[] = [];

  content.rows.forEach((e) => {
    switch (e.name) {
      case "Razão Social":
        dataCompany.push(e);
        break;
      case "CNPJ":
        dataCompany.push(e);
        break;
      case "Endereço":
        addressData.push(e);
        break;
      case "Número":
        addressData.push(e);
        break;
      case "Complemento":
        addressData.push(e);
        break;
      case "Bairro":
        addressData.push(e);
        break;
      case "Cidade":
        addressData.push(e);
        break;
      case "UF":
        addressData.push(e);
        break;
      case "Nome do responsável":
        dataResponsible.push(e);
        break;
      case "E-mail":
        dataResponsible.push(e);
        patientData.push(e);
        break;
      case "Telefone":
        dataResponsible.push(e);
        break;
      case "Tipo":
        dataResponsible.push(e);
        break;
      case "CPF/CNPJ":
        dataResponsible.push(e);
        break;
      case "Nome":
        patientData.push(e);
        break;
      case "Gênero":
        patientData.push(e);
        break;
      case "Estado Civil":
        patientData.push(e);
        break;
      case "Data de Nascimento":
        patientData.push(e);
        break;
      case "tipo Sanguíneo":
        patientData.push(e);
        break;
      case "CPF":
        patientData.push(e);
        break;
      case "Profissão":
        patientData.push(e);
        break;
      case "Nome da Mãe":
        patientData.push(e);
        break;
      case "RG":
        patientData.push(e);
        break;
      case "Emissor":
        patientData.push(e);
        break;
      case "Telefone":
        patientContact.push(e);
        break;
      case "Celular":
        patientContact.push(e);
        break;
      case "Doador de Órgãos":
        patientData.push(e);
        break;
      case "Nacionalidade":
        patientData.push(e);
        break;
      case "Responsável":
        patientData.push(e);
        break;
      case "CEP":
        patientAdress.push(e);
        break;
    }
  });

  addressData.forEach((e) => {
    if (e.name === "UF") addressFull[0].value += e.value;
    else if (e.name === "Cidade") addressFull[0].value += e.value + " - ";
    else addressFull[0].value += e.value + ", ";
  });
  content.detailsPatientIs && patientAdress.push(addressFull[0]);

  content.detailsCompanyIs && dataCompany.push(addressFull[0]);

  return (
    <ThemeProvider theme={theme}>
      {content.detailsCompanyIs ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "24px",
              // paddingTop: "10px",
            }}
          >
            {/* <Grid item style={{ paddingBottom: "10px" }}>
              <h3>{content.tittle}</h3>
            </Grid> */}
            <WrapperTitleData>
              {/* <img src="../../../assets/img/icon-company2.svg" alt="icon company" /> */}
              <Company2Icon />
              <p>Dados da empresa</p>
            </WrapperTitleData>
            <WrapperContentData>
              {dataCompany.map(({ name, value }: Irows, index: number) => (
                <Grid item>{`${name}: ${value}`}</Grid>
              ))}
            </WrapperContentData>

            <WrapperTitleData>
              <ProfessionalIcon />
              <p>Dados do Responsável</p>
            </WrapperTitleData>
            <WrapperContentData>
              {dataResponsible.map(({ name, value }: Irows, index: number) => (
                <Grid item>{`${name}: ${value}`}</Grid>
              ))}
            </WrapperContentData>
          </Grid>
        </Grid>
      ) : content.detailsPatientIs ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "24px",
              // paddingTop: "10px",
            }}
          >
            {/* <Grid item style={{ paddingBottom: "10px" }}>
              <h3>{content.tittle}</h3>
            </Grid> */}
            <WrapperTitleData>
              {/* <img src="../../../assets/img/icon-company2.svg" alt="icon company" /> */}
              <PacientDetailsIcon />
              <p>Dados do Paciente</p>
            </WrapperTitleData>
            <WrapperContentData>
              {patientData.map(({ name, value }: Irows, index: number) => (
                <Grid item>{`${name}: ${value}`}</Grid>
              ))}
            </WrapperContentData>
            <WrapperTitleData>
              <LocationIcon />
              <p>Endereço</p>
            </WrapperTitleData>
            <WrapperContentData>
              {patientAdress.map(({ name, value }: Irows, index: number) => (
                <Grid item>{`${name}: ${value}`}</Grid>
              ))}
            </WrapperContentData>

            <WrapperTitleData>
              <PhoneIcon />
              <p>Contato</p>
            </WrapperTitleData>
            <WrapperContentData>
              {patientContact.map(({ name, value }: Irows, index: number) => (
                <Grid item>{`${name}: ${value}`}</Grid>
              ))}
            </WrapperContentData>
          </Grid>
        </Grid>
      ) : content.details === "UserForm" ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item style={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <UserIcon />
                {content.tittle}
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <Grid item>{`${name}: ${value}`}</Grid>
                ))}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : content.details === "CepForm" ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item style={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <LocationIcon />
                {content.tittle}
              </WrapperTitleData>
              <WrapperContentData>
                {addressFull.map(({ name, value }: Irows, index: number) => (
                  <Grid item>{value}</Grid>
                ))}

                {content.rows.map(
                  ({ name, value }: Irows, index: number) =>
                    name === "CEP" && <Grid item>{`${name}: ${value}`}</Grid>
                )}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : content.details === "UserContactForm" ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item style={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <PhoneIcon />
                {content.tittle}
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <Grid item>{`${name}: ${value}`}</Grid>
                ))}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : content.details === "UserProfessionForm" ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item style={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                {content.tittle === "Função" ? (
                  <ProfessionalIcon />
                ) : content.tittle === "Especialidade" ? (
                  <SpecialtyIcon />
                ) : (
                  <PhoneIcon />
                )}
                {content.tittle}
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <Grid item>{`${name}: ${value}`}</Grid>
                ))}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : content.details === "UserCompanyForm" ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item style={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <Company2Icon />
                {content.tittle}
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <Grid item>{value}</Grid>
                ))}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : content.details === "ClientFormHeader" ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item style={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <Company2Icon />
                {content.tittle}
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <>
                    <Grid item>{`${
                      name === "CPF" ? "CNPJ" : name
                    }: ${value}`}</Grid>
                  </>
                ))}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : content.details === "ResponsibleForm" ? (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item style={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <ProfessionalIcon />

                {content.tittle}
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <>
                    <Grid item>{`${
                      name === "CPF" ? "CNPJ" : name
                    }: ${value}`}</Grid>
                  </>
                ))}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item md={md_value}>
          <Grid
            container
            style={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item style={{ paddingBottom: "0" }}>
              <h3>{content.tittle}</h3>
            </Grid>
            {content.rows.map(({ name, value }: Irows, index: number) => (
              <Grid item>{`${name}: ${value}`}</Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}
