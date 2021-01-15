import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createPatientRequest, updatePatientRequest, getAddress as getAddressAction, loadPatientById } from '../../../store/ducks/patients/actions';
import { PatientInterface } from '../../../store/ducks/patients/types';

import { ApplicationState } from '../../../store';

import Loading from '../../../components/Loading';

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
  RadioGroup,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DayJsUtils from '@date-io/dayjs';

import Sidebar from '../../../components/Sidebar';
import { FormTitle, SelectComponent as Select } from '../../../styles/components/Form';
import { SwitchComponent as Switch } from '../../../styles/components/Switch';

import { formatDate } from '../../../helpers/date';
import { bloodTypes } from '../../../helpers/patient';

import DatePicker from '../../../styles/components/DatePicker';
import ButtonComponent from '../../../styles/components/Button';

import {
  ButtonsContent,
  ButtonPrimary,
  FormSection,
  FormContent,
  InputFiled as TextField,
  OutlinedInputFiled,
  FormGroupSection
} from './styles';

interface IFormFields {
  bloodType: string | null,
  cellphone: string,
  phone: string,
}

interface IPageParams {
  id?: string;
}

export default function PatientForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const patientState = useSelector((state: ApplicationState) => state.patients);

  const { params } = props.match;

  const [state, setState] = useState<PatientInterface>({
    companies: ['5ee65a9b1a550217e4a8c0f4'], //empresa que vai vir do login
    name: '',
    social_name: '',
    birthdate: '',
    gender: '',
    mother_name: '',
    profession: '',
    nationality: '',
    naturalness: '',
    marital_status: '',
    fiscal_number: '',
    national_id: '',
    issuing_organ: '',
    address_id: {
      postal_code: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: '',
    },
    email: '',
    phones: [],
    sus_card: '',
    blood_type: '',
    organ_donor: false,
    active: true,
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
    if (params.id) {
      dispatch(loadPatientById(params.id));
    }
  }, [dispatch, params]);

  useEffect(() => {
    setState(prevState => {
      return {
        ...prevState,
        address_id: {
          ...patientState.data.address_id
        }
      }
    });

    setForm(prevState => ({
      ...prevState,
      phone: patientState.data.phones.find(phone => phone.cellnumber)?.cellnumber || '',
      cellphone: patientState.data.phones.find(phone => phone.number)?.number || '',
    }));

  }, [patientState]);

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
        { whatsapp: false, telegram: false, number: form.phone },
        { whatsapp: false, telegram: false, cellnumber: form.cellphone },
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
      {console.log(patientState)}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Paciente</FormTitle>

            <FormGroupSection>
              <Grid container>
                <Grid item md={12} xs={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Tipo do Cadastro</FormLabel>
                    <RadioGroup row aria-label="registry-type" name="registry-type" value={type} onChange={handleChangeRegistryType}>
                      <FormControlLabel value="register" control={<Radio color="primary" />} label="Cadastro" />
                      <FormControlLabel value="capture" control={<Radio color="primary" />} label="Captação" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
            </FormGroupSection>
            <FormGroupSection>
              <Grid container>
                <Grid item md={12} xs={12}>
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
                <Grid item md={12} xs={12}>
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

                <Grid item md={2} xs={12}>
                  <DatePicker
                    id="input-fiscal-birthdate"
                    label="Data de Nascimento"
                    value={state.birthdate.length > 10 ? formatDate(state.birthdate, 'YYYY-MM-DD') : state.birthdate}
                    onChange={(element) => setState({ ...state, birthdate: element.target.value })}
                    fullWidth
                  />
                </Grid>

                <Grid item md={2} xs={12}>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel id="select-patient-gender">Sexo</InputLabel>
                    <Select
                      labelId="select-patient-gender"
                      id="demo-simple-select-filled"
                      value={state.gender}
                      onChange={(element) => setState({ ...state, gender: `${element.target.value}` || '' })}
                      labelWidth={40}
                    >
                      <MenuItem value="">
                        <em>&nbsp;</em>
                      </MenuItem>
                      {genders.map(gender => <MenuItem key={`gender_${gender}`} value={gender}>{gender}</MenuItem>)}
                    </Select>
                  </FormControl>
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
              </Grid>
              <Grid container>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="input-profession"
                    label="Profissão"
                    variant="outlined"
                    size="small"
                    value={state.profession}
                    onChange={(element) => setState({ ...state, profession: element.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    id="input-matrial-status"
                    label="Estado Civil"
                    variant="outlined"
                    size="small"
                    value={state.marital_status}
                    onChange={(element) => setState({ ...state, marital_status: element.target.value })}
                    fullWidth
                  />
                </Grid>
                <Grid item md={2} xs={12}>
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
                <Grid item md={2} xs={12}>
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

                <Grid item md={2} xs={12}>
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

                <Grid item md={2} xs={12}>
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

                <Grid item md={2} xs={12}>
                  <TextField
                    id="input-naturalness"
                    label="Naturalidade"
                    variant="outlined"
                    size="small"
                    value={state.naturalness}
                    onChange={(element) => setState({ ...state, naturalness: element.target.value })}
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

                <Grid item md={8} xs={12}>
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

                <Grid item md={3} xs={12}>
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

                <Grid item md={5} xs={12}>
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
              </Grid>
            </FormGroupSection>
            <FormGroupSection>
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
                <Grid item md={2} xs={12}>
                  <TextField
                    id="input-phone"
                    label="Telefone"
                    variant="outlined"
                    size="small"
                    value={form.phone}
                    onChange={(element) => {
                      setForm(prevState => ({
                        ...prevState,
                        phone: element.target.value
                      }));
                    }}
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
                    value={form.cellphone}
                    onChange={(element) => {
                      setForm(prevState => ({
                        ...prevState,
                        cellphone: element.target.value
                      }));

                      console.log('form', form);
                    }}
                    placeholder="00000-0000"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item md={3} xs={12}>
                  <TextField
                    id="input-health-national-card"
                    label="Cartão nacional de saúde"
                    variant="outlined"
                    size="small"
                    value={state.sus_card}
                    onChange={(element) => setState({ ...state, sus_card: element.target.value })}
                    placeholder="00000-0000"
                    fullWidth
                  />
                </Grid>
                <Grid item md={2} xs={6}>
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
                      fullWidth
                    />
                  </FormGroupSection>
                </Grid>
                <Grid item md={3} xs={6}>
                  <FormControlLabel control={<Switch checked={state.organ_donor} onChange={(event) => {
                    setState(prevState => ({
                      ...prevState,
                      organ_donor: event.target.checked
                    }))
                  }} />} label="Doador de Órgãos?" />
                </Grid>

                {state?._id && (
                  <Grid item xs={12} md={12}>
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

            {type === 'capture' && (
              <FormGroupSection>
                <Grid container>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="input-clinical-condition"
                      label="Quadro Clínico"
                      variant="outlined"
                      size="small"
                      // value={state.address.state}
                      // onChange={(element) => setState({ ...state, address: { ...state.address, state: element.target.value } })}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="input-tracheal-aspirations"
                      label="Aspirações Traqueais"
                      variant="outlined"
                      size="small"
                      // value={state.address.state}
                      // onChange={(element) => setState({ ...state, address: { ...state.address, state: element.target.value } })}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      id="input-equipaments"
                      label="Sondas/Drenos/Cateteres/Ostomia"
                      variant="outlined"
                      size="small"
                      // value={state.address.state}
                      // onChange={(element) => setState({ ...state, address: { ...state.address, state: element.target.value } })}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      id="input-invasive-technical-procedures"
                      label="Procedimento técnicos invasivos"
                      variant="outlined"
                      size="small"
                      // value={state.address.state}
                      // onChange={(element) => setState({ ...state, address: { ...state.address, state: element.target.value } })}
                      fullWidth
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      id="input-breathing-pattern"
                      label="Padrão respiratório"
                      variant="outlined"
                      size="small"
                      // value={state.address.state}
                      // onChange={(element) => setState({ ...state, address: { ...state.address, state: element.target.value } })}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </FormGroupSection>
            )}
          </FormContent>
          <ButtonsContent>
            <ButtonComponent background="default" onClick={() => patientState.success ? history.push('/patient') : handleOpenModalCancel()}>
              Voltar
            </ButtonComponent>
            <ButtonComponent background="primary" onClick={handleSaveFormPatient}>
              Salvar
            </ButtonComponent>
          </ButtonsContent>
        </FormSection>
      </Container>

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
