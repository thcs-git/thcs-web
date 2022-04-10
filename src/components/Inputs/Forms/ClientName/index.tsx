import React, {useState, ReactNode, useCallback} from 'react';
import {Grid} from "@material-ui/core";

import {FormGroupSection, InputFiled as TextField} from "./styles";
import InputMask from "react-input-mask";
import validator from "validator";
import {validateCNPJ as validateCNPJHelper} from "../../../../helpers/validateCNPJ";
import ViewCard from "../../../Card/ViewCard";


interface IComponent {
  index: number;
  state: any;
  setState: Function;
  setValidations: Function;
  fieldsValidation: any;
  canEdit: boolean;
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


const ClientFormHeader = (props: IComponent) => {
  const {index, state, setState, setValidations, fieldsValidation, canEdit, params} = props;

  const validateCNPJField = useCallback((element) => {
    const isValidField = validateCNPJHelper(element.target.value) || false;
    setValidations((prevState: any) => ({
      ...prevState,
      fiscal_number: !isValidField
    }));
  }, []);

  const rows = []

  state.name && rows.push({name: "Nome", value: state.name})
  state.fiscal_number && rows.push({name: "CPF", value: state.fiscal_number})

  const content = {
    tittle: "Dados do Hospital",
    // icon: <InfoRoundedIcon style={{color: "#ffffff"}}/>,
    rows: rows,
    details: "ClientFormHeader"
  }

  return (
    <FormGroupSection>
      <Grid container>
        {params.mode === 'view' && !canEdit ? (
          <ViewCard
            content={content}
          />
        ) : (
          <>
            <Grid item md={12} xs={12}>
              <TextField
                label="Nome"
                variant="outlined"
                size="small"

                value={state.name}
                onChange={(element) => {
                  setValidations((prevState: any) => ({...prevState, name: !validator.isEmpty(element.target.value)}));
                  setState({...state, name: element.target.value})
                }}

                fullWidth
                disabled={!canEdit}
                {...a11yProps("input-social-client", index)}
              />
            </Grid>

            <Grid item md={7} xs={12}>
              <TextField
                label="Razão Social"
                variant="outlined"
                size="small"
                value={state.social_name}
                onChange={(element) => {
                  setState({...state, social_name: element.target.value})
                  setValidations((prevState: any) => ({
                    ...prevState,
                    social_name: !validator.isEmpty(element.target.value)
                  }));
                }}

                fullWidth
                disabled={!canEdit}
                {...a11yProps("input-social-name", index)}
              />
            </Grid>

            <Grid item md={5} xs={12}>
              <InputMask
                mask="99.999.999/9999-99"
                disabled={!canEdit}
                value={state.fiscal_number}
                onChange={(element) => {
                  setState({...state, fiscal_number: element.target.value})
                  if (element.target.value.replace(/[^\d]+/g, '').length < 14) {
                    setValidations((prevState: any) => ({
                      ...prevState,
                      fiscal_number: false
                    }));
                  } else {
                    validateCNPJField(element)
                  }
                }}
                onBlur={validateCNPJField}
              >
                {(inputProps: any) => (
                  <TextField
                    disabled={!canEdit}
                    {...inputProps}
                    label="CNPJ"
                    variant="outlined"
                    size="small"
                    error={fieldsValidation.fiscal_number && state.fiscal_number}
                    placeholder="00.000.000/0000-00"
                    fullWidth
                    {...a11yProps("input-fiscal-number", index)}
                  />)}
              </InputMask>
              {fieldsValidation.fiscal_number && state.fiscal_number && (
                <p style={{color: '#f44336', margin: '-2px 5px 10px'}}>
                  CNPJ Inválido ou inexistente
                </p>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </FormGroupSection>
  );
}

export default React.memo(ClientFormHeader);
