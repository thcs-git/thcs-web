import React from "react";

import { Grid } from "@material-ui/core";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import {
  CardIcon,
  BoxCustomFoot,
  CardTitle,
  FeedbackTitle,
  WrapperTitleData,
} from "./styles";
import { any } from "cypress/types/bluebird";
import { RowingSharp } from "@material-ui/icons";
// import eee from "../../../assets/img/icon-company2.svg"

interface IProps {
  content: Icontent;
  md?: any;
}

interface Icontent {
  tittle: string;
  icon?: any;
  rows: Irows[];
}

interface Irows {
  name: string;
  value: string;
}

export default function ViewCard(props: IProps) {
  const { content, md } = props;
  const md_value = md ? md : 6;

  let dataCompany: Irows[] = [];
  let dataResponsible: Irows[] = [];

  // console.log(dataCompany, dataResponsible);
  content.rows.forEach((e) => {
    switch (e.name) {
      case "Razão Social":
        dataCompany.push(e);
        break;
      case "CNPJ":
        dataCompany.push(e);
        break;
      case "Endereço":
        dataCompany.push(e);
        break;
      case "Número":
        dataCompany.push(e);
        break;
      case "Bairro":
        dataCompany.push(e);
        break;
      case "Cidade":
        dataCompany.push(e);
        break;
      case "UF":
        dataCompany.push(e);
        break;
      case "UF":
        dataCompany.push(e);
        break;
      case "Nome do responsável":
        dataResponsible.push(e);
        break;
      case "E-mail":
        dataResponsible.push(e);
        break;
      case "Telefone":
        dataResponsible.push(e);
        break;
      case "Tipo":
        dataResponsible.push(e);
        break;
    }
  });
  // console.log(dataCompany);

  return (
    <Grid item md={md_value}>
      <Grid
        container
        style={{
          flexDirection: "column",
          paddingLeft: "10px",
          paddingTop: "20px",
        }}
      >
        {/* <Grid item style={{paddingBottom: "10px"}}>
          <h3>{content.tittle}</h3>
        </Grid> */}
        <WrapperTitleData>
          <img src="../../../assets/img/icon-company2.svg" alt="icon company" />
          <p>Dados da empresa</p>
        </WrapperTitleData>

        {dataCompany.map(({ name, value }: Irows, index: number) => (
          <Grid item>{`${name}: ${value}`}</Grid>
        ))}

        <WrapperTitleData>
          <p>Dados da Responsável</p>
        </WrapperTitleData>

        {dataResponsible.map(({ name, value }: Irows, index: number) => (
          <Grid item>{`${name}: ${value}`}</Grid>
        ))}
      </Grid>
    </Grid>
  );
}
