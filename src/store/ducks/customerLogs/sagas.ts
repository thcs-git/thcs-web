import { call, put } from "redux-saga/effects";
import { apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess } from "./actions";

export function* getCustomerLogs() {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/clientLogs`);
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possivel carregar formulários");
    yield put(loadFailure());
  }
}
