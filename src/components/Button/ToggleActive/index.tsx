import React, {useState, ReactNode, useCallback} from 'react';
import {FormControlLabel, Grid} from "@material-ui/core";

import {SwitchComponent as Switch} from "./styles";
import {InputFiled as TextField} from "../../Inputs/Forms/ResponsibleForm/styles";


interface IComponent {
  index: number;
  state: any;
  setState: Function;
  canEdit: boolean;
}


function a11yProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
  };
}


const ToggleActive = (props: IComponent) => {
  const {index, state, setState, canEdit} = props;

  return (
    <Grid item md={2} xs={12} style={{paddingTop: "5px"}}>
      <FormControlLabel
        control={(
          <Switch
            disabled={!canEdit}
            checked={state.active}
            onChange={(event) => {
              setState((prevState: any) => ({
                ...prevState,
                active: event.target.checked
              }))
            }} />
        )}
        label="Ativo?"
        labelPlacement="start"
        {...a11yProps("active", index)}
      />
    </Grid>
  );
}

export default React.memo(ToggleActive);
