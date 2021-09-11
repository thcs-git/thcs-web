import React from 'react';

import {Grid} from "@material-ui/core";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import {CardIcon, BoxCustomFoot, CardTitle, FeedbackTitle} from "./styles";

interface IProps {
  content: Icontent;
  md?: any
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
  const {content, md} = props;

  const md_value = md ? md : 6

  return (
    <Grid item md={md_value}>
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
