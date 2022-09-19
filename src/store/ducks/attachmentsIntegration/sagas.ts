import { call, put } from "redux-saga/effects";
import { apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { dispatchDocsFailure, dispatchDocsSuccess } from "./actions";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";

export function* dispatchDocsForIntegration({
  payload: { external_user_name },
}: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post,
      `/attachment/integration/dispatch`,
      {},
      { headers: { external_user_name } }
    );

    toast.success("Iniciado despacho dos documentos");
    yield put(dispatchDocsSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível despachar documentos");
    yield put(dispatchDocsFailure());
  }
}
