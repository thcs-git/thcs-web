import React, {useState, ReactNode, useCallback} from 'react';
import {Grid} from "@material-ui/core";

import {FormGroupSection, InputFiled as TextField} from "./styles";
import InputMask from "react-input-mask";
import validator from "validator";
import {validateCNPJ as validateCNPJHelper} from "../../../../helpers/validateCNPJ";
import ToggleActive from "../../../Button/ToggleActive";


interface IComponent {
  index: number;
  state: any;
  setState: Function;
  setValidations: Function;
  fieldsValidation: any;
  canEdit: boolean;
  user?: string;
}


function a11yProps(name: string, index: number) {
  return {
    id: `${name}-${index}`,
  };
}


const ResponsibleForm = (props: IComponent) => {
  const {index, state, setState, setValidations, fieldsValidation, canEdit, user} = props;

  const validatePhone = () => {
    if (state.phones[0]?.phone){
      const landline =  state.phones[0]?.phone.replace('(','').replace(')','9').replace(' ','').replace(' ','').replace('-','');
      return validator.isMobilePhone(landline, 'pt-BR');
    }
  }

  const validateCellPhone = () => {
    if ( state.cellphone){
      const cellphone =  state.cellphone.replace('(','').replace(')','').replace(' ','').replace(' ','').replace('-','');
      return validator.isMobilePhone(cellphone, 'pt-BR');
    }
  }

  return (
    <FormGroupSection>
      <Grid container>
        <Grid item md={8} xs={12}>
          <TextField
            label="Nome do responsável"
            variant="outlined"
            size="small"
            value={state.responsible_user}
            onChange={(element) =>{
              setState({ ...state, responsible_user: element.target.value })
              setValidations((prevState: any) => ({ ...prevState, responsible_user: !validator.isEmpty(element.target.value) }));} }
            disabled={!canEdit}
            fullWidth
            {...a11yProps("input-responsible-name", index)}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <InputMask
            mask="(99) 9999-9999"
            value={state.phone? state.phone : state.phones[0]?.phone}
            disabled={!canEdit}
            onChange={(element) =>{
              {setState((prevState: { phones: any[]; }) => ({
                ...prevState,
                phone: element.target.value,
                phones: [
                  {
                    ...prevState.phones[0],
                    phone : element.target.value
                  }
                ]
              }))
                setValidations((prevState: any) => ({ ...prevState, phone: !validator.isEmpty(element.target.value) }));
              }}}
            onBlur={validatePhone}
            // onBlur={(element)=>{
            //   setFieldValidations((prevState: any) => ({ ...prevState, phone: !validator.isEmpty(element.target.value) }));}}
          >
            {(inputProps: any) => (
              <TextField
                disabled={!canEdit}
                {...inputProps}
                label="Telefone"
                variant="outlined"
                size="small"
                placeholder="(00) 0000-0000"
                error ={!validatePhone() && state.phones[0].phone != ''}
                fullWidth
                {...a11yProps("input-cellphone", index)}
              />
            )}
          </InputMask>
          {!validatePhone() && state.phones[0].phone &&(
            <p style={{ color: '#f44336', margin:'-10px 5px 10px' }}>
              Por favor insira um número válido
            </p>
          )}
        </Grid>
        <Grid item md={8} xs={12}>
          <TextField
            label="E-mail"
            variant="outlined"
            size="small"
            value={state.email}
            onBlur={(element)=>{setValidations((prevState: any) => ({ ...prevState, email: !validator.isEmpty(element.target.value) }));}}
            onChange={(element) =>{ setState({ ...state, email: element.target.value })
              setValidations((prevState: any) => ({ ...prevState, email: !validator.isEmail(element.target.value) }));}}
            fullWidth
            disabled={!canEdit}
            {...a11yProps("input-email", index)}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <InputMask
            mask="(99) 9 9999-9999"
            disabled={!canEdit}
            value={state.cellphone? state.cellphone : state.phones[0]?.cellphone }
            onBlur={validateCellPhone}
            onChange={(element) =>{
              {setState((prevState: { phones: any[]; }) => ({
                ...prevState,
                cellphone: element.target.value,
                phones: [
                  {
                    ...prevState.phones[0],
                    cellphone : element.target.value
                  }
                ]
              }))
                setValidations((prevState: any) => ({ ...prevState, phone: !validator.isEmpty(element.target.value) }));
                // setInputCellPhone({...inputCellPhone, value: element.target.value})
              }}}
          >
            {(inputProps: any) => (
              <TextField
                disabled={!canEdit}
                {...inputProps}
                label="Celular"
                variant="outlined"
                size="small"
                placeholder="(00) 0 0000-0000"
                error ={!validateCellPhone() && state.phones[0]?.cellphone != ''}
                fullWidth
                {...a11yProps("input-phone", index)}
              />
            )}
          </InputMask>
          {!validateCellPhone() && state.phones[0]?.cellphone &&(
            <p style={{ color: '#f44336', margin: '4px 4px' }}>
              Por favor insira um número válido
            </p>
          )}
        </Grid>
        {user == 'Tascom' && (
          <ToggleActive
            index={index}
            state={state}
            setState={setState}
            canEdit={canEdit}
          />
        )}
      </Grid>
    </FormGroupSection>
  );
}

export default React.memo(ResponsibleForm);
