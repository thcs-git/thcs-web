import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputMask from 'react-input-mask';

import { ApplicationState } from '../../../store';

import { loadRequest as getCustomersAction } from '../../../store/ducks/customers/actions';
import { CustomerDataItems } from '../../../store/ducks/customers/types';

import { getAddress as getAddressAction, createCompanyRequest, updateCompanyRequest, loadCompanyById } from '../../../store/ducks/companies/actions';
import { CompanyInterface } from '../../../store/ducks/companies/types';

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
  Snackbar,
  Container
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchOutlined } from '@material-ui/icons';

import LOCALSTORAGE from '../../../helpers/constants/localStorage';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';

import ButtonComponent from '../../../styles/components/Button';
import { FormTitle } from '../../../styles/components/Form';

import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection
} from './styles';

interface IPageParams {
  id?: string;
}

export default function CompanyForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const customerState = useSelector((state: ApplicationState) => state.customers);
  const companyState = useSelector((state: ApplicationState) => state.companies);

  const { params } = props.match;

  const [state, setState] = useState<CompanyInterface>({
    _id: params.id || '',
    customer_id: localStorage.getItem(LOCALSTORAGE.CUSTOMER) || '',
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
    phone: '',
    cellphone: '',
    active: true,
    created_by: { _id: localStorage.getItem(LOCALSTORAGE.USER_ID) || '' }
  });
  const [customers, setCustomers] = useState<CustomerDataItems[]>([]);

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(getCustomersAction());

    if (params.id) {
      dispatch(loadCompanyById(params.id))
    }
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      setState(prevState => {
        return {
          ...prevState,
          ...companyState.data
        }
      })
    }
  }, [companyState, params.id]);

  useEffect(() => {
    setState(prevState => {
      return {
        ...prevState,
        address: {
          ...companyState.data.address
        }
      }
    });

  }, [companyState.data?.address]);

  useEffect(() => {
    if (companyState.success && companyState.data?._id) history.push('/company');
  }, [companyState.success])

  useEffect(() => {
    setCustomers(customerState.list.data);
  }, [customerState]);

  const setCustomer = useCallback(({ _id: customer_id }: any) => {
    setState(prevState => ({
      ...prevState,
      customer_id
    }));
  }, [customers]);

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.push(`/company`);
  }

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postal_code));
  }, [state.address.postal_code]);

  const selectCustomer = useCallback(() => {
    const selected = customerState.list.data.filter(item => item._id === state.customer_id);
    return (selected[0]) ? selected[0] : null;
  }, [state.customer_id]);

  const handleSaveFormCustomer = useCallback(() => {
    if (params.id) {
      dispatch(updateCompanyRequest(state));
    } else {
      dispatch(createCompanyRequest(state));
    }
  }, [state]);

  return (
    <Sidebar>
      {companyState.loading && <Loading />}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Empresas</FormTitle>

            <FormGroupSection>
              <Grid container>
                <Grid item md={12} xs={12}>
                  <TextField
                    id="input-customer"
                    label="Cliente"
                    variant="outlined"
                    size="small"
                    value={localStorage.getItem(LOCALSTORAGE.CUSTOMER_NAME)}
                    fullWidth
                    disabled
                  />
                </Grid>
              </Grid>
            </FormGroupSection>

            <FormGroupSection>
              <Grid container>

                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
                  {/* <TextField
                    id="input-fiscal-number"
                    label="CNPJ"
                    variant="outlined"
                    size="small"
                    value={state.fiscal_number}
                    onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                    placeholder="00.000.000/0000-00"
                    fullWidth
                  /> */}
                  <InputMask
                    mask="99.999.999/9999-99"
                    value={state.fiscal_number}
                    onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                  >
                    {(inputProps: any) => (
                      <TextField
                        {...inputProps}
                        id="input-fiscal-number"
                        label="CNPJ"
                        variant="outlined"
                        size="small"
                        placeholder="00.000.000/0000-00"
                        fullWidth
                      />)}
                  </InputMask>
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
                    <InputMask
                      mask="99999-999"
                      value={state.address.postal_code}
                      onChange={(element) => setState({ ...state, address: { ...state.address, postal_code: element.target.value } })}
                      onBlur={getAddress}

                    >
                      {(inputProps: any) => (
                        <OutlinedInputFiled
                          id="input-postal-code"
                          label="CEP"
                          placeholder="00000-000"
                          labelWidth={155}
                          style={{ marginRight: 12 }}
                          endAdornment={
                            <InputAdornment position="end">
                              <SearchOutlined style={{ color: 'var(--primary)' }} />
                            </InputAdornment>
                          }
                        />
                      )}
                    </InputMask>
                    {/* <OutlinedInputFiled
                      id="input-postal-code"
                      label="CEP"
                      placeholder="00000-000"
                      value={state.address.postal_code}
                      onChange={(element) => setState({ ...state, address: { ...state.address, postal_code: element.target.value } })}
                      onBlur={getAddress}
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchOutlined style={{ color: 'var(--primary)' }} />
                        </InputAdornment>
                      }
                      labelWidth={155}
                      style={{ marginRight: 12 }}
                    /> */}
                  </FormControl>
                </Grid>

                <Grid item md={8} xs={12}>
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
                    id="input-neighborhood"
                    label="Bairro"
                    variant="outlined"
                    size="small"
                    value={state.address.district}
                    onChange={(element) => setState({ ...state, address: { ...state.address, district: element.target.value } })}
                    fullWidth
                  />
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

                <Grid item md={5} xs={12}>
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
              </Grid>
            </FormGroupSection>

            <Grid container>
              <Grid item md={4} xs={12}>
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
              <Grid item md={3} xs={12}>
                {/* <TextField
                  id="input-phone"
                  label="Telefone"
                  variant="outlined"
                  size="small"
                  value={state.phone}
                  onChange={(element) => setState({ ...state, phone: element.target.value })}
                  placeholder="0000-0000"
                  fullWidth
                /> */}
                <InputMask
                  mask="(99) 9999-9999"
                  value={state.phone}
                  onChange={(element) => setState({ ...state, phone: element.target.value })}
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
                      placeholder="(00) 0000-0000"
                      fullWidth
                    />
                  )}
                </InputMask>
              </Grid>
              <Grid item md={3} xs={12}>
                <InputMask
                  mask="(99) 9 9999-9999"
                  value={state.cellphone}
                  onChange={(element) => setState({ ...state, cellphone: element.target.value })}
                >
                  {(inputProps: any) => (
                    <TextField
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
            </Grid>
          </FormContent>
          <ButtonsContent>
            <ButtonComponent background="default" onClick={handleOpenModalCancel}>
              Voltar
					  </ButtonComponent>
            <ButtonComponent background="success" onClick={handleSaveFormCustomer}>
              Salvar
					  </ButtonComponent>
          </ButtonsContent>
        </FormSection>
      </Container>
      {/* <Snackbar
        autoHideDuration={10}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={companyState.error}
        key={'login_error'}
        onClose={() => console.log('fechar toast')}
      >
        <Alert severity="error" onClose={() => console.log('2 fechar toast')}>
          Não foi possível cadastrar a empresa
          </Alert>
      </Snackbar> */}

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
