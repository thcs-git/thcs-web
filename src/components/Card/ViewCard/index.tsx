import React from "react";
// icons
import CompanyIcon from "../../Icons/Company";
import ProfessionalIcon from "../../Icons/Professional";
import PatientIcon from "../../Icons/Patient";
import LocationIcon from "../../Icons/Location";
import PhoneIcon from "../../Icons/Phone";
import UserIcon from "../../Icons/User";
import SpecialtyIcon from "../../Icons/Specialty";
//Mui
import { Grid, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";
//componentes
// styles
import { WrapperTitleData, WrapperContentData } from "./styles";
//utils
import { any } from "cypress/types/bluebird";
import { data } from "cypress/types/jquery";

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
            }}
          >
            <WrapperTitleData>
              <CompanyIcon fill={theme.palette.primary.main} noCircle />
              <Typography variant="body1" fontWeight={600}>
                Dados da empresa
              </Typography>
            </WrapperTitleData>
            <WrapperContentData>
              {dataCompany.map(({ name, value }: Irows, index: number) => (
                <Grid item>
                  <Typography variant="body1">{`${name}: ${value}`}</Typography>
                </Grid>
              ))}
            </WrapperContentData>

            <WrapperTitleData>
              <ProfessionalIcon fill={theme.palette.primary.main} />
              <Typography variant="body1" fontWeight={600}>
                Dados do Responsável
              </Typography>
            </WrapperTitleData>
            <WrapperContentData>
              {dataResponsible.map(({ name, value }: Irows, index: number) => (
                <Grid item>
                  <Typography variant="body1">{`${name}: ${value}`}</Typography>
                </Grid>
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
            }}
          >
            <WrapperTitleData>
              <PatientIcon noCircle fill={theme.palette.primary.main} />
              <Typography variant="body1" fontWeight={600}>
                Dados do Paciente
              </Typography>
            </WrapperTitleData>
            <WrapperContentData>
              {patientData.map(({ name, value }: Irows, index: number) => (
                <Grid item>
                  <Typography variant="body1">{`${name}: ${value}`}</Typography>
                </Grid>
              ))}
            </WrapperContentData>
            <WrapperTitleData>
              <LocationIcon fill={theme.palette.primary.main} />
              <Typography variant="body1" fontWeight={600}>
                Endereço
              </Typography>
            </WrapperTitleData>
            <WrapperContentData>
              {patientAdress.map(({ name, value }: Irows, index: number) => (
                <Grid item>
                  <Typography variant="body1">{`${name}: ${value}`}</Typography>
                </Grid>
              ))}
            </WrapperContentData>

            <WrapperTitleData>
              <PhoneIcon fill={theme.palette.primary.main} />
              <Typography variant="body1" fontWeight={600}>
                Contato
              </Typography>
            </WrapperTitleData>
            <WrapperContentData>
              {patientContact.map(({ name, value }: Irows, index: number) => (
                <Grid item>
                  <Typography variant="body1">{`${name}: ${value}`}</Typography>
                </Grid>
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
                <UserIcon fill={theme.palette.primary.main} noCircle />
                <Typography variant="body1" fontWeight={600}>
                  {content.tittle}
                </Typography>
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <Typography variant="body1">{`${name}: ${value}`}</Typography>
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
                <LocationIcon fill={theme.palette.primary.main} />

                <Typography variant="body1" fontWeight={600}>
                  {content.tittle}
                </Typography>
              </WrapperTitleData>
              <WrapperContentData>
                {addressFull.map(({ name, value }: Irows, index: number) => (
                  <Grid item>
                    <Typography variant="body1">{value}</Typography>
                  </Grid>
                ))}

                {content.rows.map(
                  ({ name, value }: Irows, index: number) =>
                    name === "CEP" && (
                      <Grid item>
                        <Typography variant="body1">{`${name}: ${value}`}</Typography>
                      </Grid>
                    )
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
                <PhoneIcon fill={theme.palette.primary.main} />
                <Typography variant="body1" fontWeight={600}>
                  {content.tittle}
                </Typography>
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <Grid item>
                    <Typography variant="body1">{`${name}: ${value}`}</Typography>
                  </Grid>
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
                  <ProfessionalIcon fill={theme.palette.primary.main} />
                ) : content.tittle === "Especialidades" ? (
                  <SpecialtyIcon fill={theme.palette.primary.main} />
                ) : (
                  <PhoneIcon fill={theme.palette.primary.main} />
                )}
                <Typography variant="body1" fontWeight={600}>
                  {content.tittle}
                </Typography>
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <Grid item>
                    <Typography variant="body1">{`${name}: ${value}`}</Typography>
                  </Grid>
                ))}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : content.details === "UserCompanyForm" ? (
        <Grid item md={md_value}>
          <Grid
            container
            sx={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item sx={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <CompanyIcon fill={theme.palette.primary.main} noCircle />
                <Typography variant="body1" fontWeight={600}>
                  {content.tittle}
                </Typography>
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <Grid item>
                    <Typography variant="body1">{value}</Typography>
                  </Grid>
                ))}
              </WrapperContentData>
            </Grid>
          </Grid>
        </Grid>
      ) : content.details === "ClientFormHeader" ? (
        <Grid item md={md_value}>
          <Grid
            container
            sx={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item sx={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <CompanyIcon fill={theme.palette.primary.main} noCircle />
                <Typography variant="body1" fontWeight={600}>
                  {content.tittle}
                </Typography>
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <>
                    <Grid item>
                      <Typography variant="body1">{`${
                        name === "CPF" ? "CNPJ" : name
                      }: ${value}`}</Typography>
                    </Grid>
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
            sx={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item sx={{ paddingBottom: "0" }}>
              <WrapperTitleData>
                <ProfessionalIcon fill={theme.palette.primary.main} />

                <Typography variant="body1" fontWeight={600}>
                  {content.tittle}
                </Typography>
              </WrapperTitleData>
              <WrapperContentData>
                {content.rows.map(({ name, value }: Irows, index: number) => (
                  <>
                    <Grid item>
                      <Typography variant="body1">
                        {`${name === "CPF" ? "CNPJ" : name}: ${value}`}
                      </Typography>
                    </Grid>
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
            sx={{
              flexDirection: "column",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <Grid item sx={{ paddingBottom: "0" }}>
              <Typography variant="body1" fontWeight={600}>
                {content.tittle}
              </Typography>
            </Grid>
            {content.rows.map(({ name, value }: Irows, index: number) => (
              <Grid item>
                <Typography variant="body1">{`${name}: ${value}`}</Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </ThemeProvider>
  );
}
