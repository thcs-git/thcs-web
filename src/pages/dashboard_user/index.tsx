import {Container} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import Sidebar from "../../components/Sidebar";
import Sidebar_menu from '../../components/Sidebar_menu';
import {Title} from '../../styles/components/Text';
import {UserInterface} from "../../store/ducks/users/types";
import LOCALSTORAGE from "../../helpers/constants/localStorage";
import {handleCompanySelected} from "../../helpers/localStorage";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {ApplicationState} from "../../store";
import {cleanAction, loadUserById} from "../../store/ducks/users/actions";


export default function Dashboard_user() {
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

  const [user, setUser] = useState({
    id: localStorage.getItem(LOCALSTORAGE.USER_ID) || ``,
    name: localStorage.getItem(LOCALSTORAGE.USERNAME),
  });

  useEffect(()=>{
    dispatch(cleanAction());
    if(user?.id){
      dispatch(loadUserById(user.id));
    }
  },[user]);

  return (
    <>
      {false ? (
        <>
          <Sidebar>
            <Container>
              <Title>Dashboard User</Title>
            </Container>
          </Sidebar>
        </>
      ) : (
        <>
          <Sidebar_menu>
            <Container>
              <Title>Dashboard User</Title>
            </Container>
          </Sidebar_menu>
        </>
      )}
    </>
  )
}
