import { call, put } from "redux-saga/effects";
import { Attest } from "./types";
import { AxiosResponse } from "axios";
import { apiSollarNexoData } from "../../../services/axios";
import { toast } from "react-toastify";
import { loadSuccess, loadFailure } from "./actions";

export function* get({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollarNexoData.post as any,
      `/paciente/atestados`,
      "",
      { headers: { external_patient_id: payload } }
    );

    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível carregar os atestados.");
    yield put(loadFailure());
  }
}
