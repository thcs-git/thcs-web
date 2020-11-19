import React, { Props, useState } from 'react';
import { Container, Button, Grid } from '@material-ui/core';

import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import { ButtonsContent, ButtonDefeault, ButtonPrimary, FormSection, FormContent, InputFiled as TextField } from './styles';

import {getAddress} from '../../../providers/correios';


interface IFormProps {
  id?: string;
  socialName?: string;
  fantasyName?: string;
  fiscalNumber?: string;
  postalCode?: string;
  city?: string;
  neighborhood?: string;
  address?: string;
  addressNumber?: string;
  addressComplement?: string;
  email?: string;
  phone?: string;
  cellphone?: string;
}

export default function CustomerForm(props: Props<IFormProps>) {

  const [state, setState] = useState<IFormProps>({
    id: '',
    socialName: '',
    fantasyName: '',
    fiscalNumber: '',
    postalCode: '',
    city: '',
    neighborhood: '',
    address: '',
    addressNumber: '',
    addressComplement: '',
    email: '',
    phone: '',
    cellphone: '',
  });

  async function handleCep(cep: string) {
    const address = await getAddress(cep)

    if (address.data.cep) {
      const { bairro: neighborhood, localidade: city, logradouro: addressName } = address.data;

      setState({
        ...state,
        neighborhood,
        city,
        address: addressName
      });
    }

  }

  function handleSaveFormCustomer() {
    console.log(state)
  }

  return (
    <>
      <Sidebar>
        {/* <Grid container> */}
        {/* <Grid md={10}> */}
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Clientes</FormTitle>

            <Grid container>
              <Grid item md={2} xs={4}>
                <TextField id="input-customer-id" label="ID" variant="outlined" size="small" value={state.id} fullWidth disabled />
              </Grid>
              <Grid item md={5} xs={12}>
                <TextField
                  id="input-social-name"
                  label="Nome Social"
                  variant="outlined"
                  size="small"
                  value={state.socialName}
                  onChange={(element) => setState({...state, socialName: element.target.value}) }
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                id="input-fantasy-name"
                label="Nome Fantasia"
                variant="outlined"
                size="small"
                value={state.fantasyName}
                onChange={(element) => setState({...state, fantasyName: element.target.value}) }
                fullWidth
                />
              </Grid>

              <Grid item md={2} xs={12}>
                <TextField id="input-fiscal-number" label="CNPJ" variant="outlined" size="small" value={state.fiscalNumber}
                onChange={(element) => setState({...state, fiscalNumber: element.target.value}) } fullWidth />
              </Grid>

              <Grid item md={10}></Grid>
            </Grid>

            <Grid container>
              <Grid item md={2} xs={12}>
                <TextField id="input-postal-code" label="CEP" variant="outlined" size="small" value={state.postalCode}
                onChange={(element) => setState({...state, postalCode: element.target.value}) } onBlur={(element) => handleCep(element.target.value)} fullWidth />
              </Grid>

              <Grid item md={3} xs={6}></Grid>

              <Grid item md={3} xs={12}>
                <TextField id="input-city" label="Cidade" variant="outlined" size="small" value={state.city}
                onChange={(element) => setState({...state, city: element.target.value}) } fullWidth />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField id="input-neighborhood" label="Bairro" variant="outlined" size="small" value={state.neighborhood}
                onChange={(element) => setState({...state, neighborhood: element.target.value}) } fullWidth />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField id="input-address" label="Endereço" variant="outlined" size="small" value={state.address}
                onChange={(element) => setState({...state, address: element.target.value}) } fullWidth />
              </Grid>

              <Grid item md={2} xs={12}>
                <TextField id="input-address-number" label="Número" variant="outlined" size="small"value={state.addressNumber}
                onChange={(element) => setState({...state, addressNumber: element.target.value}) }  fullWidth />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField id="input-address-complement" label="Complemento" variant="outlined" size="small" value={state.addressComplement}
                onChange={(element) => setState({...state, addressComplement: element.target.value}) } fullWidth />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField id="input-email" label="E-mail" variant="outlined" size="small" value={state.email}
                onChange={(element) => setState({...state, email: element.target.value}) } fullWidth />
              </Grid>
              <Grid item md={2} xs={12}>
                <TextField id="input-phone" label="Telefone" variant="outlined" size="small" value={state.phone}
                onChange={(element) => setState({...state, phone: element.target.value}) } fullWidth />
              </Grid>
              <Grid item md={2} xs={12}>
                <TextField id="input-cellphone" label="Celular" variant="outlined" size="small" value={state.cellphone}
                onChange={(element) => setState({...state, cellphone: element.target.value}) } fullWidth />
              </Grid>
            </Grid>
          </FormContent>
          <ButtonsContent>
            <ButtonDefeault variant="outlined" color="default">
              Cancelar
            </ButtonDefeault>
            <ButtonPrimary variant="contained" color="primary" onClick={() => handleSaveFormCustomer()}>
              Salvar
            </ButtonPrimary>
          </ButtonsContent>
        </FormSection>
        {/* </Grid> */}
        {/* </Grid> */}
      </Sidebar>
    </>
  );
}
