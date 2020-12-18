import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadRequest, getAddress as getAddressAction, createCompanyRequest, loadCompanyById } from '../../../store/ducks/companies/actions';
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
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchOutlined } from '@material-ui/icons';

import Sidebar from '../../../components/Sidebar';
import Alert from '../../../components/Alert';

import ButtonComponent from '../../../styles/components/Button';
import { FormTitle } from '../../../styles/components/Form';

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
  ];

  const { params } = props.match;

  const [state, setState] = useState<CompanyInterface>({
    _id: params.id || '',
    customerId: '',
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
    created_by: { _id: '5e8cfe7de9b6b8501c8033ac' }
  });

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(loadCompanyById(params.id))
    }
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
      return {
        ...prevState,
        address: {
          ...companyState.data.address,
        },
        created_by: { _id: '5e8cfe7de9b6b8501c8033ac' }
      }
    })
  }, [companyState]);

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

  const handleSaveFormCustomer = useCallback(() => {
    dispatch(createCompanyRequest(state));
  }, [state]);

  return (
    <Sidebar>
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Empresas</FormTitle>

            <FormGroupSection>
              <Grid container>
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
                <Grid item md={2} xs={12}>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel htmlFor="search-input">CEP</InputLabel>
                    <OutlinedInputFiled
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
            <ButtonComponent background="default" onClick={handleOpenModalCancel}>
              Cancelar
					  </ButtonComponent>
            <ButtonComponent background="success" onClick={handleSaveFormCustomer}>
              Salvar
					  </ButtonComponent>
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
