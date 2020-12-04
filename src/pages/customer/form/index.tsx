import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest, loadCustomerById, getAddress as getAddressAction } from '../../../store/ducks/customers/actions';
import { ApplicationState } from '../../../store';

import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  InputAdornment
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';

import DatePicker from '../../../styles/components/DatePicker';

import { CustomerInterface } from '../../../store/ducks/customers/types';

import {
  ButtonsContent,
  ButtonDefeault,
  ButtonPrimary,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection
} from './styles';

interface IPageParams {
  id?: string;
}

export default function CustomerForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerState = useSelector((state: ApplicationState) => state.customers).data;
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const { params } = props.match;

  const [state, setState] = useState({
    id: params.id || '',
    name: '',
    fantasy_name: '',
    fiscal_number: '',
    postal_code: '',
    street: '',
    number: '',
    district: '',
    city: '',
    state: '',
    complement: '',
    neighborhood: '',
    email: '',
    phone: '',
    cellphone: ''
  });

  useEffect(() => {
    setState(prev => ({
      ...prev,
      ...customerState,
      postal_code: customerState.address[0].postal_code,
      street: customerState.address[0].street,
      number: customerState.address[0].number,
      district: customerState.address[0].district,
      city: customerState.address[0].city,
      state: customerState.address[0].state,
      complement: customerState.address[0].complement,
      neighborhood: customerState.address[0].district,
      cellphone: customerState.phones[0].number,
    }))
  }, [customerState]);


  useEffect(() => {
    if (params.id) {
      dispatch(loadCustomerById(params.id))
    }
  }, [dispatch, params]);

  const handleSaveFormCustomer = useCallback(() => {
    // if (state?._id) {
      // dispatch(updateUserRequest(state));
    // } else {
      // dispatch(createUserRequest(state));
    // }
  }, []);

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.postal_code));
  }, [state.postal_code]);

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.push('/customer');
  }

  return (
    <Sidebar>
      <FormSection>
        <FormContent>
          <FormTitle>Cadastro de Clientes</FormTitle>

          <FormGroupSection>

            <Grid container>
              <Grid item md={2} xs={4}>
                <TextField
                  id="input-customer-id"
                  label="ID"
                  variant="outlined"
                  size="small"
                  value={state.id}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item md={5} xs={12}>
                <TextField
                  id="input-social-name"
                  label="Nome Social"
                  variant="outlined"
                  size="small"
                  value={state.name}
                  onChange={(element) => setState({ ...state, name: element.target.value })}
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField
                  id="input-fantasy-name"
                  label="Nome Fantasia"
                  variant="outlined"
                  size="small"
                  value={state.fantasy_name}
                  onChange={(element) => setState({ ...state, fantasy_name: element.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item md={2} xs={12}>
                <TextField
                  id="input-fiscal-number"
                  label="CNPJ"
                  variant="outlined"
                  size="small"
                  value={state.fiscal_number}
                  onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                  placeholder="00.000.000/0000-00"
                  fullWidth
                />
              </Grid>

              <Grid item md={10} />
            </Grid>
          </FormGroupSection>

          {/*  */}
          <FormGroupSection>
            <Grid container>
              <Grid item md={2} xs={12}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel htmlFor="search-input">CEP</InputLabel>
                  <OutlinedInputFiled
                    id="input-postal-code"
                    label="CEP"
                    placeholder="00000-000"
                    value={state.postal_code}
                    onChange={(element) => setState({ ...state, postal_code: element.target.value })}
                    onBlur={getAddress}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchOutlined style={{ color: 'var(--primary)' }} />
                      </InputAdornment>
                    }
                    labelWidth={155}
                  />
                </FormControl>
              </Grid>

              <Grid item md={3} xs={6} />

              <Grid item md={3} xs={12}>
                <TextField
                  id="input-city"
                  label="Cidade"
                  variant="outlined"
                  size="small"
                  value={state.city}
                  onChange={(element) => setState({ ...state, city: element.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  id="input-neighborhood"
                  label="Bairro"
                  variant="outlined"
                  size="small"
                  value={state.neighborhood}
                  onChange={(element) => setState({ ...state, neighborhood: element.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  id="input-address"
                  label="Endereço"
                  variant="outlined"
                  size="small"
                  value={state.street}
                  onChange={(element) => setState({ ...state, street: element.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item md={2} xs={12}>
                <TextField
                  id="input-address-number"
                  label="Número"
                  variant="outlined"
                  size="small"
                  value={state.number}
                  onChange={(element) => setState({ ...state, number: element.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  id="input-address-complement"
                  label="Complemento"
                  variant="outlined"
                  size="small"
                  value={state.complement}
                  onChange={(element) => setState({ ...state, complement: element.target.value })}
                  fullWidth
                />
              </Grid>
            </Grid>
          </FormGroupSection>

          <Grid container>
            <Grid item md={3} xs={12}>
              <TextField
                id="input-email"
                label="E-mail"
                variant="outlined"
                size="small"
                value={state.email}
                onChange={(element) => setState({ ...state, email: element.target.value })}
                fullWidth
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField
                id="input-phone"
                label="Telefone"
                variant="outlined"
                size="small"
                value={state.phone}
                onChange={(element) => setState({ ...state, phone: element.target.value })}
                placeholder="0000-0000"
                fullWidth
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <TextField
                id="input-cellphone"
                label="Celular"
                variant="outlined"
                size="small"
                value={state.cellphone}
                onChange={(element) => setState({ ...state, cellphone: element.target.value })}
                placeholder="00000-0000"
                fullWidth
              />
            </Grid>
          </Grid>
        </FormContent>
        <ButtonsContent>
          <ButtonDefeault variant="outlined" color="default" onClick={() => handleOpenModalCancel()}>
            Cancelar
					</ButtonDefeault>
          <ButtonPrimary variant="contained" color="primary" onClick={() => handleSaveFormCustomer()}>
            Salvar
					</ButtonPrimary>
        </ButtonsContent>
      </FormSection>

      <Dialog
        open={openModalCancel}
        onClose={handleCloseModalCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Cancelar</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja cancelar este cadastro?
					</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalCancel} color="primary">
            Não
					</Button>
          <Button onClick={handleCancelForm} color="primary" autoFocus>
            Sim
					</Button>
        </DialogActions>
      </Dialog>
    </Sidebar>
  );
}
