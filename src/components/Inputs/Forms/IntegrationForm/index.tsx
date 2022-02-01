import React, {useState, ReactNode, useCallback, useEffect} from 'react';
import {Checkbox, FormControlLabel, Grid} from "@material-ui/core";
import Switch from '@mui/material/Switch';

import {FormGroupSection, InputFiled as TextField} from "./styles";
import InputMask from "react-input-mask";
import validator from "validator";
import {validateCNPJ as validateCNPJHelper} from "../../../../helpers/validateCNPJ";
import ToggleActive from "../../../Button/ToggleActive";
import {cleanAction, loadRequestByClient} from "../../../../store/ducks/users/actions";


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


const IntegrationForm = (props: IComponent) => {
  const {index, state, setState, canEdit} = props;

  const [integrationChecked, setIntegrationChecked] = useState(false);

  useEffect(() => {
    if (state.integration) {
      setIntegrationChecked(true)
    }
  }, [state])

  return (
    <FormGroupSection>
      <Grid container>
        <Grid item md={8} xs={12}>
          <FormControlLabel
            control={
              // <Checkbox
              //   color="primary"
              //   checked={integrationChecked}
              //   onChange={(element, value) => {
              //     setIntegrationChecked(!integrationChecked)
              //     if (!value) {
              //       setState({...state, integration: null})
              //     }
              //   }}
              //   disabled={!canEdit}
              //   name="link"
              // />
              <Switch 
                disabled={!canEdit}
                color="primary"
                checked={integrationChecked}
                onChange={(element, value) => {
                  setIntegrationChecked(!integrationChecked)
                    if (!value) setState({...state, integration: null}) 
                  }
                }
              />
            }
            label="Possui Integração"
            labelPlacement="start"
          />
        </Grid>
        {integrationChecked ? (
          <Grid item md={8} xs={12}>
            <TextField
              label="Url de Integração"
              variant="outlined"
              size="small"
              value={state.integration}
              disabled={!canEdit}
              fullWidth
              onChange={element => {
                setState({...state, integration: element.target.value})
              }}
              {...a11yProps("input-url", index)}
            />
          </Grid>
        ) : (
          <>
          </>
        )}

      </Grid>
    </FormGroupSection>
  );
}

export default React.memo(IntegrationForm);
