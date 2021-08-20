import {put, call} from "redux-saga/effects";
import {toast} from "react-toastify";
import {AxiosResponse} from "axios";

import {apiSollar} from "../../../services/axios";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

import {
  loadSuccess,
  loadFailure,
} from "./actions"

const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER);

export function* get() {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/layout`, {
      headers: { token, customer_id },
    });
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi carregar o menu do usuário");
    yield put(loadFailure());
  }
}
