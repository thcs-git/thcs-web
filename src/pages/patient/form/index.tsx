import React, { useState, useEffect, useCallback } from 'react';
import Tab from '@material-ui/core/Tab';

import { useDispatch, useSelector } from 'react-redux';
import { createPatientRequest, updatePatientRequest, getAddress as getAddressAction, loadPatientById, setIfRegistrationCompleted, loadFailure } from '../../../store/ducks/patients/actions';
import { PatientInterface } from '../../../store/ducks/patients/types';
import { loadRequest as getAreasAction } from '../../../store/ducks/areas/actions';

import { ApplicationState } from '../../../store';

import Loading from '../../../components/Loading';

import RegistrationCompleted from '../capture/registrationCompleted';

import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DayJsUtils from '@date-io/dayjs';

import Sidebar from '../../../components/Sidebar';
import { FormTitle, SelectComponent as Select } from '../../../styles/components/Form';
import { SwitchComponent as Switch } from '../../../styles/components/Switch';

import { formatDate } from '../../../helpers/date';
import { bloodTypes, maritalStatus } from '../../../helpers/patient';

import DatePicker from '../../../styles/components/DatePicker';
import ButtonComponent from '../../../styles/components/Button';

import {
  ButtonsContent,
  ButtonPrimary,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection,
  TabCustom as Tabs,
  FormControlCustom,
  BoxCustom
} from './styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { loadSuccess } from '../../../store/ducks/areas/actions';

interface IFormFields {
  bloodType: string | null,
  cellphone: string,
  phone: string,
}

interface IPageParams {
  id?: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function PatientForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const patientState = useSelector((state: ApplicationState) => state.patients);
  const areaState = useSelector((state: ApplicationState) => state.areas);

  const { params } = props.match;

  const [state, setState] = useState<PatientInterface>({
    companies: ['5ee65a9b1a550217e4a8c0f4'], //empresa que vai vir do login
    name: '',
    social_name: '',
    birthdate: '',
    gender: '',
    mother_name: '',
    nationality: '',
    profession: 'FIELD_NOT_EXISTS_IN_PATIENT_REGISTRATION',
    naturalness: 'FIELD_NOT_EXISTS_IN_PATIENT_REGISTRATION',
    fiscal_number: '',
    national_id: '',
    issuing_organ: '',
    marital_status: '',
    address_id: {
      postal_code: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: '',
    },
    area_id: '',
    email: '',
    phones: [{
      cellnumber: '',
      number: ''
    }],
    responsable: {
      name: '',
      phone: '',
      cellphone: '',
      relationship: ''
    },
    active: false,
    sus_card: 'FIELD_NOT_EXISTS_IN_PATIENT_REGISTRATION',
    blood_type: '',
    organ_donor: false,

    assistent_doctor: '',
    convenio: '',
    health_insurance: '',
    hospital: '',
    hospital_bed: '',
    sector: '',
    sub_health_insurance: '',
    unit_health: ''
  });

  const [form, setForm] = useState<IFormFields>({
    bloodType: null,
    phone: '',
    cellphone: '',
  });

  const [type, setType] = useState('registry');

  const genders = ['Masculino', 'Feminino', 'Indefinido'];

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(getAreasAction());

    if (params.id) {
      dispatch(loadPatientById(params.id));
    } else {
      dispatch(loadFailure());
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (params.id) {
      setState(patientState.data);
    }

    // setForm(prevState => ({
    //   ...prevState,
    //   phone: patientState.data.phones.find(phone => phone.cellnumber)?.cellnumber || '',
    //   cellphone: patientState.data.phones.find(phone => phone.number)?.number || '',
    // }));

  }, [patientState.data]);

  useEffect(() => {
    // if (patientState.error) {
    //   setState(prevState => {
    //     return {
    //       ...prevState,
    //       address: {
    //         ...prevState.address,
    //         street: '',
    //         number: '',
    //         district: '',
    //         city: '',
    //         state: '',
    //         complement: '',
    //       },
    //     }
    //   })

    //   return;
    // }

    setState(prevState => {
      return {
        ...prevState,
        address_id: {
          ...prevState.address_id,
          ...patientState.data.address_id
        }
      }
    });
  }, [patientState.data.address_id]);

  const getAddress = useCallback(() => {
    dispatch(getAddressAction(state.address_id.postal_code));
  }, [state.address_id.postal_code]);

  const handleBloodType = useCallback((event: any, newValue: any) => {
    setForm(prevState => ({
      ...prevState,
      bloodType: newValue,
    }));

    setState(prevState => ({
      ...prevState,
      blood_type: newValue,
    }));
  }, [state.blood_type]);

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    history.push(`/patient`);
  }

  const handleChangeRegistryType = useCallback((element) => {
    setType(element.target.value);
  }, [type]);


  const handleSaveFormPatient = useCallback(() => {
    const patientData = {
      ...state,
      phones: [
        { whatsapp: false, telegram: false, number: state.phones[0]?.number },
        { whatsapp: false, telegram: false, cellnumber: state.phones[0]?.cellnumber },
      ]
    };

    if (state?._id) {
      dispatch(updatePatientRequest(patientData));
    } else {
      dispatch(createPatientRequest(patientData));
    }
  }, [state]);


  return (
    <Sidebar>
      {patientState.loading && <Loading />}
      {patientState.isRegistrationCompleted ? (
        <RegistrationCompleted {...props} />
      ) : (
          <Container>
            <FormTitle>Cadastro de Paciente</FormTitle>
            <Tabs
              value={0}
              onChange={() => { }}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="DADOS PESSOAIS" disabled />
            </Tabs>
            <TabPanel value={0} index={0}>
              <BoxCustom style={{ background: '#fff', marginTop: 0 }} mt={5} padding={4}>
                <FormSection>
                  <FormContent>
                    <FormGroupSection>
                      <Grid container>
                        <Grid item md={9} xs={12}>
                          <TextField
                            id="input-name"
                            label="Nome do paciente"
                            variant="outlined"
                            size="small"
                            value={state.name}
                            onChange={(element) => setState({ ...state, name: element.target.value })}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <DatePicker
                            id="input-fiscal-birthdate"
                            label="Data de Nascimento"
                            value={state.birthdate?.length > 10 ? formatDate(state?.birthdate, 'YYYY-MM-DD') : state?.birthdate}
                            onChange={(element) => setState({ ...state, birthdate: element.target.value })}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={9} xs={12}>
                          <TextField
                            id="input-social-name"
                            label="Nome social"
                            variant="outlined"
                            size="small"
                            value={state.social_name}
                            onChange={(element) => setState({ ...state, social_name: element.target.value })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={3} xs={12}>
                          <Autocomplete
                            id="combo-box-gender"
                            options={['Masculino', 'Feminino', 'Indefinido']}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => <TextField {...params} label="Sexo" variant="outlined" />}
                            size="small"
                            onChange={(element, value) => setState({ ...state, gender: value || '' })}
                            value={state?.gender}
                            noOptionsText="Nenhum resultado encontrado"
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={8} xs={12}>
                          <TextField
                            id="input-fantasy-name"
                            label="Nome da mãe"
                            variant="outlined"
                            size="small"
                            value={state.mother_name}
                            onChange={(element) => setState({ ...state, mother_name: element.target.value })}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="input-nationality"
                            label="Nacionalidade"
                            variant="outlined"
                            size="small"
                            value={state.nationality}
                            onChange={(element) => setState({ ...state, nationality: element.target.value })}
                            fullWidth
                          />
                        </Grid>

                      </Grid>
                      <Grid container>

                        <Grid item md={3} xs={12}>
                          <TextField
                            id="input-fiscal-number"
                            label="CPF"
                            variant="outlined"
                            size="small"
                            value={state.fiscal_number}
                            onChange={(element) => setState({ ...state, fiscal_number: element.target.value })}
                            placeholder="000.000.000-00"
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={4} xs={12}>
                          <TextField
                            id="input-nation-id"
                            label="RG"
                            variant="outlined"
                            size="small"
                            value={state.national_id}
                            onChange={(element) => setState({ ...state, national_id: element.target.value })}
                            placeholder="0.000-000"
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={5} xs={12}>
                          <TextField
                            id="input-emitting-organ"
                            label="Órgão Emissor"
                            variant="outlined"
                            size="small"
                            value={state.issuing_organ}
                            onChange={(element) => setState({ ...state, issuing_organ: element.target.value })}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <FormGroupSection>
                            <Autocomplete
                              id="combo-box-marital-status"
                              options={maritalStatus}
                              getOptionLabel={(option) => option}
                              renderInput={(params) => <TextField {...params} label="Estado Civil" variant="outlined" />}
                              value={state?.marital_status}
                              getOptionSelected={(option, value) => option === state?.marital_status}
                              onChange={(event: any, newValue) => {
                                setState(prevState => ({
                                  ...prevState,
                                  marital_status: newValue || '',
                                }));
                              }}
                              size="small"
                              noOptionsText="Nenhum resultado encontrado"
                              fullWidth
                            />
                          </FormGroupSection>
                        </Grid>

                        <Grid item md={3} xs={12}>
                          <FormGroupSection>
                            <Autocomplete
                              id="combo-box-blood-type"
                              options={bloodTypes}
                              getOptionLabel={(option) => option}
                              renderInput={(params) => <TextField {...params} label="Tipo sanguíneo" variant="outlined" />}
                              value={state?.blood_type}
                              getOptionSelected={(option, value) => option === state?.blood_type}
                              onChange={(event: any, newValue) => {
                                handleBloodType(event, newValue);
                              }}
                              size="small"
                              noOptionsText="Nenhum resultado encontrado"
                              fullWidth
                            />
                          </FormGroupSection>
                        </Grid>

                        <Grid item md={6} xs={6}>

                          <FormControlCustom>
                            <FormLabel component="legend">Doador de Órgãos?</FormLabel>
                            <RadioGroup
                              row
                              aria-label="registry-type"
                              name="registry-type"
                              value={state.organ_donor}
                              onChange={(element) => setState({ ...state, organ_donor: JSON.parse(element.target.value) })}
                            >
                              <FormControlLabel value={true} control={<Radio color="primary" />} label="Sim" />
                              <FormControlLabel value={false} control={<Radio color="primary" />} label="Não" />
                            </RadioGroup>
                          </FormControlCustom>
                        </Grid>

                        <Grid item md={10} />
                      </Grid>
                    </FormGroupSection>

                    {/*  */}
                    <FormGroupSection>
                      <Grid container>
                        <Grid item md={3} xs={12}>
                          <FormControl variant="outlined" size="small" fullWidth>
                            <InputLabel htmlFor="search-input">CEP</InputLabel>
                            <OutlinedInputFiled
                              id="input-postal-code"
                              label="CEP"
                              placeholder="00000-000"
                              value={state.address_id.postal_code}
                              onChange={(element) => setState({ ...state, address_id: { ...state.address_id, postal_code: element.target.value } })}
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

                        <Grid item md={9} xs={12}>
                          <TextField
                            id="input-address"
                            label="Endereço"
                            variant="outlined"
                            size="small"
                            value={state.address_id.street}
                            onChange={(element) => setState({ ...state, address_id: { ...state.address_id, street: element.target.value } })}
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={2} xs={12}>
                          <TextField
                            id="input-address-number"
                            label="Número"
                            variant="outlined"
                            size="small"
                            value={state.address_id.number}
                            onChange={(element) => setState({ ...state, address_id: { ...state.address_id, number: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={7} xs={12}>
                          <TextField
                            id="input-address-complement"
                            label="Complemento"
                            variant="outlined"
                            size="small"
                            value={state.address_id.complement}
                            onChange={(element) => setState({ ...state, address_id: { ...state.address_id, complement: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={3} xs={12}>
                          <TextField
                            id="input-neighborhood"
                            label="Bairro"
                            variant="outlined"
                            size="small"
                            value={state.address_id.district}
                            onChange={(element) => setState({ ...state, address_id: { ...state.address_id, district: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={4} xs={12}>
                          <TextField
                            id="input-city"
                            label="Cidade"
                            variant="outlined"
                            size="small"
                            value={state.address_id.city}
                            onChange={(element) => setState({ ...state, address_id: { ...state.address_id, city: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={1} xs={12}>
                          <TextField
                            id="input-address-uf"
                            label="UF"
                            variant="outlined"
                            size="small"
                            value={state.address_id.state}
                            onChange={(element) => setState({ ...state, address_id: { ...state.address_id, state: element.target.value } })}
                            fullWidth
                          />
                        </Grid>

                        <Grid item md={7} xs={12}>
                          <Autocomplete
                            id="combo-box-areas"
                            options={areaState.list.data}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Área" variant="outlined" />}
                            size="small"
                            onChange={(element, value) => setState({ ...state, area_id: value?._id })}
                            getOptionSelected={(option, value) => option._id === state?.area_id}
                            // value={state?.area_id}
                            noOptionsText="Nenhum resultado encontrado"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item md={6} xs={12}>
                          <TextField
                            id="input-email"
                            label="E-mail"
                            variant="outlined"
                            size="small"
                            value={state.email}
                            onChange={(element) => setState({ ...state, email: element.target.value })}
                            type="email"
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <TextField
                            id="input-phone"
                            label="Telefone Residencial"
                            variant="outlined"
                            size="small"
                            value={state.phones[0]?.number}
                            onChange={(element) => {
                              setState(prevState => ({
                                ...prevState,
                                phones: [{
                                  ...prevState.phones[0],
                                  number: element.target.value
                                }]
                              }));
                            }}
                            placeholder="0000-0000"
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={3} xs={12}>
                          <TextField
                            id="input-cellphone"
                            label="Celular"
                            variant="outlined"
                            size="small"
                            value={state.phones[0]?.cellnumber}
                            onChange={(element) => {
                              setState(prevState => ({
                                ...prevState,
                                phones: [{
                                  ...prevState.phones[0],
                                  cellnumber: element.target.value
                                }]
                              }));
                            }}
                            placeholder="00000-0000"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </FormGroupSection>
                    <FormGroupSection>
                      <Grid container>
                        <Grid item md={8} xs={12}>
                          <TextField
                            id="input-responsible-name"
                            label="Nome do responsável"
                            variant="outlined"
                            size="small"
                            value={state.responsable?.name}
                            onChange={(element) => setState({ ...state, responsable: { ...state.responsable, name: element.target.value } })}
                            placeholder=""
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={4} xs={6}>
                          <TextField
                            id="input-responsible-phone"
                            label="Telefone do responsável"
                            variant="outlined"
                            size="small"
                            value={state.responsable?.phone}
                            onChange={(element) => setState({ ...state, responsable: { ...state.responsable, phone: element.target.value } })}
                            placeholder=""
                            fullWidth
                          />
                        </Grid>
                        <Grid item md={4} xs={6}>
                          <TextField
                            id="input-responsible"
                            label="Parentesco"
                            variant="outlined"
                            size="small"
                            value={state.responsable?.relationship}
                            onChange={(element) => setState({ ...state, responsable: { ...state.responsable, relationship: element.target.value } })}
                            placeholder=""
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </FormGroupSection>
                    {params.id && (
                      <FormGroupSection>
                        <Grid item md={3} xs={6}>
                          <FormControlLabel control={<Switch checked={state.active} onChange={(event) => {
                            setState(prevState => ({
                              ...prevState,
                              active: event.target.checked
                            }))
                          }} />} label="Ativo?" />
                        </Grid>
                      </FormGroupSection>
                    )}
                  </FormContent>
                </FormSection>
              </BoxCustom>
              <ButtonsContent>
                <ButtonComponent background="secondary" variant="outlined" onClick={() => patientState.success ? history.push('/patient') : handleOpenModalCancel()}>
                  Voltar
            </ButtonComponent>
                <ButtonComponent background="success" onClick={handleSaveFormPatient}>
                  Salvar
            </ButtonComponent>
              </ButtonsContent>
            </TabPanel>
          </Container>
        )
      }


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
