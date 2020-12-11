import React, { useState, useEffect, useCallback, ChangeEvent, ReactNode } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { CareInterface } from '../../../store/ducks/cares/types';
import { loadCareById, updateCareRequest, createCareRequest } from '../../../store/ducks/cares/actions';
import { loadRequest as getAreasAction } from '../../../store/ducks/areas/actions';
import { loadRequest as getUsersAction } from '../../../store/ducks/users/actions';

import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Badge,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  InputAdornment,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { SearchOutlined } from '@material-ui/icons';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import { ChipComponent as Chip } from '../../../styles/components/Chip';
import { SliderComponent as Slider } from '../../../styles/components/Slider';
import { SwitchComponent as Switch } from '../../../styles/components/Switch';
import { TabContent, TabNav, TabNavItem, TabBody, TabBodyItem } from '../../../styles/components/Tabs';

import { bloodTypes } from '../../../helpers/patient';

import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  FormGroupSection,
  OutlinedInputFiled,
} from './styles';

interface IFormFields extends CareInterface {
  form?: {
    bloodType: string | null,
  }
}

interface IPageParams {
  id?: string;
}

interface TabPanelProps {
  children?: ReactNode;
  index: any;
  value: any;
}

export default function AreaForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const careState = useSelector((state: ApplicationState) => state.cares);
  const areaState = useSelector((state: ApplicationState) => state.areas);
  const userState = useSelector((state: ApplicationState) => state.users);

  const { params } = props.match;

  const [state, setState] = useState<IFormFields>({
    patient_id: '',
    health_insurance_id: '',
    health_plan_id: '',
    health_sub_plan_id: '',
    contract: '',
    health_plan_card_number: '',
    health_plan_card_validate: '',
    origin_id: '',
    accommodation_type_id: '',
    care_type_id: '',
    procedure_id: '',
    cid_id: '',
    user_id: '',
    area_id: '',
    status: '', // Pre-Atendimento, Em atendimento, Cancelado, Finalizad,
    created_at: '',
    updated_at: '',
  });

  const [currentTab, setCurrentTab] = useState(0);

  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
  }, [currentTab]);

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(loadCareById(params.id));
    }

    dispatch(getAreasAction());
    dispatch(getUsersAction());
  }, [dispatch]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...careState.data
    }));

  }, [careState]);

  function handleSelectUser(value: any) {
    setState(prevState => ({
      ...prevState,
      user_id: value._id
    }));
  }

  function handleSelectArea(value: any) {
    setState(prevState => ({
      ...prevState,
      area_id: value._id
    }));
  }

  function handleSaveFormCare() {
    if (state?._id) {
      dispatch(updateCareRequest(state));
    } else {
      dispatch(createCareRequest(state));
    }
  }

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.push(`/care`);
  }

  const handleBloodType = useCallback((event: any, newValue: any) => {
    setState(prevState => ({
      ...prevState,
      form: {
        bloodType: newValue,
      }
    }));
  }, []);

  return (
    <Sidebar>
      {careState.loading && <Loading />}
      {console.log('careState', careState)}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Atendimento</FormTitle>
            <TabContent>
              <TabNav>
                <TabNavItem className={currentTab === 0 ? 'active' : ''} onClick={() => selectTab(0)}>
                  Dados Pessoais
                </TabNavItem>
                <TabNavItem className={currentTab === 1 ? 'active' : ''} onClick={() => selectTab(1)}>
                  Dados do Atendimento
                </TabNavItem>
              </TabNav>
              <TabBody>
                <TabBodyItem className={currentTab === 0 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={3} xs={6}>
                      <TextField
                        id="input-search-fiscal-number"
                        label="Paciente"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Buscar por CPF"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="input-name"
                        label="Nome"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Nome"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="input-social-name"
                        label="Nome Social"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Nome Social"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="input-mother-name"
                        label="Nome da Mãe"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Nome da Mãe"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <TextField
                        id="input-fiscal-number"
                        label="CPF"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="CPF"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <TextField
                        id="input-national-id"
                        label="RG"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="RG"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <TextField
                        id="input-emitting-organ"
                        label="Órgão Emissor"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Órgão Emissor"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <TextField
                        id="input-birthdate"
                        label="Data de Nascimento"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Data de Nascimento"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <TextField
                        id="input-nationality"
                        label="Nacionalidade"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Nacionalidade"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <TextField
                        id="input-naturalness"
                        label="Naturalidade"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Naturalidade"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={4}>
                      <TextField
                        id="input-health-national-card"
                        label="Cartão nacional de saúde"
                        variant="outlined"
                        size="small"
                        // value={state.name}
                        placeholder="Cartão nacional de saúde"
                        // onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={2} xs={6}>
                      <Autocomplete
                        id="combo-box-blood-type"
                        options={bloodTypes}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => <TextField {...params} label="Tipo sanguíneo" variant="outlined" />}
                        // value={state?.blood_type}
                        // getOptionSelected={(option, value) => option === state?.blood_type}
                        // onChange={(event: any, newValue) => {
                        //   handleBloodType(event, newValue);
                        // }}
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={3} xs={6}>
                      <FormControlLabel control={<Switch checked={true} onChange={(event) => {
                        setState(prevState => ({
                          ...prevState,
                          organ_donor: event.target.checked
                        }))
                      }} />} label="Doador de Órgãos?" />
                    </Grid>

                    <FormGroupSection>
                      <Divider />
                    </FormGroupSection>

                    <FormGroupSection>
                      <Grid container>
                        <Grid item md={2} xs={12}>
                          <FormControl variant="outlined" size="small" fullWidth>
                            <InputLabel htmlFor="search-input">CEP</InputLabel>
                            <OutlinedInputFiled
                              id="input-postal-code"
                              label="CEP"
                              placeholder="00000-000"
                              // value={state.address_id.postal_code}
                              // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, postal_code: element.target.value } })}
                              // onBlur={getAddress}
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
                            // value={state.address_id.street}
                            // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, street: element.target.value } })}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={2} xs={12}>
                          <TextField
                            id="input-address-number"
                            label="Número"
                            variant="outlined"
                            size="small"
                            // value={state.address_id.number}
                            // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, number: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={3} xs={12}>
                          <TextField
                            id="input-neighborhood"
                            label="Bairro"
                            variant="outlined"
                            size="small"
                            // value={state.address_id.district}
                            // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, district: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={3} xs={12}>
                          <TextField
                            id="input-city"
                            label="Cidade"
                            variant="outlined"
                            size="small"
                            // value={state.address_id.city}
                            // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, city: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={5} xs={12}>
                          <TextField
                            id="input-address-complement"
                            label="Complemento"
                            variant="outlined"
                            size="small"
                            // value={state.address_id.complement}
                            // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, complement: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={1} xs={12}>
                          <TextField
                            id="input-address-uf"
                            label="UF"
                            variant="outlined"
                            size="small"
                            // value={state.address_id.state}
                            // onChange={(element) => setState({ ...state, address_id: { ...state.address_id, state: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            id="input-email"
                            label="E-mail"
                            variant="outlined"
                            size="small"
                            // value={state.email}
                            // onChange={(element) => setState({ ...state, email: element.target.value })}
                            type="email"
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={2} xs={12}>
                          <TextField
                            id="input-phone"
                            label="Telefone"
                            variant="outlined"
                            size="small"
                            // value={form.phone}
                            // onChange={(element) => {
                            //   setForm(prevState => ({
                            //     ...prevState,
                            //     phone: element.target.value
                            //   }));
                            // }}
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
                            // value={form.cellphone}
                            // onChange={(element) => {
                            //   setForm(prevState => ({
                            //     ...prevState,
                            //     cellphone: element.target.value
                            //   }));

                            //   console.log('form', form);
                            // }}
                            placeholder="00000-0000"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </FormGroupSection>
                  </Grid>

                </TabBodyItem>
                <TabBodyItem className={currentTab === 1 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-health-insurance"
                        label="Convênio"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-health-plan"
                        label="Plano"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-health-sub-plan"
                        label="Sub-plano"
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-contract"
                        label="Contrato"
                        variant="outlined"
                        size="small"
                        value={state.contract}
                        onChange={(element) => setState(prevState => ({ ...prevState, contract: element.target.value }))}
                        fullWidth
                      />
                    </Grid>

                    <Grid item md={3} xs={12}>
                      <TextField
                        id="input-health-plan-card-number"
                        label="Número da carteira"
                        variant="outlined"
                        size="small"
                        value={state.health_plan_card_number}
                        onChange={(element) => setState(prevState => ({ ...prevState, health_plan_card_number: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <TextField
                        id="input-health-plan-card-validity"
                        label="Validade"
                        variant="outlined"
                        size="small"
                        type="date"
                        value={state.health_plan_card_validate}
                        onChange={(element) => setState(prevState => ({ ...prevState, health_plan_card_validate: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-origin"
                        label="Procedência"
                        variant="outlined"
                        size="small"
                        value={state.origin_id}
                        onChange={(element) => setState(prevState => ({ ...prevState, origin_id: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-type-accommodation"
                        label="Tipo de acomodação"
                        variant="outlined"
                        size="small"
                        value={state.accommodation_type_id}
                        onChange={(element) => setState(prevState => ({ ...prevState, accommodation_type_id: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <TextField
                        id="input-care-type"
                        label="Tipo do Homecare"
                        variant="outlined"
                        size="small"
                        value={state.care_type_id}
                        onChange={(element) => setState(prevState => ({ ...prevState, care_type_id: element.target.value }))}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <TextField
                        id="input-procedure"
                        label="Procedimento"
                        variant="outlined"
                        size="small"
                        // value={form.cellphone}
                        // onChange={(element) => {
                        //   setForm(prevState => ({
                        //     ...prevState,
                        //     cellphone: element.target.value
                        //   }));

                        //   console.log('form', form);
                        // }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        id="input-diagnostic"
                        label="Diaginóstico"
                        variant="outlined"
                        size="small"
                        // value={form.cellphone}
                        // onChange={(element) => {
                        //   setForm(prevState => ({
                        //     ...prevState,
                        //     cellphone: element.target.value
                        //   }));

                        //   console.log('form', form);
                        // }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Autocomplete
                        id="combo-box-users"
                        options={userState.list.data}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Prestador" variant="outlined" />}
                        size="small"
                        onChange={(event, value) => {
                          if (value) {
                            handleSelectUser({ _id: value._id || '', name: value.name })
                          }
                        }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <Autocomplete
                        id="combo-box-areas"
                        options={areaState.list.data}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Área" variant="outlined" />}
                        size="small"
                        onChange={(event, value) => {
                          if (value) {
                            handleSelectArea({ _id: value._id || '', name: value.name })
                          }
                        }}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </TabBodyItem>
              </TabBody>
            </TabContent>
          </FormContent>

          <ButtonsContent>
            <Button variant="outlined" background="default" onClick={() => handleOpenModalCancel()}>
              Cancelar
              </Button>
            <Button variant="contained" background="success" onClick={() => handleSaveFormCare()}>
              Salvar
					</Button>
          </ButtonsContent>
        </FormSection>
      </Container >
      <Dialog
        open={openModalCancel}
        onClose={handleCloseModalCancel}
        aria-labelledby="alert-dialog-title"
        aria-namedby="alert-dialog-description"
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
    </Sidebar >
  );
}
