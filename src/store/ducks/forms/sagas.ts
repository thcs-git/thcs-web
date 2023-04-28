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
  payload: {
    external_attendance_id: string;
    document_id: string;
  };
}
interface IActionFormsTabs {
  type: typeof FormTypes.LOAD_FORMS_TABS_REQUEST;
  payload: {
    customer_id: string;
  };
}
interface IActionFormsGroupByDate {
  type: typeof FormTypes.LOAD_FORMS_GROUP_BY_DATE_REQUEST;
  payload: {
    dataStart: string;
    dataEnd: string;
    type: string;
    attendance_id: number;
    document_id: string;
  }
}
interface IActionFilterForms {
  type: typeof FormTypes.LOAD_FORMS_FILTER_REQUEST;
  payload: {
    name_doc: string;
    name: string;
    type: string;
    attendance_id: number;
  }
}

const token = localStorage.getItem("token");
export function* getForms({ payload }: IAction) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/forms`, {
      headers: { external_attendance_id: payload.external_attendance_id },
      params: { document_id: payload.document_id },
    });
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possivel carregar formulários");
    yield put(loadFailure());
  }
}

export function* getFormsTabs({ payload }: IActionFormsTabs) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get, `/formsTabs`, {
      headers: { customer_id: payload.customer_id },
    });
    yield put(loadFormsTabsSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possivel carregar formulários");
    yield put(loadFormsTabsError());
  }
}

export function* getFilterForms({ payload }: IActionFilterForms) {
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

export function* getFormsGroupByDate({ payload }: IActionFormsGroupByDate) {
  const { dataStart, dataEnd, type, attendance_id, document_id } = payload
  try {
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);
    const headers = integration ? { token, external_attendance_id: attendance_id } : { token, attendance_id: attendance_id }
    const response :AxiosResponse = yield call(apiSollarReport.get as any,`/forms/bygroup`,
    {
      responseType: "blob",
      headers: { ...headers },
      params: { dataStart: dataStart, dataEnd: dataEnd, type: type, attendance_id: attendance_id, document_id: document_id }
    })
    yield put(loadFormsGroupByDateRequestSuccess(response.data));
  } catch (error) {
    yield put(loadFormsGroupRequestError())
  }
}
