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
      apiSollar.get as any,
      `/care/antibiotics/${payload}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Erro ao buscar Antibióticos");
    yield put(loadFailure());
  }
}

export function* loadReportUnique({ payload }: any) {
  const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
  const user_id = localStorage.getItem(LOCALSTORAGE.USER_ID);

  try {
    const response: AxiosResponse = yield call(
      apiSollarReport.get as any,
      `antibiotic/${payload.id}`,
      {
        responseType: "blob",
        headers: { user_id, external_attendance_id: payload.careId },
      }
    );
    yield put(loadSucessReportUnique(response.data));
  } catch (error) {
    toast.info("Não foi possível gerar relatório de Antibióticos.");
    yield put(loadFailureReportUnique());
  }
}
