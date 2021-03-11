import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import debounce from 'lodash.debounce';
import validator from 'validator';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { AreaInterface, UserAreaInterface, NeighborhoodAreaInterface } from '../../../store/ducks/areas/types';
import { loadRequest, loadAreaById, updateAreaRequest, createAreaRequest, loadGetDistricts as getDistrictsAction } from '../../../store/ducks/areas/actions';

import { ProfessionUserInterface } from '../../../store/ducks/users/types';
import { loadRequest as getUsersAction, loadProfessionsRequest as getProfessionsAction, searchRequest as searchUserAction } from '../../../store/ducks/users/actions';

import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Badge,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Tabs,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import { ChipComponent as Chip, ChipList } from '../../../styles/components/Chip';
import { SliderComponent as Slider } from '../../../styles/components/Slider';
import { SwitchComponent as Switch } from '../../../styles/components/Switch';
import { TabContent, TabNav, TabNavItem, TabBody, TabBodyItem } from '../../../styles/components/Tabs';

import {
  ButtonsContent,
  FormSection,
  FormContent,
  InputFiled as TextField,
  FormGroupSection
} from './styles';

interface IFormFields extends AreaInterface {
  form?: {
    dayOfTheWeek?: { id: number, name: string } | null;
    state?: string;
    profession_id?: string;
    professions?: any[];
    neighborhoods?: any[];
    user_id?: any;
  }
}

interface IPageParams {
  id?: string;
}
interface BigObject<T> {
  [index: string]: T
}

export default function AreaForm(props: RouteComponentProps<IPageParams>) {
  const history = useHistory();
  const dispatch = useDispatch();
  const areaState = useSelector((state: ApplicationState) => state.areas);
  const userState = useSelector((state: ApplicationState) => state.users);

  const { params } = props.match;

  const daysOfTheWeek = [
    { id: 0, name: 'Domingo' },
    { id: 1, name: 'Segunda-Feira' },
    { id: 2, name: 'Terça-Feira' },
    { id: 3, name: 'Quarta-Feira' },
    { id: 4, name: 'Quinta-Feira' },
    { id: 5, name: 'Sexta-Feira' },
    { id: 6, name: 'Sábado' },
  ];
  const supplyIntervals = [
    { value: 1, label: '1' },
    { value: 7, label: '7' },
    { value: 14, label: '14' },
    { value: 21, label: '21' },
    { value: 28, label: '28' },
    { value: 35, label: '35' },
    { value: 42, label: '42' },
    { value: 49, label: '49' },
    { value: 56, label: '56' },
    { value: 63, label: '63' },
    { value: 70, label: '70' },
  ];

  const [state, setState] = useState<IFormFields>({
    name: '',
    describe: '',
    supply_days: 1,
    week_day: 0,
    users: [],
    neighborhoods: [],
    created_by: { _id: '5fb81e21c7921937fdb79994' },
    active: true
  });
  const [fieldsValidation, setFieldValidations] = useState<any>({
    name: false,
    supply_days: true,
    week_day: true,
    users: true,
    neighborhoods: true,
  });
  const [users, setUsers] = useState<any[]>([]);

  const [currentTab, setCurrentTab] = useState(0);

  const debounceSearchLocations = debounce(handleLocations, 900);

  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
  }, [currentTab]);

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    if (params.id) {
      dispatch(loadAreaById(params.id));

      const dayOfTheWeekSelected = daysOfTheWeek.find(day => day.id === areaState.data.week_day) || null;

      setState(prevState => ({ ...prevState, ...areaState.data, form: { dayOfTheWeek: dayOfTheWeekSelected } }))
    } else {
      dispatch(loadRequest());
    }

    dispatch(getDistrictsAction());
    dispatch(getProfessionsAction());
  }, [dispatch]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...areaState.data
    }));

    if (areaState.success) {
      history.push('/area');
    }

    // Força o validador em 'true' quando entrar na tela para editar
    if (params?.id) {
      setFieldValidations({
        name: true,
        supply_days: true,
        week_day: true,
        users: true,
        neighborhoods: true,
      })
    }

  }, [areaState]);

  useEffect(() => {
    setUsers(userState.list.data);
  }, [userState.list.data]);

  const handleValidateFields = useCallback(() => {
    let isValid: boolean = true;

    for (let key of Object.keys(fieldsValidation)) {
      if (!fieldsValidation[key]) {
        isValid = false;
      }
    }

    return isValid;

  }, [fieldsValidation, state]);

  function handleLocations(name: string) {
    dispatch(getDistrictsAction(name));
  }

  function handleSaveFormArea() {

    if (!handleValidateFields()) {
      toast.error('Existem campos que precisam ser preenchidos para continuar');
      return;
    }

    if (state?._id) {
      dispatch(updateAreaRequest(state));
    } else {
      dispatch(createAreaRequest(state));
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
    history.push(`/area`);
  }

  function handleChangeSupply(value: any) {
    setState(prevState => ({
      ...prevState,
      supply_days: value,
      week_day: (value === 1) ? -1 : prevState.week_day
    }));

    setFieldValidations((prevState: any) => ({ ...prevState, week_day: !(value >= 1 && state.week_day === 0) }))
  }

  const handleDayOfTheWeek = useCallback((event: any, newValue: any) => {
    setState(prevState => ({
      ...prevState,
      week_day: newValue?.id || null,
      form: {
        ...prevState.form,
        dayOfTheWeek: newValue,
      }
    }));
  }, [state.week_day]);

  // Bairros
  function handleSelectDistrict(value: any) {

    const { neighborhoods, state } = value;

    setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        state,
        neighborhoods,
      }
    }));
  }

  function handleSelectNeighborhood(value: any) {
    setState(prevState => ({
      ...prevState,
      neighborhoods: [...prevState.neighborhoods, value]
    }));
  }

  function handleDeleteNeighborhood(neighborhood: NeighborhoodAreaInterface) {
    let neighborhoodsSelected = [...state.neighborhoods];
    const neighborhoodFounded = neighborhoodsSelected.findIndex((item: any) => {
      return neighborhood._id === item._id
    });

    if (neighborhoodFounded > -1) {
      neighborhoodsSelected.splice(neighborhoodFounded, 1);
    };

    setState(prevState => ({
      ...prevState,
      neighborhoods: neighborhoodsSelected
    }))
  }

  // Prestadores
  const handleSelectProfession = useCallback((value: ProfessionUserInterface) => {
    setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        profession_id: value._id
      }
    }));

    dispatch(searchUserAction({ profession_id: value._id }));
  }, [state]);

  const selectProfession = useCallback(() => {
    if (!userState.data.professions) {
      return null;
    }

    const selected = userState.data.professions.filter(item => item._id === state.form?.profession_id);

    return (selected[0]) ? selected[0] : null;
  }, [state, userState.data.professions]);

  const handleSelectUser = useCallback((value: UserAreaInterface) => {
    setState(prevState => ({
      ...prevState,
      users: [...prevState.users, value],
      form: {
        ...prevState.form,
        user_id: null,
      }
    }));

    let usersCopy = [...users];

    const userIndex = usersCopy.findIndex(item => item._id === value._id);

    if (userIndex > -1) {
      usersCopy.splice(userIndex, 1);
      setUsers(usersCopy);
    }

  }, [users]);

  const handleDeleteUser = useCallback((user: UserAreaInterface) => {
    let usersSelected = [...state.users];

    const userFounded = usersSelected.findIndex((item: any) => {
      return user._id === item._id
    });

    if (userFounded > -1) {
      const userData = usersSelected.find((item: any) => {
        return user._id === item._id
      });

      let usersCopy = [...users];
      usersCopy.push(userData);
      setUsers(usersCopy);

      usersSelected.splice(userFounded, 1);

      setState(prevState => ({
        ...prevState,
        users: usersSelected
      }));
    }
  }, [state.users]);

  return (
    <Sidebar>
      {areaState.loading && <Loading />}
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Área</FormTitle>
            <TabContent>
              <TabNav>
                <TabNavItem className={currentTab === 0 ? 'active' : ''} onClick={() => selectTab(0)}>
                  Dados da Área
                </TabNavItem>
                <TabNavItem className={currentTab === 1 ? 'active' : ''} onClick={() => selectTab(1)}>
                  <Badge badgeContent={state.neighborhoods.length} max={99} color="primary">
                    {`Bairros`}
                  </Badge>
                </TabNavItem>
                <TabNavItem className={currentTab === 2 ? 'active' : ''} onClick={() => selectTab(2)}>
                  <Badge badgeContent={state.users.length} max={99} color="primary">
                    {`Prestadores`}
                  </Badge>
                </TabNavItem>
              </TabNav>
              <TabBody>
                <TabBodyItem className={currentTab === 0 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={12} xs={12}>
                      <FormGroupSection>
                        <TextField
                          id="input-area-name"
                          label="Nome"
                          variant="outlined"
                          size="small"
                          value={state.name}
                          onChange={(element) => {
                            setState(prevState => ({ ...prevState, name: element.target.value }));
                            setFieldValidations((prevState: any) => ({ ...prevState, name: !validator.isEmpty(element.target.value) }));
                          }}
                          error={!fieldsValidation.name}
                          helperText={!fieldsValidation.name ? `Por favor, insira um nome para a área.` : null}
                          autoComplete="new-password"
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={7} sm={10} xs={12}>
                      <FormGroupSection error>
                        <p>Abastecimento/dias</p>
                        <div style={{ paddingLeft: 10 }}>
                          <Slider
                            marks={supplyIntervals}
                            value={state.supply_days}
                            defaultValue={1}
                            getAriaValueText={value => `${value}`}
                            aria-labelledby="discrete-slider-restrict"
                            step={null}
                            min={1}
                            max={70}
                            valueLabelDisplay="auto"
                            onChange={(event, value) => handleChangeSupply(value)}
                          />
                        </div>
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={5}>
                    </Grid>
                    {state.supply_days > 1 && (
                      <Grid item md={4} sm={6} xs={12}>
                        <FormGroupSection error>
                          <Autocomplete
                            id="combo-box-day-of-week"
                            size="small"
                            autoComplete={false}
                            options={daysOfTheWeek}
                            getOptionLabel={(option) => option.name}
                            value={state.form?.dayOfTheWeek ?? null}
                            getOptionSelected={(option, value) => option.id === state.week_day}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Dia da semana"
                                variant="outlined"
                                autoComplete="new-password"
                                error={!fieldsValidation.week_day}
                              />
                            )}
                            onChange={(event: any, newValue) => {
                              handleDayOfTheWeek(event, newValue);
                              setFieldValidations((prevState: any) => ({ ...prevState, week_day: !validator.isEmpty(newValue?.name || '') }));
                            }}
                            fullWidth
                          />
                          {!fieldsValidation.week_day && <FormHelperText>Selecione um dia da semana</FormHelperText>}
                        </FormGroupSection>
                      </Grid>
                    )}
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

                </TabBodyItem>
                <TabBodyItem className={currentTab === 1 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={12} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-district"
                          options={areaState.districts?.data || []}
                          getOptionLabel={(option) => `${option.state} - ${option.name}`}
                          renderInput={(params) => <TextField {...params} label="Cidades" variant="outlined" autoComplete="new-password" />}
                          size="small"
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectDistrict(value)
                            }
                          }}
                          onInputChange={(event, value) => debounceSearchLocations(value)}
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-neigthborhoods"
                          options={state.form?.neighborhoods || []}
                          getOptionLabel={(option) => `${option.name}`}
                          renderInput={(params) => <TextField {...params} label="Bairros" variant="outlined" autoComplete="new-password" />}
                          size="small"
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectNeighborhood(value)
                            }
                          }}
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <ChipList>
                        {state.neighborhoods.map((item: any, index) => (
                          <Chip
                            key={`neighborhook_selected_${index}`}
                            label={item.name}
                            onDelete={event => handleDeleteNeighborhood(item)}
                          />
                        ))}
                      </ChipList>
                    </Grid>
                  </Grid>
                </TabBodyItem>
                <TabBodyItem className={currentTab === 2 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={12} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-profession"
                          options={userState.data.professions || []}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Função" variant="outlined" autoComplete="new-password" />}
                          getOptionSelected={(option, value) => option._id === state.form?.profession_id}
                          value={selectProfession()}
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectProfession(value)
                            }
                          }}
                          size="small"
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-area-users"
                          options={users}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Prestador" variant="outlined" autoComplete="new-password" />}
                          size="small"
                          value={state.form?.user_id}
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectUser({ _id: value._id || '', name: value.name })
                            }
                          }}
                          disabled={!state.form?.profession_id}
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <ChipList>
                        {state.users.map((item: any, index) => (
                          <div key={`user_selected_${index}`}>
                            <Chip
                              label={item.name}
                              onDelete={event => handleDeleteUser(item)}
                            />
                          </div>
                        ))}
                      </ChipList>
                    </Grid>
                  </Grid>

                </TabBodyItem>
              </TabBody>
            </TabContent>
          </FormContent>

          <ButtonsContent>
            <Button variant="outlined" background="default" onClick={() => handleOpenModalCancel()}>
              Voltar
              </Button>
            <Button variant="contained" background="success" onClick={() => handleSaveFormArea()}>
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
