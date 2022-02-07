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
      if (name === "CPF") return <Box key={index}>{`${name}: ${value}`}</Box>;
      if (name === "Data de nascimento")
        return <Box key={index}>{`${name}: ${value}`}</Box>;
      if (name === "Idade") return <Box key={index}>{`${name}: ${value}`}</Box>;
      if (name === "Mãe") return <Box key={index}>{`${name}: ${value}`}</Box>;
      if (name === "Tipo sanguíneo")
        return <Box key={index}>{`${name}: ${value}`}</Box>;
      if (name === "Doador de órgãos")
        return <Box key={index}>{`${name}: ${value ? "Sim" : "Não"}`}</Box>;
    });
    alergic && itens.push(<TextRed>Paciente Alérgico</TextRed>);
    return itens;
  }
  function PlanData(content: IContent) {
    // console.log(content.rows);
    let itens = content.rows.map(({ name, value }: IRows, index: number) => {
      if (name === "Número do Atendimento")
        return <Box style={{ fontWeight: "bold" }}>{`${name}: ${value}`}</Box>;
      if (name === "Médico Assistente")
        return <Box style={{ fontWeight: "bold" }}>{`${name}: ${value}`}</Box>;
      if (name === "Tipo de internação")
        return <Box>{`${name}: ${value}`}</Box>;
      if (name === "Convênio") return <Box>{`${name}: ${value.name}`}</Box>;
      if (name === "Plano") return <Box>{`${name}: ${value.name}`}</Box>;
      if (name === "Cógido do Paciente")
        return <Box>{`${name}: ${value}`}</Box>;
      if (name === "Unidade") return <Box>{`${name}: ${value}`}</Box>;
      if (name === "Setor") return <Box>{`${name}: ${value}`}</Box>;
      if (name === "Leito") return <Box>{`${name}: ${value}`}</Box>;
    });
    // console.log(itens);
    return itens;
  }
  function iconHeader(title: string) {
    if (title === "Dados Pessoais")
      return <IconChart style={{ width: "24px", height: "24px" }} />;

    if (title === "Plano e Internação")
      return <IconHospitalization style={{ width: "24px", height: "24px" }} />;
  }
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // console.log(openDialog);
  return (
    <>
      <Grid item style={{ padding: "26.5px", flex: "1" }}>
        <WrapperHeader>
          <WrapperTittle>
            {iconHeader(tittleCard)}
            <Box>{tittleCard}</Box>
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
            <IconEye />
          </Box>
        </WrapperHeader>
        <Box style={{ color: "var(--gray-dark)" }}>
          {tittleCard === "Dados Pessoais" && personalData(content, alergicIs)}
          {tittleCard === "Plano e Internação" && PlanData(content)}
        </Box>
      </Grid>
      <DialogInfo
        tittleCard={tittleCard}
        content={content}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </>
  );
}
