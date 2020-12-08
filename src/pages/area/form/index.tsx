import React, { useState, useEffect, useCallback, ChangeEvent, ReactNode } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { AreaInterface, UserAreaInterface, NeighborhoodAreaInterface } from '../../../store/ducks/areas/types';
import { loadRequest, loadAreaById, updateAreaRequest, createAreaRequest, loadGetDistricts as getDistrictsAction } from '../../../store/ducks/areas/actions';
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
  FormControlLabel,
  Grid,
  Tabs,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Loading from '../../../components/Loading';
import Sidebar from '../../../components/Sidebar';
import { FormTitle } from '../../../styles/components/Form';
import Button from '../../../styles/components/Button';
import { ChipComponent as Chip } from '../../../styles/components/Chip';
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
    dayOfTheWeek: { id: number, name: string } | null,
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
  const areaState = useSelector((state: ApplicationState) => state.areas);
  const userState = useSelector((state: ApplicationState) => state.users);

  const { params } = props.match;

  const neighborhoods = [
    { _id: '1', name: 'bairro 1' },
    { _id: '2', name: 'bairro 2' },
  ];
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
    supply_days: 0,
    week_day: 0,
    users: [],
    neighborhoods: [],
    created_by: { _id: '5fb81e21c7921937fdb79994' },
    active: true
  });

  const [currentTab, setCurrentTab] = useState(0);

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

    dispatch(getUsersAction());
    dispatch(getDistrictsAction());
  }, [dispatch]);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      ...areaState.data
    }));

  }, [areaState]);

  function handleSaveFormArea() {
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
      supply_days: value
    }))
  }

  const handleDayOfTheWeek = useCallback((event: any, newValue: any) => {
    setState(prevState => ({
      ...prevState,
      week_day: newValue.id,
      form: {
        ...prevState.form,
        dayOfTheWeek: newValue,
      }
    }));
  }, [state.week_day]);

  // Bairros
  function handleSelectNeighborhood(value: any) {

    console.log('value', value);

    setState(prevState => ({
      ...prevState,
      neighborhoods: [...prevState.neighborhoods, { _id: value.id, name: value.nome }]
    }));
  }

  function handleDeleteNeighborhood(neighborhood: NeighborhoodAreaInterface) {
    let neighborhoodsSelected = [...state.neighborhoods];
    const neighborhoodFounded = neighborhoodsSelected.findIndex((item: any) => {
      return neighborhood._id === item.id
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
  function handleSelectUser(value: UserAreaInterface) {
    setState(prevState => ({
      ...prevState,
      users: [...prevState.users, value]
    }));
  }

  function handleDeleteUser(user: UserAreaInterface) {
    let usersSelected = [...state.users];
    const userFounded = usersSelected.findIndex((item: any) => {
      return user._id === item._id
    });

    if (userFounded > -1) {
      usersSelected.splice(userFounded, 1);
    };

    setState(prevState => ({
      ...prevState,
      users: usersSelected
    }))
  }

  return (
    <Sidebar>
      {areaState.loading && <Loading />}
      {console.log(areaState.districts)}
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
                          id="input-name"
                          label="Nome"
                          variant="outlined"
                          size="small"
                          value={state.name}
                          onChange={(element) => setState(prevState => ({ ...prevState, name: element.target.value }))}
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <FormGroupSection>
                        <p>Abastecimento/dias</p>
                        <div style={{ paddingLeft: 10 }}>
                          <Slider
                            marks={supplyIntervals}
                            value={state.supply_days}
                            defaultValue={0}
                            getAriaValueText={value => `${value}`}
                            aria-labelledby="discrete-slider-restrict"
                            step={null}
                            min={7}
                            max={70}
                            valueLabelDisplay="auto"
                            onChange={(event, value) => handleChangeSupply(value)}
                          />
                        </div>
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={5}>
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-day-of-week"
                          options={daysOfTheWeek}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Dia da semana" variant="outlined" />}
                          value={state.form?.dayOfTheWeek ?? null}
                          getOptionSelected={(option, value) => option.id === state.week_day}
                          onChange={(event: any, newValue) => {
                            handleDayOfTheWeek(event, newValue);
                          }}
                          size="small"
                          fullWidth
                        />
                      </FormGroupSection>
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

                </TabBodyItem>
                <TabBodyItem className={currentTab === 1 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={5} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-neigthborhoods"
                          options={areaState.districts}
                          getOptionLabel={(option) => `${option.municipio.microrregiao.mesorregiao.UF.sigla} - ${option.nome}`}
                          renderInput={(params) => <TextField {...params} label="Bairros" variant="outlined" />}
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
                      {state.neighborhoods.map((item: any, index) => (
                        <Chip
                          key={`neighborhook_selected_${index}`}
                          label={item.name}
                          onDelete={event => handleDeleteNeighborhood(item)}
                        />
                      ))}
                    </Grid>
                  </Grid>
                </TabBodyItem>
                <TabBodyItem className={currentTab === 2 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={5} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-users"
                          options={userState.list}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Prestador" variant="outlined" />}
                          size="small"
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectUser({ _id: value._id, name: value.name })
                            }
                          }}
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      {state.users.map((item: any, index) => (
                        <div key={`user_selected_${index}`}>
                          <Chip
                            label={item.name}
                            onDelete={event => handleDeleteUser(item)}
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
            <Button variant="outlined" background="default" onClick={() => handleOpenModalCancel()}>
              Cancelar
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
