import { call, put, delay, select } from "redux-saga/effects";
import { apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  dispatchDocsFailure,
  dispatchDocsSuccess,
  verifyStatusDocsSuccess,
  verifyStatusDocsFailure,
} from "./actions";
import { loadRequest as loadRequestCustomerLogs } from "../customerLogs/actions";
import { getAttachment } from "./selectors";

export function* dispatchDocsForIntegration({
  payload: { external_user_name },
}: any) {
  try {
    toast.info("Iniciado integração dos documentos");
    const response: AxiosResponse = yield call(
      apiSollar.post,
      `/attachment/integration/dispatch`,
      {},
      { headers: { external_user_name } }
    );
    toast.success("Integração dos documentos finalizada");

    yield put(dispatchDocsSuccess(response.data));
    yield put(loadRequestCustomerLogs());
  } catch (error) {
    toast.error("Não foi possível integrar documentos");
    yield put(dispatchDocsFailure());
    yield put(loadRequestCustomerLogs());
  }
}

export interface ResponseState {
  data?: any;
  error?: boolean;
  loading?: boolean;
  success?: boolean;
}

export function* verifyStatus() {
  try {
    let stopFetch = false;
    let skipFirstTime = true;

    while (!stopFetch) {
      const response: AxiosResponse = yield call(
        apiSollar.get,
        `/attachment/integration/status`
      );

      stopFetch = response.data.beingIntegrated === true ? false : true;

      const attachmentState: ResponseState = yield select(getAttachment);

      !skipFirstTime &&
        !response.data.beingIntegrated &&
        attachmentState.loading &&
        toast.success("Integração dos documentos finalizada");

      skipFirstTime = false;
      yield put(verifyStatusDocsSuccess(response.data));
      yield delay(45000);
    }
  } catch (error) {
    toast.error("Não foi possível verificar status dos documentos");
    yield put(verifyStatusDocsFailure());
  }
}
