import React, { useState, useEffect, useCallback, ChangeEvent, ReactNode } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AreaInterface, UserAreaInterface, NeighborhoodAreaInterface } from '../../../store/ducks/areas/types';
import { loadRequest } from '../../../store/ducks/areas/actions';
import { ApplicationState } from '../../../store';

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
  const areaState = useSelector((state: ApplicationState) => state.areas).data;

  const neighborhoods = [
    { id: '1', name: 'bairro 1' },
    { id: '2', name: 'bairro 2' },
  ];
  const users = [
    { id: '1', name: 'user 1' },
    { id: '2', name: 'user 2' },
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

  const [value, setValue] = useState(0);

  const handleChange = useCallback((event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }, [value]);

  const [state, setState] = useState<IFormFields>({
    id: props.match.params.id || '',
    description: '',
    supplyDay: 0,
    dayOfTheWeek: 0,
    users: [],
    neighborhoods: [],
    active: true
  });

  const [currentTab, setCurrentTab] = useState(0);
  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
  }, [currentTab]);

  const [openModalCancel, setOpenModalCancel] = useState(false);

  useEffect(() => {
    dispatch(loadRequest());
    setState({ ...state, ...areaState })
  }, [dispatch]);

  function handleSaveFormCustomer() {
  }

  function handleOpenModalCancel() {
    setOpenModalCancel(true);
  }

  function handleCloseModalCancel() {
    setOpenModalCancel(false);
  }

  function handleCancelForm() {
    setOpenModalCancel(false);
    // history.back();
  }

  function handleChangeSupply(value: any) {
    setState(prevState => ({
      ...prevState,
      supplyDay: value
    }))
  }

  const handleDayOfTheWeek = useCallback((event: any, newValue: any) => {
    setState(prevState => ({
      ...prevState,
      dayOfTheWeek: event.target.value,
      form: {
        ...prevState.form,
        dayOfTheWeek: newValue,
      }
    }));
  }, [state.dayOfTheWeek]);

  // Bairros
  function handleSelectNeighborhood(value: NeighborhoodAreaInterface) {
    setState(prevState => ({
      ...prevState,
      neighborhoods: [...prevState.neighborhoods, value]
    }));
  }

  function handleDeleteNeighborhood(neighborhood: NeighborhoodAreaInterface) {
    let neighborhoodsSelected = [...state.neighborhoods];
    const neighborhoodFounded = neighborhoodsSelected.findIndex((item: any) => {
      return neighborhood.id === item.id
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
      return user.id === item.id
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
                    {state?.id && (
                      <Grid item md={12} xs={12}>
                        <FormGroupSection>
                          <TextField
                            id="input-customer-id"
                            label="ID"
                            variant="outlined"
                            size="small"
                            value={state.id}
                            fullWidth
                            disabled
                          />
                        </FormGroupSection>
                      </Grid>
                    )}
                    <Grid item md={12} xs={12}>
                      <FormGroupSection>
                        <TextField
                          id="input-social-name"
                          label="Descrição"
                          variant="outlined"
                          size="small"
                          value={state.description}
                          onChange={(element) => setState(prevState => ({ ...prevState, description: element.target.value }))}
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
                            defaultValue={state.supplyDay || 0}
                            getAriaValueText={value => `${value}°C`}
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
                          id="combo-box-demo"
                          options={daysOfTheWeek}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Dia da semana" variant="outlined" />}
                          value={state.form?.dayOfTheWeek}
                          getOptionSelected={(option, value) => option.id === state.dayOfTheWeek}
                          onChange={(event: any, newValue) => {
                            handleDayOfTheWeek(event, newValue);
                          }}
                          size="small"
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    {/* {state?.id && ( */}
                    <Grid item md={12} xs={12}>
                      <FormControlLabel control={<Switch checked={state.active} onChange={(event) => {
                        setState(prevState => ({
                          ...prevState,
                          active: event.target.checked
                        }))
                      }} />} label="Ativo?" />
                    </Grid>
                    {/* )} */}
                  </Grid>

                </TabBodyItem>
                <TabBodyItem className={currentTab === 1 ? 'show' : ''}>
                  <Grid container>
                    <Grid item md={5} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-demo"
                          options={neighborhoods}
                          getOptionLabel={(option) => option.name}
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
                          id="combo-box-demo"
                          options={users}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Prestador" variant="outlined" />}
                          size="small"
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectUser(value)
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
            <Button variant="contained" background="success" onClick={() => handleSaveFormCustomer()}>
              Salvar
					</Button>
          </ButtonsContent>
        </FormSection>
      </Container >
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
    </Sidebar >
  );
}
