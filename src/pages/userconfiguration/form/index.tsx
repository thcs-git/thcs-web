import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, RouteComponentProps, Link, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from '../../../components/Sidebar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FolderIcon from '@material-ui/icons/Folder';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Chip, FormControlLabel, Grid, IconButton, Slider, Switch, TextField } from '@material-ui/core';
import { BoxCustom, BoxCustomFoot, FeedbackTitle } from '../form/style';
import {
  createUserRequest,
  updateUserRequest,
  getAddress as getAddressAction,
  loadUserById,
  loadProfessionsRequest as getProfessionsAction,
  loadUserTypesRequest as getUserTypesAction,
  cleanAction,
} from "../../../store/ducks/users/actions";
import {
  UserInterface,
  ProfessionUserInterface,
  CompanyUserInterface,
} from "../../../store/ducks/users/types";
import { ApplicationState } from '../../../store';
import { ChipList } from '../../user/form/styles';
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import { FeedbackDescription } from '../../../components/Feedback/styles';
import { FormGroupSection } from '../../area/form/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { handleCompanySelected } from '../../../helpers/localStorage';
export default function UserConfiguration(){
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state: ApplicationState) => state.users);
  const [state, setState] = useState<UserInterface>({
    companies: [],
    name: "",
    birthdate: "",
    gender: "",
    national_id: "",
    issuing_organ: "",
    fiscal_number: "",
    mother_name: "",
    nationality: "",
    address: {
      postal_code: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      complement: "",
    },
    email: "",
    phone: "",
    cellphone: "",
    user_type_id: "",
    specialties: [],
    council_state: "",
    council_number: "",
    verified: "",
    active: true,
  });
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
  const [user, setUser] = useState({
    id: localStorage.getItem(LOCALSTORAGE.USER_ID) || ``,
    name: localStorage.getItem(LOCALSTORAGE.USERNAME),
    companySelected: handleCompanySelected()
  });
  const currentUser = localStorage.getItem(LOCALSTORAGE.USER_ID);
  let currentCompany = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
  useEffect(()=>{
    dispatch(cleanAction());
    if(currentUser){
       dispatch(loadUserById(currentUser));
    }
  },[]);
  const selectCompany = useCallback(() => {
    currentCompany = localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
    const selected = userState.data.companies.filter((item: any) => item._id === currentCompany);
    return (selected[0]) ? selected[0] : null;
  }, [userState]);

  const changeCompany = useCallback((company: any) => {
    console.log("change");
    localStorage.setItem(LOCALSTORAGE.COMPANY_SELECTED, company._id);
    localStorage.setItem(LOCALSTORAGE.COMPANY_NAME, company.name);
    localStorage.setItem(LOCALSTORAGE.CUSTOMER, company.customer_id._id);
    localStorage.setItem(LOCALSTORAGE.CUSTOMER_NAME, company.customer_id.name);

    setUser(prevState => ({
      ...prevState,
      companySelected: company._id
    }))
    selectCompany();
  }, [userState.data]);

  return (
    <>
      <Sidebar>
        <BoxCustom>
           <Grid container direction="column">
              <Grid item md={6}>
                <FeedbackTitle>
                  Configurações
                </FeedbackTitle>
                <Card>
                  <CardContent style={{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                    <Grid container>
                      <Grid item md={1}>
                        avatar
                      </Grid>
                      <Grid item md={9}>
                        nome
                      </Grid>
                      <Grid item md={2}>
                        botão de editar
                      </Grid>
                      </Grid>
                    <Grid item>
                      cpf:
                    </Grid>
                    <Grid item>
                      email
                    </Grid>
                    <Grid item>
                      telefone
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={6}>
                <FeedbackTitle>
                  Minhas Empresas
                </FeedbackTitle>

              <Autocomplete
              id="combo-box-change-company"
              options={userState.data.companies}
              getOptionLabel={(option: any) => option.name}
              getOptionSelected={(option, value) => option._id === currentCompany}
              value={selectCompany()}
              renderInput={(params) => <TextField {...params} label="Empresa" variant="outlined" autoComplete="off" />}
              size="small"
              onChange={(event, value) => changeCompany(value)}
              noOptionsText="Nenhuma empresa encontrada"
              autoComplete={false}
            />
            </Grid>
            <Grid item md={12}>
              <FeedbackTitle>
                Auditoria
              </FeedbackTitle>
              <List>
                <ListItem>
                  <Grid item md={7} xs={12}>
                    <FormGroupSection>
                      <p>Abastecimento/dias</p>
                        <div style={{ paddingLeft: 10 }}>
                          <Slider
                            marks={supplyIntervals}
                          //  value={state.supply_days}
                            defaultValue={0}
                            getAriaValueText={value => `${value}`}
                            aria-labelledby="discrete-slider-restrict"
                            step={null}
                            min={1}
                            max={70}
                            valueLabelDisplay="auto"
                           // disabled={!canEdit}
                            onChange={(event, value) =>{
                              // handleChangeSupply(value);

                            }}
                          />
                        </div>
                      </FormGroupSection>
                  </Grid>
                </ListItem>
                <ListItem>

                </ListItem>
              </List>
            </Grid>
            <Grid item md={12}>
              <FeedbackTitle>
                Segurança
              </FeedbackTitle>
              <List>
                <ListItem>
                   <FeedbackDescription>
                     <Link to="/recoverypassmenu">Alterar minha senha
                     </Link>

                  </FeedbackDescription>
                </ListItem>
              </List>
            </Grid>

            <Grid item md={12}>
              <FeedbackTitle>
                Acessibilidade
              </FeedbackTitle>
              <List>
                <ListItem>
                  Fontes Grande <Switch />
                </ListItem>
                <ListItem>
                  Alto Contraste <Switch />
                </ListItem>
              </List>
            </Grid>
            <Grid item md={12}>
              <FeedbackTitle>
                Sobre o Sollar
              </FeedbackTitle>
              <BoxCustomFoot>
              Sollar 2021 <br />
              Versao 1.02 <br />
              Powered by TASCOM informática
            </BoxCustomFoot>
          </Grid>
            <Grid item md={2}>
            </Grid>
        </Grid>
        </BoxCustom>


      </Sidebar>
    </>
  );
}


