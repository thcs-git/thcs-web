import React, { useState } from "react";
// components
import DialogInfo from "../../Dialogs/Card/Info";
// MUI
import { Box, Grid, IconButton, Paper, Typography } from "@mui/material";
// icons
import VisibilityIcon from "@mui/icons-material/Visibility";
//style
import {
  GridStyle,
  GridWrapper,
  TextRed,
  WrapperHeader,
  WrapperTittle,
  BoxContainer,
} from "./styles";
import theme from "../../../theme/theme";
// IMG
import PersonDataIcon from "../../Icons/PersonDada";
import HospitalizationIcon from "../../Icons/Hospitalization";
import TeamIcon from "../../Icons/Team";
import { ReactComponent as IconChart } from "../../../assets/img/icon-data.svg";
import { ReactComponent as IconEye } from "../../../assets/img/Icon ionic-md-eye.svg";
import { ReactComponent as IconHospitalization } from "../../../assets/img/icon-plano-internacoes.svg";
import { ReactComponent as IconTeam } from "../../../assets/img/icon-equipe-medica.svg";
// Redux types
import { QrCodeState } from "../../../store/ducks/qrCode/types";
import { CareState } from "../../../store/ducks/cares/types";
// helper
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import _ from "lodash";

interface IRows {
  name: string;
  value: any;
}
interface IPropsGrid {
  lg?: number;
  xl?: number;
  sx?: number;
  md?: number;
}
interface IContent {
  tittle: string;
  rows: IRows[];
  qrCodeState: QrCodeState;
  careState: CareState;
}
interface ICardInfo {
  tittle: { card: string; info?: string[] };
  content: IContent;
  gridProps?: IPropsGrid;
  alergicIs?: boolean;
  integration?: any;
}
interface ITeam {
  name: string;
  function: string;
  user_id: string;
}
const colorText = theme.palette.grey[800];
export default function CardInfo(props: ICardInfo) {
  const { content, gridProps, tittle, alergicIs, integration } = props;
  const { careState } = content;
  const [openDialog, setOpenDialog] = useState(false);
  const company_id = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);

  function personalData(content: IContent) {
    let itens = content.rows.map(({ name, value }: IRows, index: number) => {
      switch (name) {
        case "CPF":
          return boxData(name, value);
        case "Data de nascimento":
          return boxData(name, value);
        case "Mãe":
          return boxData(name, value);
        case "Tipo sanguíneo":
          return boxData(name, value);
        case "Doador de órgãos":
          return (
            <Typography color={colorText} key={index}>{`${name}: ${
              value ? "Sim" : "Não"
            }`}</Typography>
          );
        case "Gênero":
          return boxData(name, value);
      }
    });
    return itens;
  }

  const boxData = (name: string, value: any) => {
    return (
      <Typography color={colorText}>
        {name}: {value}
      </Typography>
    );
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

  function planData(content: IContent) {
    let itens = content.rows.map(({ name, value }: IRows, index: number) => {
      switch (name) {
        case "Número do Atendimento":
          return (
            <Typography
              color={colorText}
              fontWeight={500}
            >{`${name}: ${value}`}</Typography>
          );
        case "Código do paciente":
          return (
            <Typography
              color={colorText}
              fontWeight={500}
            >{`${name}: ${value}`}</Typography>
          );
        case "Médico Assistente":
          return (
            <Typography
              color={colorText}
              fontWeight={500}
            >{`${name}: ${value}`}</Typography>
          );
        case "Tipo de internação":
          return boxData(name, value);
        case "Convênio":
          return boxData(name, value.name);
        case "Plano":
          return boxData(name, value.name);
        case "Cógido do Paciente":
          return boxData(name, value);
        case "Unidade":
          return boxData(name, value);
        case "Setor":
          return boxData(name, value);
        case "Leito":
          return boxData(name, value);
      }
    });
    return itens;
  }

  function handleTeamData(content: IContent) {
    let team: ITeam[] = [];
    content.careState.checkin.data.map((day: any, index: number) => {
      if (day) {
        day.list.map((checks: any, index: number) => {
          const professional: ITeam = {
            name: getFirstAndLastName(
              capitalizeText(checks.user_name)
            ),
            function: checks.function,
            user_id: checks.user._id,
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
    let itensSideRigth = arr.map((item: ITeam, index: number) => {
      if (index % 2 !== 0) {
        if (item.name) {
          return (
            <Typography color={colorText} key={index}>
              {`- ${capitalizeText(item.function)} ${capitalizeText(
                item.name
              )}`}
            </Typography>
          );
        }
      }
    });
    let itensSideLeft = arr.map((item: ITeam, index: number) => {
      if (index % 2 === 0) {
        if (item.name) {
          return (
            <Typography color={colorText} key={index}>
              {`- ${capitalizeText(item.function)} ${capitalizeText(
                item.name
              )}`}
            </Typography>
          );
        }
      }
    });

    const arrEmpty = (
      <Typography color={colorText}>
        Não foram realizados nenhum check-in/out neste atendimento.
      </Typography>
    );

    let itensGrid = (
      <GridStyle container style={{ boxShadow: "none" }}>
        <GridStyle item xs={6} style={{ boxShadow: "none" }}>
          {itensSideLeft}
        </GridStyle>
        <GridStyle item xs={6} style={{ boxShadow: "none" }}>
          {itensSideRigth}
        </GridStyle>
      </GridStyle>
    );
    return arr.length > 0 ? itensGrid : arrEmpty;
  }

  function iconHeader(title: string) {
    const colorIcons = theme.palette.primary.main;
    if (title === "Dados Pessoais")
      return <PersonDataIcon fill={colorIcons} width="24px" height="24px" />;

    if (title === "Plano e Internação")
      return <HospitalizationIcon fill={colorIcons} />;

    if (title === "Equipe Multidisciplinar")
      return <TeamIcon fill={colorIcons} />;
  }
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const switchData = (tittle: string) => {
    if (tittle === "Dados Pessoais") return personalData(content);
    if (tittle === "Plano e Internação") return planData(content);
    if (tittle === "Equipe Multidisciplinar")
      return teamData(handleTeamData(content));
  };

  return (
    <>
      <GridWrapper item>
        <WrapperHeader>
          <WrapperTittle>
            {iconHeader(tittle.card)}
            <Typography fontWeight={600} color="primary.main">
              {tittle.card}
            </Typography>
          </WrapperTittle>
          <IconButton
            sx={{
              position: "absolute",
              right: "-10px",
              top: "-10px",
              cursor: "pointer",
              "& svg, path": { cursor: "pointer" },
            }}
            onClick={handleClickOpen}
          >
            <VisibilityIcon color="secondary" />
          </IconButton>
        </WrapperHeader>
        <Box>{switchData(tittle.card)}</Box>
      </GridWrapper>
      <DialogInfo
        tittle={tittle}
        content={content}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
