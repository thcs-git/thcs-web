import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputMask, { Props } from 'react-input-mask';

import { ApplicationState } from '../../../store';
import { loadCustomerById, getAddress as getAddressAction, updateCustomerRequest, createCustomerRequest, cleanAction } from '../../../store/ducks/customers/actions';
import { CustomerInterface } from '../../../store/ducks/customers/types';
import { createUserRequest as createUserAction } from '../../../store/ducks/users/actions';
import { UserInterface } from '../../../store/ducks/users/types';

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
  InputAdornment,
  Container,
  Divider,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import ButtonComponent from '../../../styles/components/Button';

import {
  ButtonsContent,
  ButtonDefeault,
  ButtonPrimary,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection,
  BoxCustom
} from './styles';
import mask from '../../../utils/mask';
import Loading from '../../../components/Loading';
import { validateCNPJ as validateCNPJHelper } from '../../../helpers/validateCNPJ';

interface IPageParams {
  id?: string;
}

export default function CustomerForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();

  const customerState = useSelector((state: ApplicationState) => state.customers);
  const userState = useSelector((state: ApplicationState) => state.users);

  const [openModalCancel, setOpenModalCancel] = useState(false);
  const { params } = props.match;

  const [validates, setVlidates] = useState({
    fiscal_number: false,
  });

  const [state, setState] = useState<CustomerInterface>({
    name: '',
    social_name: '',
    fantasy_name: '',
    responsible_user: '',
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
    cellphone: '',
    active: true
  });

  const [userData, setUserData] = useState<UserInterface>({
    companies: [], //empresa que vai vir do login
    name: '',
    birthdate: '',
    gender: '',
    national_id: '',
    issuing_organ: '',
    fiscal_number: '',
    mother_name: '',
    nationality: '',
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
    phone: '',
    cellphone: '',
    user_type_id: '',
    specialties: [],
    council_state: '',
    council_number: '',
    active: true,
  });

  useEffect(() => {
    dispatch(cleanAction());
  }, []);

  useEffect(() => {
    if (params.id) {
      setState(customerState.data);
    }
  }, [customerState]);

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
        ...prevState,
        address: {
          ...customerState.data.address
        }
      }
    });
  }, [customerState.data.address]);


  useEffect(() => {
    if (params.id) {
      dispatch(loadCustomerById(params.id))
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (!params.id && customerState.success && !customerState.error && !customerState.loading) {

      if (customerState.data._id) {
        dispatch(createUserAction({
          ...userData,
          customer_id: customerState.data._id,
          name: state.name || ``,
          fiscal_number: state.fiscal_number || ``,
          birthdate: '',
          gender: '',
          national_id: '',
          issuing_organ: '',
          mother_name: '',
          nationality: '',
          address: state.address,
          email: state.email || ``,
          phone: state.cellphone || ``,
          cellphone: state.cellphone || ``,
          user_type_id: '6025b77d83576e461426786a',
          council_state: '',
          council_number: '',
        }));
      }
    }
  }, [customerState.success]);

  useEffect(() => {
    if (!params.id && userState.success && !userState.error && !userState.loading) {
      history.push("/customer");
    }
  }, [userState.success]);

  useEffect(() => {
    const field = customerState.errorCep ? 'input-postal-code' : 'input-address-number';

    customerState.errorCep && setState(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        city: '',
        complement: '',
        district: '',
        number: '',
        state: '',
        street: '',
      }
    }));

    document.getElementById(field)?.focus();
  }, [customerState.errorCep]);

  const handleSaveFormCustomer = useCallback(() => {
    if (params.id) {
      dispatch(updateCustomerRequest(state));
    } else {
      dispatch(createCustomerRequest(state));
    }
  }, [state, params]);

  const validateCNPJField = useCallback((element) => {
    const isValidField = validateCNPJHelper(element.target.value) || false;

    console.log(isValidField);
    setVlidates(prevState => ({
      ...prevState,
      fiscal_number: !isValidField
    }));

  }, []);

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
    dispatch(cleanAction());
    setOpenModalCancel(false);
    history.push('/customer');
  }

  return (
    <Sidebar>
      {customerState.loading && <Loading />}
      <Container>
        <BoxCustom style={{ background: '#fff', marginTop: 0 }} mt={5} padding={4}>
          <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Clientes</FormTitle>

            <FormGroupSection>

              <Grid container>
                <Grid item md={12} xs={12}>
                    <TextField
                      id="input-social-client"
                      label="Cliente"
                      variant="outlined"
                      size="small"
                      value={state.name}
                      onChange={(element) => setState({ ...state, name: element.target.value })}
                      fullWidth
                    />
                  </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    id="input-social-name"
                    label="Nome Social"
                    variant="outlined"
                    size="small"
                    value={state.social_name}
                    onChange={(element) => setState({ ...state, social_name: element.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item md={7} xs={12}>
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

                <Grid item md={5} xs={12}>
                  <InputMask
                    mask="99.999.999/9999-99"
                    value={state.fiscal_number}
                    onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                    onBlur={validateCNPJField}
                  >
                    {(inputProps: any) => (
                      <TextField
                        {...inputProps}
                        id="input-fiscal-number"
                        label="CNPJ"
                        variant="outlined"
                        size="small"
                        error={validates.fiscal_number}
                        helperText={validates.fiscal_number ? `CNPJ inválido ou inexistente` : null}
                        // value={state.fiscal_number}
                        // onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                        placeholder="00.000.000/0000-00"
                        fullWidth
                      />)}
                  </InputMask>
                </Grid>
                <Grid item md={10} />
              </Grid>
            </FormGroupSection>

            <FormGroupSection>
              <Grid container>
                <Grid item md={3} xs={12} style={{ paddingRight: 10 }}>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel htmlFor="search-input">CEP</InputLabel>
                    <InputMask
                      mask="99999-999"
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
                    >
                      {(inputProps: Props) => (
                        <OutlinedInputFiled
                          id="input-postal-code"
                          label="CEP"
                          placeholder="00000-000"
                          error={customerState.errorCep}
                          // helperText={customerState.errorCep ? `CEP inválido` : null}
                          // value={state.address.postal_code}
                          // onChange={element => {
                          //   setState(prev => {
                          //     return {
                          //       ...prev,
                          //       address: {
                          //         ...prev.address,
                          //         postal_code: element.target.value
                          //       }
                          //     }
                          //   })
                          // }}
                          // onBlur={getAddress}
                          endAdornment={
                            <InputAdornment position="end">
                              <SearchOutlined style={{ color: 'var(--primary)' }} />
                            </InputAdornment>
                          }
                        />
                        )}
                    </InputMask>
                    {customerState.errorCep && (
                      <p style={{ color: '#f44336', margin: '4px 4px' }}>
                        CEP inválido
                      </p>
                    )}
                  </FormControl>
                </Grid>

                <Grid item md={9} xs={12}>
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

                <Grid item md={3} xs={12}>
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

                <Grid item md={9} xs={12}>
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
                    id="input-city"
                    label="Cidade"
                    variant="outlined"
                    size="small"
                    value={state.address.city}
                    onChange={(element) => setState({ ...state, address: { ...state.address, city: element.target.value } })}
                    fullWidth
                  />
                </Grid>

                <Grid item md={2} xs={12}>
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

              <Grid item md={12} xs={12}>
                <Divider style={{ marginBottom: 15, marginTop: 5 }} />
              </Grid>

              <Grid item md={8} xs={12}>
                <TextField
                  id="input-responsible-name"
                  label="Nome do responsável"
                  variant="outlined"
                  size="small"
                  value={state.responsible_user}
                  onChange={(element) => setState({ ...state, responsible_user: element.target.value })}
                  fullWidth
                />
              </Grid>

              <Grid item md={4} xs={12}>
                <InputMask
                  mask="(99) 9 9999-9999"
                  value={state.cellphone}
                  onChange={(element) => setState({ ...state, cellphone: element.target.value })}
                >
                  {(inputProps: any) => (
                    <TextField
                      {...inputProps}
                      id="input-cellphone"
                      label="Celular"
                      variant="outlined"
                      size="small"
                      // value={state.cellphone}
                      // onChange={(element) => setState({ ...state, cellphone: element.target.value })}
                      placeholder="00000-0000"
                      fullWidth
                    />
                  )}
                </InputMask>
              </Grid>

              <Grid item md={8} xs={12}>
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
                <Grid item md={4} xs={12}>
                  <InputMask
                    mask="(99) 9999-9999"
                    value={state.phones?.number}
                    onChange={(element) => setState({ ...state, phones: { ...state.phones, number: element.target.value } })}
                  >
                    {(inputProps: any) => (
                      <TextField
                        {...inputProps}
                        id="input-phone"
                        label="Telefone"
                        variant="outlined"
                        size="small"
                        // value={state.phones?.number}
                        // onChange={(element) => setState({ ...state, phones: { ...state.phones, number: element.target.value } })}
                        placeholder="0000-0000"
                        fullWidth
                      />
                    )}
                  </InputMask>
                </Grid>
                {state?._id && (
                  <Grid item md={12} xs={12}>
                    <FormControlLabel control={<Switch checked={state.active} onChange={(event) => {
                      setState(prevState => ({
                        ...prevState,
                        active: event.target.checked
                      }))
                    }} />} label="Ativo?" />
                  </Grid>
                )}
              </Grid>
            </FormGroupSection>
          </FormContent>
          <ButtonsContent>
            <ButtonComponent variant="outlined" background="success_rounded" onClick={() => handleOpenModalCancel()}>
              Voltar
            </ButtonComponent>
            <ButtonComponent variant="contained" background="success" onClick={() => handleSaveFormCustomer()}>
              Salvar
            </ButtonComponent>
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
        </BoxCustom>
      </Container>
    </Sidebar>
  );
}
