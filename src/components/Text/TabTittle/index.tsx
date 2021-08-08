import React, {useState, ReactNode, useCallback} from 'react';
import {Grid} from "@material-ui/core";

import {FormTitle} from "./styles";
import ButtonEdit from "../../Button/ButtonEdit";


interface IComponent {
  tittle: string;
  icon?: any;
}

const TabTittle = (props: IComponent) => {
  const {tittle, icon} = props;

  return (
    <Grid item md={12} xs={12} style={{display: 'flex', alignItems: 'center', margin: '0 0 25px 5px'}}>
      <FormTitle>{tittle}</FormTitle>
      {icon}
    </Grid>
  );
}

export default React.memo(TabTittle);
