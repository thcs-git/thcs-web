import { call, put } from "redux-saga/effects";

import { apiSollar, apiSollarChatbot } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess, loadSuccessFile } from "./actions";
import { LoadRequestParams, attachments } from "./types";

export function* get({ payload }: any) {
  try {
    let response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/attachments`,
      {
        headers: { external_patient_id: payload },
      }
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível carregar atendimentos da Telemedicina.");
    yield put(loadFailure());
  }
}
export function* getFile({ payload }: any) {
  try {
    let response: AxiosResponse = yield call(
      apiSollarChatbot.get as any,
      `/telemedicine/getAttachment/`,
      {
        headers: { file_name: payload },
      }
    );
    window.open(response.data, "_blank")?.focus();
    yield put(loadSuccessFile());
  } catch (error) {
    toast.error("Não foi possível carregar atendimentos da Telemedicina.");
    yield put(loadFailure());
  }
}
