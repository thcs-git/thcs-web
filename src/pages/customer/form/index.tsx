import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest, loadCustomerById, getAddress as getAddressAction, updateCompanyRequest, createCustomerRequest } from '../../../store/ducks/customers/actions';
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
  const customerState = useSelector((state: ApplicationState) => state.customers);
  const [openModalCancel, setOpenModalCancel] = useState(false);
  const { params } = props.match;

  const [state, setState] = useState<CustomerInterface>({
    id: params.id || '',
    name: '',
    fantasy_name: '',
    fiscal_number: '',
    address: {
      postal_code: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: '',
    },
    email: '',
    phones: {
      number: '',
      telegram: false,
      whatsapp: false,
    },
    cellphone: ''
  });

  useEffect(() => {
    if (customerState.error) {
      setState(prev => ({
        ...prev,
        address: {
          ...prev.address,
          street: '',
          number: '',
          district: '',
          city: '',
          state: '',
          complement: '',
        },
      }))

      return;
    }

    setState(prevState => {
      return {
        ...customerState.data,
        address: {
          ...customerState.data.address
        }
      }
    })
  }, [customerState]);


  useEffect(() => {
    if (params.id) {
      dispatch(loadCustomerById(params.id))
    }
  }, [dispatch, params]);

  const handleSaveFormCustomer = useCallback(() => {
    if (params.id) {
      dispatch(updateCompanyRequest(state));
    } else {
      dispatch(createCustomerRequest(state));
    }
  }, [state, params]);

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address.postal_code]);

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

              <Grid item md={3} xs={12}>
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
              <Grid item md={3} xs={12} style={{  marginRight: 10}}>
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel htmlFor="search-input">CEP</InputLabel>
                  <OutlinedInputFiled
                    id="input-postal-code"
                    label="CEP"
                    placeholder="00000-000"
                    value={state.address.postal_code}
                    onChange={element => {
                      setState(prev => {
                        return {
                          ...prev,
                          address: {
                            ...prev.address,
                            postal_code: element.target.value
                          }
                        }
                      })
                    }}
                    onBlur={getAddress}
                    endAdornment={
                      <InputAdornment position="end">
                        <SearchOutlined style={{ color: 'var(--primary)' }} />
                      </InputAdornment>
                    }
                    // labelWidth={155}

                  />
                </FormControl>
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  id="input-city"
                  label="Cidade"
                  variant="outlined"
                  size="small"
                  value={state.address.city}
                  onChange={(element) => setState({ ...state, address: { ...state.address, city: element.target.value } })}
                  fullWidth
                />
              </Grid>

              <Grid item md={1} xs={12}>
                  <TextField
                    id="input-address-uf"
                    label="UF"
                    variant="outlined"
                    size="small"
                    value={state.address.state}
                    onChange={(element) => setState({ ...state, address: { ...state.address, state: element.target.value } })}
                    fullWidth
                  />
                </Grid>

              <Grid item md={4} xs={12}>
                <TextField
                  id="input-neighborhood"
                  label="Bairro"
                  variant="outlined"
                  size="small"
                  value={state.address.district}
                  onChange={(element) => setState({ ...state, address: { ...state.address, district: element.target.value } })}
                  fullWidth
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField
                  id="input-address"
                  label="Endereço"
                  variant="outlined"
                  size="small"
                  value={state.address.street}
                  onChange={(element) => setState({ ...state, address: { ...state.address, street: element.target.value } })}
                  fullWidth
                />
              </Grid>

              <Grid item md={2} xs={12}>
                <TextField
                  id="input-address-number"
                  label="Número"
                  variant="outlined"
                  size="small"
                  value={state.address.number}
                  onChange={(element) => setState({ ...state, address: { ...state.address, number: element.target.value } })}
                  fullWidth
                />
              </Grid>

              <Grid item md={3} xs={12}>
                <TextField
                  id="input-address-complement"
                  label="Complemento"
                  variant="outlined"
                  size="small"
                  value={state.address.complement}
                  onChange={(element) => setState({ ...state, address: { ...state.address, complement: element.target.value } })}
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
                value={state.phones?.number}
                onChange={(element) => setState({ ...state, phones: { ...state.phones, number: element.target.value }  })}
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
            Voltar
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
