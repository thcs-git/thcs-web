import React, { useState, useEffect, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { createUserRequest, updateUserRequest, getAddress as getAddressAction, loadUserById } from '../../../store/ducks/users/actions';
import { UserInterface } from '../../../store/ducks/users/types';

import { loadRequest as getSpecialtiesAction } from '../../../store/ducks/specialties/actions';
import { SpecialtyInterface } from '../../../store/ducks/specialties/types';

import { loadRequest as getCouncilsAction } from '../../../store/ducks/councils/actions';
import { CouncilInterface } from '../../../store/ducks/councils/types';

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
  InputLabel,
  InputAdornment,
  MenuItem,
  Snackbar,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DayJsUtils from '@date-io/dayjs';

import Alert from '../../../components/Alert';
import Sidebar from '../../../components/Sidebar';
import { FormTitle, SelectComponent as Select } from '../../../styles/components/Form';
import { SwitchComponent as Switch } from '../../../styles/components/Switch';
import { ChipComponent as Chip } from '../../../styles/components/Chip';

import { formatDate } from '../../../helpers/date';

import DatePicker from '../../../styles/components/DatePicker';
import { TabContent, TabNav, TabNavItem, TabBody, TabBodyItem } from '../../../styles/components/Tabs';
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
  userType: { id: string, description: string } | null,
  council: CouncilInterface | null,
}

interface IPageParams {
  id?: string;
}

export default function UserForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state: ApplicationState) => state.users);
  const specialtyState = useSelector((state: ApplicationState) => state.specialties);
  const councilState = useSelector((state: ApplicationState) => state.councils);

  const { params } = props.match;

  const [currentTab, setCurrentTab] = useState(0);

  const [state, setState] = useState<UserInterface>({
    companies: ['5ee65a9b1a550217e4a8c0f4'], //empresa que vai vir do login
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
    council_number: '',
    active: true,
  });

  const [form, setForm] = useState<IFormFields>({
    userType: null,
    council: null,
  });

  const genders = ['Masculino', 'Feminino', 'Indefinido'];
  const userTypes = [{ id: '1', description: 'Medico' }, { id: '1', description: 'Enfermeiro' }, { id: '1', description: 'Administrativo' }];

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(getSpecialtiesAction())
    dispatch(getCouncilsAction())
  }, []);

  useEffect(() => {
    if (params.id) {
      dispatch(loadUserById(params.id))
    }
  }, [params]);

  useEffect(() => {
    setState(prevState => ({
      ...userState.data
    }));
  }, [userState]);

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (userState.error) {
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
  }, [userState.data.address]);

  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
  }, [currentTab]);

  const handleUserType = useCallback((event: any, newValue: any) => {
    setForm(prevState => ({
      ...prevState,
      userType: newValue,
    }));
  }, [state.user_type_id]);

  const handleCouncil = useCallback((event: any, newValue: any) => {
    setForm(prevState => ({
      ...prevState,
      council_id: newValue,
    }));

    setState(prevState => ({
      ...prevState,
      council_id: newValue
    }));

  }, [state.council_id]);

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
    history.push(`/user`);
  }

  // Especialides
  function handleSelectEspecialty(value: SpecialtyInterface) {
    setState(prevState => ({
      ...prevState,
      specialties: [...prevState.specialties, value]
    }));
  }

  function handleDeleteEspecialty(especialty: SpecialtyInterface) {
    let specialtiesSelected = [...state.specialties];
    const especialtyFounded = specialtiesSelected.findIndex((item: any) => {
      return especialty._id === item._id
    });

    if (especialtyFounded > -1) {
      specialtiesSelected.splice(especialtyFounded, 1);
    };

    setState(prevState => ({
      ...prevState,
      specialties: specialtiesSelected
    }))
  }

  const handleSaveFormUser = useCallback(() => {
    if (state?._id) {
      dispatch(updateUserRequest(state));
    } else {
      dispatch(createUserRequest(state));
    }
  }, [state]);

  return (
    <Sidebar>
      {userState.loading && <Loading />}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Usuário</FormTitle>

            <TabContent>
              <TabNav>
                <TabNavItem className={currentTab === 0 ? 'active' : ''} onClick={() => selectTab(0)}>
                  Dados Pessoais
                </TabNavItem>
                <TabNavItem className={currentTab === 1 ? 'active' : ''} onClick={() => selectTab(1)}>
                  Especialidades
                </TabNavItem>
              </TabNav>
              <TabBody>
                <TabBodyItem className={currentTab === 0 ? 'show' : ''}>
                  <FormGroupSection>
                    <Grid container>
                      <Grid item md={12} xs={12}>
                        <TextField
                          id="input-social-name"
                          label="Nome do usuário"
                          variant="outlined"
                          size="small"
                          value={state.name}
                          onChange={(element) => setState({ ...state, name: element.target.value })}
                          fullWidth
                        />
                      </Grid>

                      <Grid item md={2} xs={12}>
                        <DatePicker
                          id="input-fiscal-birthdate"
                          label="Data de Nascimento"
                          value={state?.birthdate?.length > 10 ? formatDate(state.birthdate, 'YYYY-MM-DD') : state.birthdate}
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
                  <Grid container>
                    <Grid item md={2} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-user-type"
                          options={userTypes}
                          getOptionLabel={(option) => option.description}
                          renderInput={(params) => <TextField {...params} label="Tipo do Usuário" variant="outlined" />}
                          value={form?.userType}
                          getOptionSelected={(option, value) => option.id === form?.userType?.id}
                          onChange={(event: any, newValue) => {
                            handleUserType(event, newValue);
                          }}
                          size="small"
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-council"
                          options={councilState.list.data}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Conselho" variant="outlined" />}
                          value={userState.data?.council_id || null}
                          getOptionSelected={(option, value) => option._id === state?.council_id?._id}
                          onChange={(event: any, newValue) => {
                            handleCouncil(event, newValue);
                          }}
                          size="small"
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={2} xs={12}>
                      <TextField
                        id="input-council"
                        label="Número do Conselho"
                        variant="outlined"
                        size="small"
                        value={state.council_number}
                        onChange={(element) => setState({ ...state, council_number: element.target.value })}
                        placeholder="00000-0000"
                        fullWidth
                      />
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
                </TabBodyItem>
                <TabBodyItem className={currentTab === 1 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={5} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-especialty"
                          options={specialtyState.list.data}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Especialidade" variant="outlined" />}
                          size="small"
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectEspecialty(value)
                            }
                          }}
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      {state.specialties.map((item: any, index) => (
                        <div key={`especialty_selected_${index}`}>
                          <Chip
                            label={item.name}
                            onDelete={event => handleDeleteEspecialty(item)}
                          />
                        </div>
                      ))}
                    </Grid>
                  </Grid>
                </TabBodyItem>
              </TabBody>
            </TabContent>
          </FormContent>
          <ButtonsContent>
            <ButtonComponent background="default" onClick={() => userState.success ? history.push('/user') : handleOpenModalCancel()}>
              Cancelar
            </ButtonComponent>
            <ButtonComponent background="primary" onClick={handleSaveFormUser}>
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
