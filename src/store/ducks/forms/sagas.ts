import { apiSollarReport } from './../../../services/axios';
import { call, put } from "redux-saga/effects";
import {
  apiSollarMobi,
  apiSollar,
  apiSollarNexoData,
} from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess, loadFormsFilterError, loadFormsFilterSuccess, loadFormsGroupByDateRequestSuccess, loadFormsGroupRequestError, loadFormsTabsSuccess, loadFormsTabsError } from "./actions";
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

export function* getFormsTabs({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/formsTabs`, {
      headers: { customer_id: payload },
    });
    yield put(loadFormsTabsSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possivel carregar formulários");
    yield put(loadFormsTabsError());
  }
}

export function* getFilterForms({ payload }: any) {
  const { name_doc, name, type, attendance_id } = payload
  try {
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
       const headers = integration
      ? { token, external_attendance_id: attendance_id }
      : { token, attendance_id: attendance_id };
    const response: AxiosResponse = yield call(apiSollarReport.get as any,`/forms`,
    {
      responseType: "blob",
      headers: { ...headers },
      params: { name_doc: name_doc, name: name, type: type }
    })
    yield put(loadFormsFilterSuccess(response.data));
  }catch(error){
    yield put(loadFormsFilterError())
  }
}

export function* getFormsGroupByDate({ payload }: any) {
  const { dataStart, dataEnd, type, attendance_id } = payload
  try {
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration ? { token, external_attendance_id: attendance_id } : { token, attendance_id: attendance_id }
    const response :AxiosResponse = yield call(apiSollarReport.get as any,`/forms/bygroup`,
    {
      responseType: "blob",
      headers: { ...headers },
      params: { dataStart: dataStart, dataEnd: dataEnd, type: type, attendance_id: attendance_id }
    })
    yield put(loadFormsGroupByDateRequestSuccess(response.data));
  } catch (error) {
    yield put(loadFormsGroupRequestError())
  }
}
