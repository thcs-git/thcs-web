import { call, put } from "redux-saga/effects";
import {
  apiSollarMobi,
  apiSollar,
  apiSollarReport,
} from "../../../services/axios";
import { AxiosResponse } from "axios";
import {
  loadSuccess,
  loadFailure,
  loadFailureReportUnique,
  loadSucessReportUnique,
} from "./actions";
import { toast } from "react-toastify";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

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

export function* loadReportUnique(data: any) {
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID);
  const id = data.payload;

  console.log(data.payload, "payloadddd");
  try {
    const response: AxiosResponse = yield call(
      apiSollarReport.get,
      `antibiotic/${data.payload}`,
      {
        responseType: "blob",
        headers: { user_id },
      }
    );
    yield put(loadSucessReportUnique(response.data));
  } catch (error) {
    toast.info("Não foi possível gerar relatório de Antibióticos.");
    yield put(loadFailureReportUnique());
  }
}
