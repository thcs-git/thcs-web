import { call, put } from "redux-saga/effects";
import { apiSollarMobi, apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess } from "./actions";

export function* get() {
  try {
    console.log("entrou");
    const response: AxiosResponse = yield call(apiSollar.get, "/logo");
    yield put(loadSuccess(response.data));
  } catch (err) {
    yield put(loadFailure());
    toast.error("Erro ao buscar Aferições");
  }
}
