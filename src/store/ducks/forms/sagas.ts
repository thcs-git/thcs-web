import { apiSollarReport } from './../../../services/axios';
import { call, put } from "redux-saga/effects";
import {
  apiSollarMobi,
  apiSollar,
  apiSollarNexoData,
} from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess, loadFormsFilterError, loadFormsFilterSuccess } from "./actions";
import { LoadRequestParams, FormTypes } from "./types";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";
interface IAction {
  type: typeof FormTypes.LOAD_REQUEST;
  payload: any;
}
const token = localStorage.getItem("token");
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

export function* getFilterForms({ payload }:any){
  try{
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
       const headers = integration
      ? { token, external_attendance_id: payload.attendance_id }
      : { token, attendance_id: payload.attendance_id };
    const response:AxiosResponse = yield call( apiSollarReport.get as any,`/forms?name_doc=${payload.name_doc}&name=${payload.name}&type=${payload.type}`,{responseType: "blob",headers: { ...headers }})
    yield put(loadFormsFilterSuccess(response.data));
  }catch(error){
    yield put(loadFormsFilterError())
  }
}
