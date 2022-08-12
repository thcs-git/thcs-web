import React, { useState, ReactNode, useCallback } from "react";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
} from "@mui/material";

import { FormGroupSection, InputFiled as TextField } from "./styles";
import InputMask, { Props } from "react-input-mask";
import validator from "validator";
import { validateCNPJ as validateCNPJHelper } from "../../../../helpers/validateCNPJ";
import { OutlinedInputFiled } from "../../../../pages/customer/form/styles";
import { SearchOutlined } from "@mui/icons-material";
import { SwitchComponent as Switch } from "../../../../styles/components/Switch";
import ViewCard from "../../../Card/ViewCard";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

interface IComponent {
  index: number;
  state: any;
  setState: Function;
  setValidations: Function;
  canEdit: boolean;
  getAddress: any;
  cepStatus: any;
  params: IPageParams;
}

interface IPageParams {
  id?: string;
  mode?: string;
}

function a11yProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
  };
}

const CepForm = (props: IComponent) => {
  const {
    index,
    state,
    setState,
    setValidations,
    canEdit,
    getAddress,
    cepStatus,
    params,
  } = props;

  const rows: any[] = [];

  function handleRows(state: any, name: string) {
    state && rows.push({ name: name, value: state });
  }

  handleRows(state.address.postal_code, "CEP");
  handleRows(state.address.street, "Endereço");
  handleRows(state.address.number, "Número");
  handleRows(state.address.complement, "Complemento");
  handleRows(state.address.district, "Bairro");
  handleRows(state.address.city, "Cidade");
  handleRows(state.address.state, "UF");

  const content = {
    tittle: "Endereço",
    // icon: <InfoRoundedIcon style={{color: "#ffffff"}}/>,
    rows: rows,
    details: "CepForm",
  };

  return (
    <FormGroupSection>
      <Grid container>
        {params.mode === "view" && !canEdit ? (
          <ViewCard content={content} />
        ) : (
          <>
            <Grid item md={2} xs={12}>
              <FormControl
                variant="outlined"
                size="small"
                style={{ padding: "0 12px 12px 0", width: "100%" }}
              >
                <InputLabel htmlFor="search-input">CEP</InputLabel>
                <InputMask
                  mask="99999-999"
                  value={state.address.postal_code}
                  disabled={!canEdit}
                  onChange={(element) => {
                    setState({
                      ...state,
                      address: {
                        ...state.address,
                        postal_code: element.target.value,
                      },
                    });
                    setValidations((prevState: any) => ({
                      ...prevState,
                      postal_code: !validator.isEmpty(element.target.value),
                    }));
                  }}
                  onBlur={getAddress}
                >
                  {/* {(inputProps: Props) => (
                    <OutlinedInputFiled
                      disabled={!canEdit}
                      error={cepStatus}
                      label="CEP"
                      placeholder="00000-000"
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchOutlined style={{ color: "var(--primary)" }} />
                        </InputAdornment>
                      }
                      {...a11yProps("input-postal-code", index)}
                    />
                  )} */}
                </InputMask>
                {cepStatus && (
                  <p style={{ color: "#f44336", margin: "-2px 5px 10px" }}>
                    CEP inválido
                  </p>
                )}
              </FormControl>
            </Grid>

            <Grid item md={10} xs={12}>
              <TextField
                label="Endereço"
                variant="outlined"
                size="small"
                value={state.address.street}
                onChange={(element) => {
                  setState({
                    ...state,
                    address: { ...state.address, street: element.target.value },
                  });
                  setValidations((prevState: any) => ({
                    ...prevState,
                    street: !validator.isEmpty(element.target.value),
                  }));
                }}
                disabled={!canEdit}
                fullWidth
                {...a11yProps("input-address", index)}
              />
            </Grid>

            <Grid item md={2} xs={12}>
              <TextField
                label="Número"
                variant="outlined"
                size="small"
                value={state.address.number}
                // onBlur={validationNumberField}

                onChange={(element) => {
                  setState({
                    ...state,
                    address: { ...state.address, number: element.target.value },
                  });
                  setValidations((prevState: any) => ({
                    ...prevState,
                    number: !validator.isEmpty(element.target.value),
                  }));
                }}
                fullWidth
                disabled={!canEdit}
                {...a11yProps("input-address-number", index)}
              />
            </Grid>
            <Grid item md={10} xs={12}>
              <TextField
                label="Complemento"
                variant="outlined"
                size="small"
                value={state.address.complement}
                onChange={(element) =>
                  setState({
                    ...state,
                    address: {
                      ...state.address,
                      complement: element.target.value,
                    },
                  })
                }
                fullWidth
                disabled={!canEdit}
                {...a11yProps("input-address-complement", index)}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <TextField
                label="Bairro"
                variant="outlined"
                size="small"
                value={state.address.district}
                // onBlur={validationDistrictField}

                onChange={(element) => {
                  setState({
                    ...state,
                    address: {
                      ...state.address,
                      district: element.target.value,
                    },
                  });
                  setValidations((prevState: any) => ({
                    ...prevState,
                    district: !validator.isEmpty(element.target.value),
                  }));
                }}
                fullWidth
                disabled={!canEdit}
                {...a11yProps("input-neighborhood", index)}
              />
            </Grid>
            <Grid item md={7} xs={12}>
              <TextField
                label="Cidade"
                variant="outlined"
                size="small"
                value={state.address.city}
                // onBlur={validationCityField}

                onChange={(element) => {
                  setState({
                    ...state,
                    address: { ...state.address, city: element.target.value },
                  });
                  setValidations((prevState: any) => ({
                    ...prevState,
                    city: !validator.isEmpty(element.target.value),
                  }));
                }}
                fullWidth
                disabled={!canEdit}
                {...a11yProps("input-city", index)}
              />
            </Grid>
            <Grid item md={1} xs={12}>
              <TextField
                label="UF"
                variant="outlined"
                size="small"
                value={state.address.state}
                onChange={(element) =>
                  setState({
                    ...state,
                    address: { ...state.address, state: element.target.value },
                  })
                }
                fullWidth
                disabled={!canEdit}
                {...a11yProps("input-address-uf", index)}
              />
            </Grid>
          </>
        )}
      </Grid>
    </FormGroupSection>
  );
};

export default React.memo(CepForm);
