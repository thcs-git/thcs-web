import { call, put } from "redux-saga/effects";
import {
  apiSollarMobi,
  apiSollar,
  apiSollarNexoData,
} from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess } from "./actions";

export function* get({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollarNexoData.post as any,
      `/paciente/exames`,
      "",
      { headers: { external_patient_id: payload } }
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possivel carregar exames");
    yield put(loadFailure());
  }
}
