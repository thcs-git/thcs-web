import { call, put } from "redux-saga/effects";

import { apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess } from "./actions";

type params = { payload: string; type: string | undefined };

export function* get({ payload }: params) {
  try {
    let response: AxiosResponse = yield call(apiSollar.get, `/telemedicine`, {
      headers: { external_attendance_id: payload },
    });
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível carregar atendimentos da Telemedicina.");
    yield put(loadFailure());
  }
}
