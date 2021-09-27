import {put, call} from "redux-saga/effects";
import {toast} from "react-toastify";
import {AxiosResponse} from "axios";

import {apiSollar} from "../../../services/axios";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

import {
  loadSuccess,
  loadFailure,
  loadSuccessGetMessageById,
} from "./actions"

const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
const customer_id = localStorage.getItem(LOCALSTORAGE.CUSTOMER);
const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID);

export function* get({payload}: any) {
  try {
    const {params} = payload;
    const response: AxiosResponse = yield call(apiSollar.get, `/message?limit=${params.limit ?? 4}&page=${params.page || 1}${user_id ? '&to=' + user_id : ''}`, {
      headers: {token, customer_id},
    });
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível carregar o menu do usuário");
    yield put(loadFailure());
  }
}

export function* getMessageById({payload: {id: _id}}: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/message/${_id}`, {
        headers: {token},
      }
    )

    yield put(loadSuccessGetMessageById(response.data))
  } catch (error) {
    yield put(loadFailure())
  }
}
