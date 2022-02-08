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
// teste
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// IMG
import { ReactComponent as IconChart } from "../../../assets/img/icon-prontuario.svg";
import { ReactComponent as IconEye } from "../../../assets/img/Icon ionic-md-eye.svg";
import { ReactComponent as IconHospitalization } from "../../../assets/img/icon-plano-internacoes.svg";
import { ReactComponent as IconTeam } from "../../../assets/img/icon-equipe-medica.svg";
import { OpenInBrowser } from "@material-ui/icons";

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
}
interface ICardInfo {
  tittleCard: string;
  content: IContent;
  gridProps?: IPropsGrid;
  alergicIs?: boolean;
}
export default function CardInfo(props: ICardInfo) {
  const { content, gridProps, tittleCard, alergicIs } = props;
  const [openDialog, setOpenDialog] = useState(false);

  function personalData(content: IContent, alergic: boolean | undefined) {
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
      }
    });
    alergic && itens.push(<TextRed>Paciente Alérgico</TextRed>);
    return itens;
  }
  const boxData = (name: string, value: any) => {
    return (
      <Box>
        {name}: {value}
      </Box>
    );
  };
  function PlanData(content: IContent) {
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
    let data: string[] = [];

    content.rows.map(({ name, value }: IRows, index: number) => {
      if (name === "Equipe") {
        value.map((item: string) => {
          data.push(item);
        });
      }
    });

    return data;
  }
  function teamData(arr: string[]) {
    let itens1 = arr.map((item: string, index: number) => {
      console.log(item, "item");
      if (index % 2 === 0) {
        return <Box key={index}>- {item}</Box>;
      }
    });
    let itens2 = arr.map((item: string, index: number) => {
      if (index % 2 !== 0) {
        return <Box key={index}>- {item}</Box>;
      }
    });

    let itensGrid = (
      <Grid container style={{ boxShadow: "none" }}>
        <Grid item xs={6} style={{ boxShadow: "none" }}>
          {itens1}
        </Grid>
        <Grid item xs={6} style={{ boxShadow: "none" }}>
          {itens2}
        </Grid>
      </Grid>
    );
    console.log(itensGrid, "grid");
    return itensGrid;
  }

  // function boxData(name:string,value:any){}
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
    if (tittle === "Dados Pessoais") return personalData(content, alergicIs);
    if (tittle === "Plano e Internação") return PlanData(content);
    if (tittle === "Equipe Multidisciplinar")
      return teamData(handleTeamData(content));
  };

  // console.log(openDialog);
  return (
    <>
      <BoxContainer style={{ padding: "26.5px", flex: "1", margin: "8px" }}>
        <WrapperHeader>
          <WrapperTittle>
            {iconHeader(tittleCard)}
            <Box>{tittleCard}</Box>
            {tittleCard === "Equipe Multidisciplinar" && (
              <Box
                style={{
                  cursor: "pointer",
                  border: "2px solid var(--secondary)",
                  borderRadius: "2px",
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  padding: "4px",
                  gap: "6px",
                }}
              >
                <Box
                  style={{
                    cursor: "pointer",
                    fontSize: "16px",
                    border: "1px solid var(--secondary)",
                    borderRadius: "10px",
                    width: "16px",
                    height: "16px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  +
                </Box>
                <Box style={{ fontSize: "10px", cursor: "pointer" }}>
                  Adicionar profissional
                </Box>
              </Box>
            )}
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
          {switchData(tittleCard)}
        </Box>
      </BoxContainer>
      <DialogInfo
        tittleCard={tittleCard}
        content={content}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
