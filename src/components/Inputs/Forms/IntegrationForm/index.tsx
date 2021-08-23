import React, {useState, ReactNode, useCallback} from 'react';
import {Grid} from "@material-ui/core";

import {FormGroupSection, InputFiled as TextField} from "./styles";
import InputMask from "react-input-mask";
import validator from "validator";
import {validateCNPJ as validateCNPJHelper} from "../../../../helpers/validateCNPJ";
import ToggleActive from "../../../Button/ToggleActive";


interface IComponent {
  index: number;
}


function a11yProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
  };
}


const IntegrationForm = (props: IComponent) => {
  const {index} = props;

  return (
    <FormGroupSection>
      <Grid container>
        <Grid item md={8} xs={12}>
          <TextField
            label="Url de Integração"
            variant="outlined"
            size="small"
            value={'https://url.com.br'}
            fullWidth
            {...a11yProps("input-url", index)}
          />
        </Grid>
      </Grid>
    </FormGroupSection>
  );
}

export default React.memo(IntegrationForm);
