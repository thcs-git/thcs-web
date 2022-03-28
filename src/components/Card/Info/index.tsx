import React, { useState } from "react";
// components
import DialogInfo from "../../Dialogs/Card/Info";
// MUI
import Box from "@material-ui/core/Box";
//style
import {
  GridStyle as Grid,
  TextRed,
  WrapperHeader,
  WrapperTittle,
  BoxContainer,
} from "./styles";
// IMG
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
          return <Box key={index}>{`${name}: ${value ? "Sim" : "Não"}`}</Box>;
        case "Gênero":
          return boxData(name, value);
      }
    });
    return itens;
  }

  const boxData = (name: string, value: any) => {
    return (
      <Box>
        {name}: {value}
      </Box>
    );
  };
  const capitalizeText = (words: string) => {
    return words
      .toLowerCase()
      .split(" ")
      .map((text: string) => {
        return (text = text.charAt(0).toUpperCase() + text.substring(1));
      })
      .join(" ");
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
            <Box style={{ fontWeight: "bold" }}>{`${name}: ${value}`}</Box>
          );
        case "Médico Assistente":
          return (
            <Box style={{ fontWeight: "bold" }}>{`${name}: ${value}`}</Box>
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
    content.careState.checkin.map((day: any, index: number) => {
      if (day) {
        day.list.map((checks: any, index: number) => {
          if (checks.list) {
            checks.list.map((user: any) => {
              const professional: ITeam = {
                name: getFirstAndLastName(
                  capitalizeText(user[0].user_id[0].name)
                ),
                function: handleFunction(
                  user[0].user_id[0].companies_links,
                  careState.data.company_id
                ),
                user_id: user[0].user_id[0]._id,
              };
              team.push(professional);
            });
          }
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
            <Box key={index}>
              - {item.name} {"(" + item.function + ")"}
            </Box>
          );
        }
      }
    });
    let itensSideLeft = arr.map((item: ITeam, index: number) => {
      if (index % 2 === 0) {
        if (item.name) {
          return (
            <Box key={index}>
              - {item.name} {"(" + item.function + ")"}
            </Box>
          );
        }
      }
    });

    const arrEmpty = (
      <Box>Não foram realizados nenhum check-in/out neste atendimento.</Box>
    );

    let itensGrid = (
      <Grid container style={{ boxShadow: "none" }}>
        <Grid item xs={6} style={{ boxShadow: "none" }}>
          {itensSideLeft}
        </Grid>
        <Grid item xs={6} style={{ boxShadow: "none" }}>
          {itensSideRigth}
        </Grid>
      </Grid>
    );
    return arr.length > 0 ? itensGrid : arrEmpty;
  }

  function iconHeader(title: string) {
    if (title === "Dados Pessoais")
      return <IconChart style={{ width: "24px", height: "24px" }} />;

    if (title === "Plano e Internação")
      return <IconHospitalization style={{ width: "24px", height: "24px" }} />;

    if (title === "Equipe Multidisciplinar")
      return <IconTeam style={{ width: "24px", height: "24px" }} />;
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
      <BoxContainer style={{ padding: "26.5px", flex: "1", margin: "8px" }}>
        <WrapperHeader>
          <WrapperTittle>
            {iconHeader(tittle.card)}
            <Box>{tittle.card}</Box>
          </WrapperTittle>
          <Box
            style={{
              position: "absolute",
              right: "-10px",
              top: "-10px",
              cursor: "pointer",
            }}
            onClick={handleClickOpen}
          >
            <IconEye style={{ cursor: "pointer" }} />
          </Box>
        </WrapperHeader>
        <Box style={{ color: "var(--gray-dark)" }}>
          {switchData(tittle.card)}
        </Box>
      </BoxContainer>
      <DialogInfo
        tittle={tittle}
        content={content}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
