import { call, put } from "redux-saga/effects";
import { apiSollarMobi, apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { loadSuccess, loadFailure } from "./actions";
import { toast } from "react-toastify";

export function* get({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/care/antibiotics/${payload}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Erro ao buscar Antibióticos");
    yield put(loadFailure());
  }
}
