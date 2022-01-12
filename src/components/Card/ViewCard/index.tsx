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

// import { ReactComponent as Company2Icon } from "src/assets/img/icon-company-1.svg";

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
  let addressData: Irows[] = [];
  let addressFull: Irows[] = [
    {
      name: "Endereço",
      value: "",
    },
  ];

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
        break;
      case "Telefone":
        dataResponsible.push(e);
        break;
      case "Tipo":
        dataResponsible.push(e);
        break;
    }
  });

  addressData.forEach((e) => {
    if (e.name === "UF") addressFull[0].value += e.value;
    else if (e.name === "Cidade") addressFull[0].value += e.value + " - ";
    else addressFull[0].value += e.value + ", ";
  });

  dataCompany.push(addressFull[0]);
  // console.log(data);
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
          {/* <img src="../../../assets/img/icon-company2.svg" alt="icon company" /> */}
          {/* <Company2Icon></Company2Icon> */}
          <BusinessIcon sx={{ width: "24px" }} color="primary"></BusinessIcon>
          <p>Dados da empresa</p>
        </WrapperTitleData>
        <WrapperContentData>
          {dataCompany.map(({ name, value }: Irows, index: number) => (
            <Grid item>{`${name}: ${value}`}</Grid>
          ))}
        </WrapperContentData>

        <WrapperTitleData>
          <AssignmentIndIcon color="primary"></AssignmentIndIcon>
          <p>Dados do Responsável</p>
        </WrapperTitleData>
        <WrapperContentData>
          {dataResponsible.map(({ name, value }: Irows, index: number) => (
            <Grid item>{`${name}: ${value}`}</Grid>
          ))}
        </WrapperContentData>
      </Grid>
    </Grid>
  );
}
