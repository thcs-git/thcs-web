import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest, getAddress as getAddressAction, createCompanyRequest } from '../../../store/ducks/companies/actions';
import { CompanyInterface } from '../../../store/ducks/companies/types';
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
  InputAdornment,
  Snackbar,
  Container
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';

import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import Alert from '../../../components/Alert';
// import AutoComplete from '../../../styles/components/Autocomplete';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

export default function CompanyForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const companyState = useSelector((state: ApplicationState) => state.companies);
  const customers = [
    { id: 1, name: 'customer 1' },
    { id: 2, name: 'customer 2' },
  ]

  const [state, setState] = useState<CompanyInterface>({
    customerId: '',
    name: '',
    fantasyName: '',
    fiscalNumber: '',
    address: {
      postalCode: '',
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
  });

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(loadRequest());
  }, [dispatch]);

  useEffect(() => {
    if (companyState.error) {
      setState(prevState => {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            street: '',
            number: '',
            district: '',
            city: '',
            state: '',
            complement: '',
          },
        }
      })

      return;
    }

    setState(prevState => {
      const { address } = companyState.data;

      return {
        ...prevState,
        address
      }
    })
  }, [companyState]);

  const handleSaveFormCustomer = useCallback(() => {
    dispatch(createCompanyRequest(state));
  }, [state]);

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.goBack();
  }

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address.postalCode));
  }, [state.address.postalCode]);

  return (
    <Sidebar>
      {console.log('companyState', companyState)}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Empresas</FormTitle>

            <FormGroupSection>
              <Grid container>
                {state?.id && (
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
                )}
                <Grid item md={6} xs={12}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={customers}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Cliente" variant="outlined" />}
                    size="small"
                    fullWidth
                  />
                </Grid>
              </Grid>
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
                    value={state.fantasyName}
                    onChange={(element) => setState({ ...state, fantasyName: element.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid item md={3} xs={12}>
                  <TextField
                    id="input-fiscal-number"
                    label="CNPJ"
                    variant="outlined"
                    size="small"
                    value={state.fiscalNumber}
                    onChange={(element) => setState({ ...state, fiscalNumber: element.target.value })}
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
                      value={state.address.postalCode}
                      onChange={(element) => setState({ ...state, address: { ...state.address, postalCode: element.target.value } })}
                      onBlur={getAddress}
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchOutlined style={{ color: 'var(--primary)' }} />
                        </InputAdornment>
                      }
                      labelWidth={155}
                      style={{ marginRight: 12 }}
                    />
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
            <ButtonDefeault variant="outlined" color="default" onClick={handleOpenModalCancel}>
              Cancelar
					</ButtonDefeault>
            <ButtonPrimary variant="contained" color="primary" onClick={handleSaveFormCustomer}>
              Salvar
					</ButtonPrimary>
          </ButtonsContent>
        </FormSection>
      </Container>
      <Snackbar
        autoHideDuration={10}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={companyState.error}
        key={'login_error'}
        onClose={() => console.log('fechar toast')}
      >
        <Alert severity="error" onClose={() => console.log('2 fechar toast')}>
          Não foi possível cadastrar a empresa
          </Alert>
      </Snackbar>

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
