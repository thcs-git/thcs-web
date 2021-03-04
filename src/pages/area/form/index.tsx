import React, { useState, useEffect, useCallback, ChangeEvent, ReactNode } from 'react';
import { handleUserSelectedId } from './../../../helpers/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../../store';
import { AreaInterface, UserAreaInterface, NeighborhoodAreaInterface, CityAreaInterface, AreaTypes } from '../../../store/ducks/areas/types';
import { loadRequest, loadAreaById, updateAreaRequest, createAreaRequest, loadGetDistricts as getDistrictsAction, loadGetCitys as getStatesAction,loadGetDistricts_ } from '../../../store/ducks/areas/actions';
import { ProfessionInterface } from '../../../store/ducks/professions/types';
import { loadRequest as getProfessions } from '../../../store/ducks/professions/actions';
import { loadRequest as getUsersAction, loadProfessionsRequest } from '../../../store/ducks/users/actions';
import { toast } from 'react-toastify';
import { useHistory, RouteComponentProps } from 'react-router-dom';
import {
  Badge,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  makeStyles,
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
  FormGroupSection,
  FormGroupSectionCity
} from './styles';
import validateName from '../../../utils/validateName';
import Item from '../../../components/List/Item';


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
  const [inputName, setInputName ] = useState({value:"", error: false});
  const [inputDays, setInputDays] = useState({value:"", error: false});
  const [inputState, setInputState ] = useState({value:"", error: false});
  const [inputCity, setInpuCity] = useState({value:"", error: false});
  const [inputDistrict, setInputDistrict ] = useState({value:"", error: false});

  const areaState = useSelector((state: ApplicationState) => state.areas);
  const userState = useSelector((state: ApplicationState) => state.users);
  const professionState = useSelector((state: ApplicationState)=> state.profession);

  const { params } = props.match;
  const useStyles = makeStyles((theme) => ({
    register:{
      textTransform: 'capitalize',
      fontSize: '18px',
      '&:hover': {
        backgroundColor: 'var(--sucess-button-hover)',
        color:'var(--success)',
        borderColor:'var(--success-hover)',

      },
      borderColor:'var(--success)',
      color:'var(--success)',
      contrastText: "#fff"

    },
    proxim: {
      textTransform: 'capitalize',
      fontSize: '18px',
      backgroundColor: 'var(--success)',
      '&:hover': {
        backgroundColor: 'var(--success-hover)',
        color:'#ffff',
        borderColor:'var(--success-hover)'

      },
      color:"#fff",
      contrastText: "#fff",
      borderColor:'var(--success)',
    },
    cancel:{
      textTransform: 'capitalize',
      fontSize: '18px',
      '&:hover': {
        backgroundColor: 'var(--danger-hover)',
        color:'var(--danger)',
        borderColor:'var(--danger-hover)',

      },
      maxHeight:'38px',
      borderColor:'var(--danger)',
      color:'var(--danger)',
      contrastText: "#fff"
    }


  }));

  const classes = useStyles();

  //////////////////////////////  INITIAL STATE ///////////////////////////////
  const States = [
    {id:1,name:"São Paulo",sigla:'SP'},
    {id:2,name:'Paraná',sigla:'PR'},
    {id:3,name:'Santa Catarina',sigla:'SC'},
    {id:4,name:'Rio Garnde do Sul',sigla:'RS'},
    {id:5,name:'Mato Grosso do Sul',sigla:'MS'},
    {id:6,name:'Rondônia',sigla:'RO'},
    {id:7,name:'Acre',sigla:'AC'},
    {id:8,name:'Amazonas',sigla:'AM'},
    {id:9,name:'Roraima',sigla:'RR'},
    {id:10,name:'Pará',sigla:'PA'},
    {id:11,name:'Amapá',sigla:'AP'},
    {id:12,name:'Tocantins',sigla:'TO'},
    {id:13,name:'Maranhão',sigla:'MA'},
    {id:14,name:'Rio Grande do Norte',sigla:'RN'},
    {id:15,name:'Paraíba',sigla:'PB'},
    {id:16,name:'Pernambuco',sigla:'PE'},
    {id:17,name:'Alagoas',sigla:'AL'},
    {id:18,name:'Sergipe',sigla:'SE'},
    {id:19,name:'Bahia',sigla:'BA'},
    {id:20,name:'Minas Gerais',sigla:'MG'},
    {id:21,name:'Rio de Janeiro',sigla:'RJ'},
    {id:22,name:'Mato Grosso',sigla:'MT'},
    {id:23,name:'Goiás',sigla:'GO'},
    {id:24,name:'Distrito Federal',sigla:'DF'},
    {id:25,name:'Piauí',sigla:'PI'},
    {id:26,name:'Ceará',sigla:'CE'},
    {id:27,name:'Espírito Santo',sigla:'ES'}
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
    week_day: 1,
    users: [],
    districts: [],
    created_by: { _id: handleUserSelectedId()  },
    active: true
  });


  const [currentTab, setCurrentTab] = useState(0);
  let load = false;
  const selectTab = useCallback((index: number) => {
    setCurrentTab(index);
  }, [currentTab]);
  const [openModalCancel, setOpenModalCancel] = useState(false);


  useEffect(() => {
    if (params.id) {
      dispatch(loadAreaById(params.id));


      const dayOfTheWeekSelected = daysOfTheWeek.find(day => day.id === areaState.data.week_day) || null;
      setInputName(prev =>({
         ...prev,
         value:areaState.data.name
       }));
         setInputDays(prev =>({
         ...prev,
         value:dayOfTheWeekSelected?.name || ""
       }));


    } else{
      dispatch(loadRequest());
    }
    dispatch(getUsersAction());
  }, [dispatch]);

  // //////////////////////////  INITIAL STATE ///////////////////////////////

  // //////////////////////////  RELOAD /////////////////////////////////////
  useEffect(() => {
    if(params.id){
        const dayOfTheWeekSelected = daysOfTheWeek.find(day => day.id === areaState.data.week_day) || null;
    //  setInputName(prev =>({
    //     ...prev,
    //     value:areaState.data.name
    //   }));
    //     setInputDays(prev =>({
    //     ...prev,
    //     value:dayOfTheWeekSelected?.name || ""
    //   }));


    setState(prevState => ({
      ...prevState,
      ...areaState.data,
      form: { dayOfTheWeek: dayOfTheWeekSelected }
    }));
    }
  }, [areaState,params.id]);

  // //////////////////////////  RELOAD /////////////////////////////////////


 //////////////////////////////  VALIDATION  //////////////////////////////////////
  const handleNameValidator = useCallback(()=>{
    if(!validateName(inputName.value) ){
      setInputName(prev =>({
        ...prev,
        error: true
      }))
    }else{
      setInputName(prev=>({
        ...prev,
        error:false
      }));
      setState(prevState => ({ ...prevState, name: inputName.value }))
    }

  },[inputName]);

  const handleDaysValidator = useCallback(()=>{
      if(!validateName(inputDays.value)){
          setInputDays(prev =>({
          ...prev,
          error: true
        }))
      }else{
        setInputDays(prev=>({
          ...prev,
          error:false
        }));
      }
  },[inputDays]);


  const handleStateValidator = useCallback(()=>{
    if(!validateName(inputState.value)){
      setInputState(prev=>({
        ...prev,
        error:true
      }))
    }else{
      setInputState(prev=>({
        ...prev,
        error:false
      }))
    }

  },[inputState]);

  const handleCityValidator = useCallback(()=>{

    if(!validateName(inputCity.value)){
      setInpuCity(prev=>({
        ...prev,
        error:true
      }))
    }else{
      setInpuCity(prev=>({
        ...prev,
        error:false
      }))
    }

  },[inputCity]);

  const handleDistrictValidator = useCallback(()=>{
    if(!validateName(inputDistrict.value)){
      setInputDistrict(prev=>({
        ...prev,
        error:true
      }))
    }else{
      setInputDistrict(prev=>({
        ...prev,
        error:false
      }))
    }
  },[inputDistrict]);

  function goToNextMenu(currentTab:number){
    if(currentTab === 1){
      if(areaState.data?.districts[0]){
        dispatch(loadGetDistricts_(areaState.data?.districts[0]));
      }

    }
    console.log(currentTab);
    selectTab(currentTab);
  }
  function goToNextTab(currentTab:Number){

    switch(currentTab){
      case 0:
        if((inputName.error == false && state.supply_days === 0) || (inputName.error == false && inputDays.error == false) ){
          if(areaState.data?.districts[0]){
            dispatch(loadGetDistricts_(areaState.data?.districts[0]));
          }
          selectTab(1);
        }
        break;
      case 1:
        if((state.districts.length > 0))
        selectTab(2);
        break;
    }
  }
//////////////////////////////// VALIDATION ///////////////////////////////////////////////////



  function handleSaveFormArea() {
    if (state?._id) {
      if(inputName.error == false && (state.supply_days === 0 || inputDays.error == false ) && (state.districts.length > 0)  ){
         dispatch(updateAreaRequest(state));
         history.push(`/area`);
      }else{
          toast.error("Infelizmente não foi possível salvar a área, há campos não preenchidos no formulário");
      }


    } else {
      if(inputName.error == false && (state.supply_days === 0 || inputDays.error == false ) && (state.districts.length > 0) ){
        dispatch(createAreaRequest(state));
        history.push(`/area`);
     }else{
         toast.error("Infelizmente não foi possível salvar a área, há campos não preenchidos no formulário");
     }

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
    }))
  };
  function handleStates (value:any){

    if(value){
      setInputState(prev =>({
      ...prev,
      value:value.name,
    }));
   dispatch(getStatesAction(value.sigla))
  }

};
  function handleSelectDistricts(value:any){
    if(value){
      setInpuCity(prev=>({
        ...prev,
        value:value.name
      }))

      dispatch(loadGetDistricts_({city:value.name}));
    }
    console.log(areaState);

  }
  function handleSelectProfession(value:any){

    value?dispatch(getUsersAction({profession_id:value._id})):dispatch(getUsersAction());

  }
  const handleDayOfTheWeek = useCallback((event: any, newValue: any) => {
    if(newValue){
       setInputDays(prev =>({
      ...prev,
      value:newValue.name,
    }));
      setState(prevState => ({
        ...prevState,
        week_day: newValue.id,
        form: {
          ...prevState.form,
          dayOfTheWeek: newValue,
        }
    }));
    }
  }, [state.week_day]);

  // Bairros
  const  handleSelectNeighborhood= useCallback((event:any,value1: any)=> {
    const found  = state.districts.findIndex((item:any)=>{
          return item._id === value1._id;
        });
        if(value1 && (found == -1)){
              setInputDistrict(prev=>({
                ...prev,
                value:value1.name,
              }));
              setState(prevState => ({
                    ...prevState,
                    districts: [...prevState.districts, {_id:value1._id, name:value1.name, city:value1.city}]
                  }))
            }else{
                  toast.error("Bairro já cadastrado na área");
                }

  },[state.districts]);

  //   const found  = state.districts.findIndex((item:any)=>{
  //     return item._id === value1._id;
  //   })
  //   if(value1 && (found == -1)){
  //     setInputDistrict(prev=>({
  //       ...prev,
  //       value:value1.name,
  //     }));
  //     setState(prevState => ({
  //     ...prevState,
  //     districts: [...prevState.districts, {_id:value1._id, name:value1.name, city:value1.city}]
  //   })),[state.districts]);

  //   }else{
  //     toast.error("Bairro já cadastrado na área");
  //   }
  // },[state.districts])

   async function handleDeleteNeighborhood(neighborhood: NeighborhoodAreaInterface) {
    let neighborhoodsSelected = [...state.districts];

    const neighborhoodFounded = neighborhoodsSelected.findIndex((item: any) => {
      return neighborhood._id === item._id
    });

    if (neighborhoodFounded > -1) {
      neighborhoodsSelected.splice(neighborhoodFounded, 1);
    };
    console.log(neighborhoodsSelected);

    if(neighborhoodsSelected.length<1){

      setState(prevState=>({
        ...prevState,
        districts:[]
      }))
    }else{
      setState(prevState => ({
      ...prevState,
      districts: [... neighborhoodsSelected]
    }))
    }

    console.log(state.districts);


  }


  // Prestadores
  function handleSelectUser(value: any) {

    const found = state.users.findIndex((item: any)=>{
      return item._id === value._id;
    })

     if(found > -1){
        toast.error("Prestador já cadastrado na área");
     }else{
      setState(prevState => ({
      ...prevState,
      users: [...prevState.users, value],

    }));
   }
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
      <Container>
        <FormSection>
          <FormContent>
            <FormTitle>Cadastro de Área</FormTitle>
            <TabContent>
              <TabNav>
                <TabNavItem className={currentTab === 0 ? 'active' : ''} onClick={() => goToNextMenu(0)}>
                  Dados da Área
                </TabNavItem>
                <TabNavItem className={currentTab === 1 ? 'active' : ''} onClick={() => goToNextMenu(1)}>
                  <Badge badgeContent={state.districts.length} max={99} color="primary">
                    {`Bairros`}
                  </Badge>
                </TabNavItem>
                <TabNavItem className={currentTab === 2 ? 'active' : ''} onClick={() => goToNextMenu(2)}>
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
                          error={inputName.error}
                          label="Nome"
                          variant="outlined"
                          size="small"
                          value={inputName.value}
                          autoFocus
                          onChange={element => setInputName(prev =>({
                            ...prev,
                            value:element.target.value
                          }))}
                          onBlur={handleNameValidator}
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
                            min={1}
                            max={70}
                            valueLabelDisplay="auto"
                            onChange={(event, value) =>{
                               handleChangeSupply(value);

                            }}
                          />
                        </div>
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={5}>
                    </Grid>
                    {state.supply_days > 1 && (
                      <Grid item md={4} xs={12}>
                        <FormGroupSection>
                          <Autocomplete
                            id="combo-box-day-of-week"
                            options={daysOfTheWeek}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} error={inputDays.error} label="Dia da semana" variant="outlined"
                            onBlur={handleDaysValidator}
                            /> }
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
                  <Grid item md={4} xs={12}>
                        <FormGroupSection >
                          <Autocomplete
                            id="combo-box-neigthborhoods-states"
                            options={States || []}
                            disabled= {state.districts[0]? true:false}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} autoFocus error={inputState.error} label="Estados" variant="outlined"
                            onBlur={handleStateValidator} />}
                            onChange={(event,value:any) => {
                              if(value){
                                handleStates(value);
                                load = true;
                              }else{
                                setInputState(prev=>({
                                  ...prev,
                                  value:''
                                }));
                                handleStateValidator
                              }
                            }}
                            size="small"
                            fullWidth
                          />
                        </FormGroupSection>
                      </Grid>
                    <Grid item md={5} xs={12}>
                      <FormGroupSectionCity >
                        <Autocomplete
                          id="combo-box-neigthborhoods-city"
                          disabled= {state.districts[0]? true:false}
                          options={areaState.citys || []}
                          onClose={() => {
                            load=false;
                          }}
                           getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} error={inputCity.error} label="Cidades" variant="outlined" onBlur={handleCityValidator} InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {!areaState.citys[0] && load?<CircularProgress color="inherit" size={20} />: null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}/>}
                          size="small"
                          onChange={(event, value:any) => {
                            if(value){
                              handleSelectDistricts(value);
                            }else{
                              setInpuCity(prev=>({
                                ...prev,
                                value:''
                              }));
                              handleCityValidator
                            }
                          }}
                        />
                      </FormGroupSectionCity>
                    </Grid>
                  <Grid container>
                    <Grid item md={7} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-neigthborhoods"
                          options={areaState.districts_ || []}
                          onClose={() => {
                            load=false;
                          }}
                          getOptionLabel={(option) => `${option.name}`}
                          renderInput={(params) => <TextField {...params} error={inputDistrict.error} label="Bairros" variant="outlined"
                          onBlur={handleDistrictValidator}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {!areaState.districts[0] && load ? <CircularProgress color="inherit" size={20} /> :null}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}/>}
                          size="small"
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectNeighborhood(event, value)
                            }
                          }}
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={12} xs={12}>
                      <ChipList>
                        {state.districts.map((item: any, index) => (
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
                  <Grid item md={7} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-profession"
                          options={professionState.list.data}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Funções" variant="outlined" InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <React.Fragment>
                                {professionState.list.data[0] ? null:<CircularProgress color="inherit" size={20} />}
                                {params.InputProps.endAdornment}
                              </React.Fragment>
                            ),
                          }}/>}
                          size="small"
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectProfession(value);
                            }else{
                              handleSelectProfession(null);
                            }
                          }}
                          fullWidth
                        />
                      </FormGroupSection>
                    </Grid>
                    <Grid item md={7} xs={12}>
                      <FormGroupSection>
                        <Autocomplete
                          id="combo-box-users"
                          options={userState.list.data}

                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => <TextField {...params} label="Prestador" variant="outlined" />}
                          size="small"
                          onChange={(event, value) => {
                            if (value) {
                              handleSelectUser({ _id: value._id || '', name: value.name, profession:value.profession_id?.name || ''})
                            }
                          }}
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
            <ButtonsContent>
                 <Button variant="outlined" className={classes.cancel} onClick={() => handleOpenModalCancel()}>
              Cancelar
              </Button>
            </ButtonsContent>

                  <ButtonsContent>
                      {currentTab !=0 && (
                        <Button variant="outlined" color="primary"  className={classes.register} onClick={() => currentTab ===1?selectTab(0):selectTab(1)}>
                         Voltar
                      </Button>
                      )}
                      {currentTab !=2 && (
                        <Button variant="outlined" color="primary"  className={classes.proxim} onClick={() => goToNextTab(currentTab)}>
                        Próximo
                      </Button>
                      )}
                    </ButtonsContent>
<ButtonsContent>
          {currentTab ===2 && (
                       <Button variant="contained" background="success" onClick={() => handleSaveFormArea()}>
                        Salvar
					          </Button>
                    )}
          </ButtonsContent>
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
