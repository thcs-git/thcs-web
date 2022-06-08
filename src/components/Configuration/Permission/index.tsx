import React from "react";

import { Grid } from "@mui/material";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { CardIcon, BoxCustomFoot, CardTitle, FeedbackTitle } from "./styles";

interface IProps {
  name: string;
  version: string;
  year: string;
}

export default function PermissionCard(props: any) {
  const { name, version, year } = props;

  return (
    <Grid item md={12}>
      <Grid container>
        <CardTitle>
          <CardIcon>
            <InfoRoundedIcon style={{ color: "#ffffff" }} />
          </CardIcon>
        </CardTitle>
        <FeedbackTitle>Sobre o Sollar</FeedbackTitle>
      </Grid>
      <BoxCustomFoot>
        {`Sollar ${year}`} <br />
        {`Versão ${version}`} <br />
        {`Powered by ${name}`}
      </BoxCustomFoot>
    </Grid>
  );
}
