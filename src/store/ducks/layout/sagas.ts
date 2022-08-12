import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import { apiSollar } from "../../../services/axios";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

import { loadSuccess, loadFailure } from "./actions";

const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER);

export function* get() {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/layout`,
      {
        headers: { token, customer_id },
      }
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    const data = {
      menu: [
        {
          icon: "DashboardIcon",
          id: 1,
          name: "Dashboard",
          slug: "/",
          color: "#fff",
        },
        {
          icon: "SettingsIcon",
          id: 100,
          name: "Configurações",
          slug: "/userconfiguration",
          color: "#fff",
        },
        {
          icon: "ExitToApp",
          id: 1000,
          name: "Sair",
          modal: true,
          color: "#fff",
        },
      ],
      rights: [],
      token: error.response.data.token,
    };
    toast.error("Não foi possível carregar o menu do usuário");
    yield put(loadFailure(data));
  }
}
