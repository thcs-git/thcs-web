import React from 'react';

import {Grid} from "@material-ui/core";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import {CardIcon, BoxCustomFoot, CardTitle, FeedbackTitle} from "./styles";

interface IProps {
  content: Icontent
}

interface Icontent {
  tittle: string;
  icon?: any;
  rows: Irows[];
}

interface Irows {
  name: string;
  value: string
}

export default function ViewCard(props: IProps) {
  const {content} = props;

  return (
    <Grid item md={6}>
      <Grid container
            style={{flexDirection: 'column', paddingLeft: '10px', paddingTop: '20px'}}>
        <Grid item style={{paddingBottom: "10px"}}>
          <h3>{content.tittle}</h3>
        </Grid>
        {content.rows.map(({name, value}:Irows, index:number) => (
          <Grid item>
            {`${name}: ${value}`}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
