import React from 'react';

import Sidebar from '../../../components/Sidebar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { FormControlLabel, Grid, Switch } from '@material-ui/core';
import { BoxCustom, BoxCustomFoot, FeedbackTitle } from '../form/style';
export default function UserConfiguration(){
  return (
    <>
      <Sidebar>
        <BoxCustom>
           <Grid container direction="column">
              <Grid item md={6}>
            <FeedbackTitle>
              Configurações
            </FeedbackTitle>
            <Card>
              <CardContent style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                <Grid container>
                  <Grid item md={2}>
                    avatar
                  </Grid>
                  <Grid item md={5}>
                    nome
                  </Grid>
                  <Grid item md={2}>
                    botão de editar
                  </Grid>
                </Grid>
                <h3>
                  Botão para editar
                </h3>
                <h3>
                  nome
                </h3>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4}>
            <Card>
          <CardContent>
            <Grid container>
              <Grid item md={1}>
                avatar
              </Grid>
              <Grid item md={6}>
                nome
              </Grid>
              <Grid item md={2}>
                botão de edição
              </Grid>
            </Grid>
            <Grid container>
              <Grid item md={12}>
                cpf
              </Grid>
              <Grid item md={12}>
                email
              </Grid>
              <Grid item md={12}>
                telefone
              </Grid>
            </Grid>
          </CardContent>
        </Card>
          </Grid>
          <Grid item md={12}>
          <FeedbackTitle>
              Minhas Empresas
            </FeedbackTitle>
          </Grid>
          <Grid item md={12}>
          <FeedbackTitle>
              Auditoria
            </FeedbackTitle>
          </Grid>
          <Grid item md={12}>
          <FeedbackTitle>
              Segurança
            </FeedbackTitle>
          </Grid>
          <Grid container>
             <Grid item md={12}>
          <FeedbackTitle>
              Acessibilidade
            </FeedbackTitle>
          </Grid>

          <Grid container>
              Fontes Grande <Switch />
          </Grid>
          <Grid item md={3} xs={12}>
              Alto Contraste <Switch />
          </Grid>

          </Grid>


          <Grid item md={12}>

          <FeedbackTitle>
              Sobre o Sollar
          </FeedbackTitle>
            <BoxCustomFoot>
              Sollar 2021 <br />
              Versao 1.02 <br />
              Powered by TASCOM informática
            </BoxCustomFoot>

          </Grid>
 <Grid item md={2}>

            </Grid>
        </Grid>
        </BoxCustom>


      </Sidebar>
    </>
  );
}
