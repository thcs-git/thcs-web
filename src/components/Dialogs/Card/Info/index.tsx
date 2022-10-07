import React, { useState } from "react";

//MUI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import { DialogTitle, DialogContent, Typography, Grid } from "@mui/material";

// IMG
import { ReactComponent as IconPatient } from "../../../../assets/img/icon-pacient.svg";
import { ReactComponent as IconEdit } from "../../../../assets/img/icon editar.svg";
import { ReactComponent as IconChart } from "../../../../assets/img/icon-prontuario.svg";
import { ReactComponent as IconHospitalization } from "../../../../assets/img/icon-plano-internacoes.svg";
import { ReactComponent as IconTeam } from "../../../../assets/img/icon-equipe-medica.svg";
import HomeIcon from "@mui/icons-material/Home";
import PatientIcon from "../../../Icons/Patient";
import HospitalizationIcon from "../../../Icons/Hospitalization";
import TeamIcon from "../../../Icons/Team";
//Styles
import { WrapperDialog } from "./styles";
import theme from "../../../../theme/theme";
// helps
import QRCode from "react-qr-code";
import _ from "lodash";
import LOCALSTORAGE from "../../../../helpers/constants/localStorage";
import { formatDate } from "../../../../helpers/date";
// types
import { QrCodeState } from "../../../../store/ducks/qrCode/types";
import { CareState } from "../../../../store/ducks/cares/types";

interface IDialogProps {
  tittle: { card: string; info?: string[] };
  content: IContent;
  openDialog: boolean;
  setOpenDialog: any;
  integration?: any;
}

interface IContent {
  tittle: string;
  rows: IRows[];
  qrCodeState: QrCodeState;
  careState: CareState;
}

interface IRows {
  name: string;
  value: any;
}
interface ITeam {
  name: string;
  function: string;
  user_id: string;
}
export default function DialogInfo(props: IDialogProps) {
  const { tittle, content, openDialog, setOpenDialog, integration } = props;

  function editName(card: string) {
    return card === "Qr Code" ? "Gerar" : "Editar";
  }
  const handleClose = () => {
    setOpenDialog(false);
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
  function handleFunction(list: any, company: string) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].companie_id === company) {
        return list[i].function;
      }
    }
  }
  const namePatient = (data: IContent) => {
    const name = data.rows.map(({ name, value }: IRows) => {
      if (name === "Nome" && tittle.card !== "Plano e Internação")
        return capitalizeText(value);
      if (
        name === "Número do Atendimento" &&
        tittle.card === "Plano e Internação"
      ) {
        return `Atendimento ${value}`;
      }
    });
    return name;
  };
  function iconHeader(title: string) {
    const colorIcons = theme.palette.primary.main;
    if (title === "Dados Pessoais")
      return (
        <PatientIcon
          fill={theme.palette.common.white}
          circleColor={colorIcons}
          width="16px"
        />
      );

    if (title === "Dados do Plano")
      return <HospitalizationIcon fill={colorIcons} width="16px" />;

    if (title === "Dados de atendimento")
      return <HomeIcon color="primary" sx={{ width: "16px" }} />;

    if (title === "Equipe Multidisciplinar")
      return <TeamIcon fill={colorIcons} width="16px" />;
  }

  const boxData = (name: string, value: any) => {
    return (
      <Typography color="grey[300]" sx={{ marginLeft: "24px" }}>
        {name}: {value}
      </Typography>
    );
  };
  const personalData = (data: IContent) => {
    const list = data.rows.map(({ name, value }: IRows, index: number) => {
      switch (name) {
        case "Nome":
          return boxData(name, value);
        case "Gênero":
          return boxData(name, value);
        case "Estado Civil":
          return boxData(name, value);
        case "Estado Civil":
          return boxData(name, value);
        case "Data de nascimento":
          return boxData(name, value);
        case "Mãe":
          return boxData(name, value);
        case "RG":
          return boxData(name, value);
        case "CPF":
          return boxData(name, value);
        case "Celular":
          return boxData(name, value);
        case "Telefone":
          return boxData(name, value);
        case "Email":
          return boxData(name, value);
        case "Doador de órgãos":
          return boxData(name, value == true ? "Sim" : "Não");
        case "Nacionalidade":
          return boxData(name, value);
        case "CEP":
          return boxData(name, value);
        case "Endereço":
          return boxData(name, value);
        case "Número":
          return boxData(name, value);
        case "Bairro":
          return boxData(name, value);
        case "Cidade":
          return boxData(name, value);
        case "UF":
          return boxData(name, value);
      }
    });
    return list;
  };
  const planData = (data: IContent) => {
    let itens = data.rows.map(({ name, value }: IRows, index: number) => {
      switch (name) {
        case "Convênio":
          return boxData(name, value.name);
        case "Plano":
          return boxData(name, value.name);
        case "Subplano":
          return boxData(name, value.name);
        case "Número da carteira":
          return boxData(name, value);
        case "Data de validade":
          return boxData(name, value);
      }
    });
    return itens;
  };

  function handleTeamData(content: IContent) {
    let team: ITeam[] = [];
    content.careState.checkin.data.map((day: any, index: number) => {
      if (day) {
        day.list.map((checks: any, index: number) => {
          const professional: ITeam = {
            name: getFirstAndLastName(
              capitalizeText(checks[0].user_id[0].name)
            ),
            function: handleFunction(
              checks[0].user_id[0].companies_links,
              content.careState.data.company_id
            ),
            user_id: checks[0].user_id[0]._id,
          };
          team.push(professional);
        });
      }
    });
    return _.uniqBy(team, "user_id").sort((a: any, b: any) => {
      return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
    });
  }

  function teamData(arr: ITeam[]) {
    let team = arr.map((professional: ITeam, index: number) => {
      if (professional.name)
        return (
          <Typography key={index}>
            {/* {`- ${professional.name} ( ${professional.function} )`} */}
            {`- ${capitalizeText(professional.function)} ${capitalizeText(
              professional.name
            )}`}
          </Typography>
        );
    });

    const arrEmpty = (
      <Typography>
        Não foram realizados nenhum check-in/out neste atendimento.
      </Typography>
    );

    return arr.length > 0 ? team : arrEmpty;
  }

  function careData(content: IContent) {
    let itens = content.rows.map(({ name, value }: IRows, index: number) => {
      switch (name) {
        case "Código do paciente":
          return boxData(name, value);
        case "Data de Atendimento":
          return boxData(name, value);
        case "Tipo de internação":
          return boxData(name, value);
        case "CID":
          return boxData(name, integration ? value : value);
        case "Médico Assistente":
          return boxData(name, value);
        case "Especialidade do Atendimento":
          return boxData(name, value.name);
        case "Leito":
          return boxData(name, value);
        case "Unidade":
          return boxData(name, value);
        case "Setor":
          return boxData(name, value);
        case "Acomodação":
          return boxData(name, value);
      }
    });
    return itens;
  }

  const dataList = (tittle: string) => {
    if (tittle === "Dados Pessoais") return personalData(content);
    if (tittle === "Dados do Plano") return planData(content);
    if (tittle === "Dados de atendimento") return careData(content);
    if (tittle === "Equipe Multidisciplinar")
      return teamData(handleTeamData(content));
  };
  return (
    <WrapperDialog>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          <Typography color="primary.main" variant="h5" fontWeight={600}>
            {namePatient(content)}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {tittle.info?.map((tittleInfo: string, index: number) => {
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: index === 0 ? "0" : "16px",
                    marginBottom: "8px",
                  }}
                >
                  {iconHeader(tittleInfo)}

                  <Typography fontWeight={600}>{tittleInfo} </Typography>
                </Box>
                {dataList(tittleInfo)}
              </>
            );
          })}
        </DialogContent>

        <DialogActions style={{ textAlign: "right" }}>
          <Button
            onClick={handleClose}
            sx={{ fontWeight: "700" }}
            color="primary"
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </WrapperDialog>
  );
}
