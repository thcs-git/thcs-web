import React, { useState, ReactNode, useCallback, useEffect } from "react";
// MUI
import { Checkbox, FormControlLabel } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";

// icon and svg
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

// Style
import { FormGroupSection, InputFiled as TextField } from "./styles";
// utils
import InputMask from "react-input-mask";
import validator from "validator";
import { validateCNPJ as validateCNPJHelper } from "../../../../helpers/validateCNPJ";
import { formatDate } from "../../../../helpers/date";

// Reux saga
import {
  cleanAction,
  loadRequestByClient,
} from "../../../../store/ducks/users/actions";
//componentes
import ToggleActive from "../../../Button/ToggleActive";

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
  const { index, state, setState, canEdit } = props;

  const [integrationChecked, setIntegrationChecked] = useState(false);

  useEffect(() => {
    if (state.integration) {
      setIntegrationChecked(true);
    }
  }, [state]);
  console.log(state);
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
                  setIntegrationChecked(!integrationChecked);
                  if (!value) setState({ ...state, integration: null });
                }}
              />
            }
            label="Possui Integração"
            labelPlacement="start"
          />
        </Grid>
        {integrationChecked ? (
          <>
            <Grid item xs={12} sx={{ marginLeft: "16px" }}>
              <Typography>
                Data da integração:{" "}
                {formatDate(state.created_at, "DD/MM/YYYY HH:mm")}
              </Typography>
              <Typography>
                Origem do atendimento: ...... setor ......{" "}
              </Typography>
            </Grid>

            <Grid
              item
              md={10}
              xs={12}
              sx={{ marginLeft: "16px", marginTop: "16px" }}
            >
              <TextField
                label="Url de Integração"
                variant="outlined"
                size="small"
                value={state.integration}
                disabled={!canEdit}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CheckCircleOutlineOutlinedIcon
                        sx={{ color: "var(--action)" }}
                      />
                    </InputAdornment>
                  ),
                }}
                onChange={(element) => {
                  setState({ ...state, integration: element.target.value });
                }}
                {...a11yProps("input-url", index)}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </FormGroupSection>
  );
};

export default React.memo(IntegrationForm);
