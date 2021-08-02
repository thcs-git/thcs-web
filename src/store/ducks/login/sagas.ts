import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import { apiSollar } from "../../../services/axios";
import history from "../../../routes/history";
import { AxiosResponse } from "axios";

import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

import { loadSuccess, loadFailure } from "./actions";

export function* doLogin({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post,
      `/user/login`,
      payload.credentials
    );

    const { data } = response;

    let menu = [
      {
        icon: 'DashboardIcon',
        id: 1,
        name: 'Dashboard',
        slug: '/',
        color: '#fff'
      },
      {
        icon: 'AssignmentIndIcon',
        id: 2,
        name: 'Clientes',
        slug: '/customer',
        color: '#fff'
      },
      {
        icon: 'BusinessIcon',
        id: 3,
        name: 'Empresas',
        slug: '/company',
        color: '#fff'
      },
      {
        icon: 'PersonIcon',
        id: 4,
        name: 'Meus Profissionais',
        slug: '/user',
        color: '#fff'
      },
      {
        icon: 'StarRateIcon',
        id: 5,
        name: 'Banco de Talentosntes',
        slug: '/userdesengaged',
        color: '#fff'
      },
      {
        icon: 'AssignmentIndIcon',
        id: 6,
        name: 'Área',
        slug: '/customer',
        color: '#fff'
      },
      {
        icon: 'GroupAddIcon',
        id: 7,
        name: 'Pacientes',
        slug: '/patient',
        color: '#fff'
      },
      {
        icon: 'FavoriteIcon',
        id: 8,
        name: 'Avaliação',
        slug: '/avaliation',
        color: '#fff'
      },
      {
        icon: 'LocalHospital',
        id: 9,
        name: 'Atendimento',
        slug: '/care',
        color: '#fff'
      },
    ]
    sessionStorage.setItem(SESSIONSTORAGE.MENU, JSON.stringify(menu))

    localStorage.removeItem(LOCALSTORAGE.TOKEN);
    localStorage.removeItem(LOCALSTORAGE.USERNAME);
    localStorage.removeItem(LOCALSTORAGE.USER_ID);
    localStorage.removeItem(LOCALSTORAGE.COMPANY_SELECTED);
    // localStorage.removeItem(LOCALSTORAGE.COMPANY_NAME);
    localStorage.removeItem(LOCALSTORAGE.CUSTOMER);
    // localStorage.removeItem(LOCALSTORAGE.CUSTOMER_NAME);

    localStorage.setItem(LOCALSTORAGE.TOKEN, data.token);
    localStorage.setItem(LOCALSTORAGE.USERNAME, data.name);
    localStorage.setItem(LOCALSTORAGE.USER_ID, data._id);
    localStorage.setItem(
      LOCALSTORAGE.CUSTOMER,
      data.companies[0]?.customer_id?._id || null
    );
    localStorage.setItem(
      LOCALSTORAGE.CUSTOMER_NAME,
      data.companies[0]?.customer_id?.name || "SEM"
    );

    localStorage.setItem(
      LOCALSTORAGE.COMPANY_SELECTED,
      data.companies[0]?._id || null
    );
    localStorage.setItem(
      LOCALSTORAGE.COMPANY_NAME,
      data.companies[0]?.name || "VÍNCULO"
    );

    yield put(loadSuccess(data));

    if (localStorage.getItem(LOCALSTORAGE.CUSTOMER_NAME) != "SEM") {
      history.push("/dashboard");
    } else {
      history.push("/dashboard_user");
    }

    location.reload();
  } catch (err) {
    console.log("err", err);
    yield put(loadFailure());

    toast.error("E-mail e/ou senha errada.");
  }
}
