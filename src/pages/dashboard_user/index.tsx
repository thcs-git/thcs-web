import {Box, Container, Divider, Grid, List, ListItem, Menu, MenuItem, Typography} from '@material-ui/core';
import React, {useCallback, useEffect, useState} from 'react';
import Sidebar from "../../components/Sidebar";
import Sidebar_menu from '../../components/Sidebar_menu';
import {Title} from '../../styles/components/Text';
import {UserInterface} from "../../store/ducks/users/types";
import LOCALSTORAGE from "../../helpers/constants/localStorage";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {cleanAction, loadUserById} from "../../store/ducks/users/actions";
import _ from 'lodash';
import SettingsIcon from '@material-ui/icons/Settings';

import {
  ActionCard,
  InfoSection,
  MeasurementIconImage,
  PatientPlusIconImage,
  UserCheckIconImage
} from "../dashboard/styles";
import SearchInput from "../../components/Inputs/Search";


export default function Dashboard_user() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state: ApplicationState) => state.users);
  const [firstCall, setFirstcall] = useState(false);
  const [state, setState] = useState<UserInterface>({
    companies: [],
    companies_links: [],
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
    professions:[],
  });

  const [user, setUser] = useState({
    id: localStorage.getItem(LOCALSTORAGE.USER_ID) || ``,
    name: localStorage.getItem(LOCALSTORAGE.USERNAME),
  });

  const accountValid = useCallback(() => {
    const addressValid = !_.isEmpty(state.address.postal_code)
    const companiesValid = !_.isEmpty(state.companies)
    const professionValid = !_.isEmpty(state.profession_id)
    const mainSpecialtyValid = !_.isEmpty(state.main_specialty_id)
    const specialtiesValid = !_.isEmpty(state.specialties)

    if (addressValid && companiesValid && professionValid && mainSpecialtyValid && specialtiesValid) {
      return true
    } else {
      return false
    }

  }, [state]);

  useEffect(() => {
    dispatch(cleanAction());
    if (user?.id) {
      dispatch(loadUserById(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (userState.data._id) {
      setState((prevState) => ({
        ...userState.data,
      }));
    }
  }, [userState]);

  return (
    <>
      {accountValid() ? (
        <>
          <Sidebar>
            <Container>
              <Title>Dashboard User (Vinculado)</Title>

              <InfoSection>
                <SearchInput label="Pesquisa por palavra-chave" />
              </InfoSection>

              <InfoSection>

                <Grid container>
                  <Grid item xs={4} md={3}>
                    <Link to='/patient'>
                      <ActionCard elevation={0}>
                        <UserCheckIconImage />
                        <p>Cadastro de Paciente</p>
                      </ActionCard>
                    </Link>
                  </Grid>

                  <Grid item xs={4} md={3}>
                    <Link to='/patient'>
                      <ActionCard elevation={0}>
                        <MeasurementIconImage />
                        <p>Aferição do Paciente</p>
                      </ActionCard>
                    </Link>
                  </Grid>

                  <Grid item xs={4} md={3}>
                    <Link to='/user'>
                      <ActionCard elevation={0}>
                        <MeasurementIconImage />
                        <p>Cadastro de Prestador</p>
                      </ActionCard>
                    </Link>
                  </Grid>

                  <Grid item xs={4} md={3}>
                    <Link to='/care'>
                      <ActionCard elevation={0}>
                        <PatientPlusIconImage />
                        <p>Cadastrar Atendimento</p>
                      </ActionCard>
                    </Link>
                  </Grid>

                </Grid>

              </InfoSection>
            </Container>
          </Sidebar>
        </>
      ) : (
        <>
          <Sidebar_menu>
            <Container>
              <Title>Dashboard User (Desvinculado)</Title>
              <InfoSection>

                <Grid container>

                  <Grid item xs={4} md={3}>
                    <Link to='/userconfiguration'>
                      <ActionCard elevation={0}>
                        <SettingsIcon style={{ color: '#16679a' }} />
                        <p>Configurações</p>
                      </ActionCard>
                    </Link>
                  </Grid>

                </Grid>

              </InfoSection>
            </Container>
          </Sidebar_menu>
        </>
      )}
    </>
  )
}
