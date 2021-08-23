import React from 'react';

import {Button, Card, Grid} from "@material-ui/core";
import {CardIcon, BoxCustomFoot, CardTitle, FeedbackTitle} from "./styles";
import {CustomerInterface} from "../../../store/ducks/customers/types";
import CardContent from "@material-ui/core/CardContent";
import ButtonComponent from "../../../styles/components/Button";
import {AccountCircle} from "@material-ui/icons";

interface IProps {
  customers: CustomerInterface;
}

export default function ClientCard(props: IProps) {

  const {customers} = props;

  return (
    <Grid item md={6}>
      <FeedbackTitle>
        Configurações do Cliente
      </FeedbackTitle>
      <Card style={{marginBottom: '2.5rem'}}>
        <CardContent style={{display: "flex", flexDirection: "column"}}>
          <Grid container style={{display: "flex", flexDirection: "row"}}>
            <Grid item md={1} style={{padding: "0"}}>
              <AccountCircle style={{fontSize: 60}}/>
            </Grid>
            <Grid item md={4} style={{paddingLeft: "20px", paddingTop: "1.5rem"}}>
              <h3>{customers.social_name}</h3>
            </Grid>
            {/*<Grid item md={3}>*/}
            {/*  <ButtonComponent variant="outlined">*/}
            {/*    <Button onClick={handlePushUser}>Atualizar Dados</Button>*/}
            {/*  </ButtonComponent>*/}
            {/*</Grid>*/}
            {/*<Grid item md={2}>*/}
            {/*  <ButtonComponent variant="contained">*/}
            {/*    <Button onClick={handleBackUser}>Voltar</Button>*/}
            {/*  </ButtonComponent>*/}
            {/*</Grid>*/}
          </Grid>
          <Grid container direction="column">
            <Grid item style={{paddingLeft: "5rem"}}>
              CNPJ:{customers.fiscal_number}
            </Grid>
            <Grid item style={{paddingLeft: "5rem"}}>
              responsável:{customers.responsible_user}
            </Grid>
            <Grid item style={{paddingLeft: "5rem"}}>
              telefone:{customers.phone}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
