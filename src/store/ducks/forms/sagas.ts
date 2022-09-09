import { call, put } from "redux-saga/effects";
import {
  apiSollarMobi,
  apiSollar,
  apiSollarNexoData,
} from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess } from "./actions";
import { LoadRequestParams, FormTypes } from "./types";

interface IAction {
  type: typeof FormTypes.LOAD_REQUEST;
  payload: any;
}

export function* getForms({ payload }: IAction) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/forms`, {
      headers: { external_attendance_id: payload },
    });
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possivel carregar formulários");
    yield put(loadFailure());
  }
}
