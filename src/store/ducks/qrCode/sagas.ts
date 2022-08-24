import { qrCode, LoadRequestParams } from "./types";
import { call, put } from "redux-saga/effects";
import { useDispatch as dispatch } from "react-redux";

import { apiSollarMobi, apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess, updateQrCodeSuccess } from "./actions";

const token = localStorage.getItem("token");

export function* get(data: LoadRequestParams) {
  try {
    let response: AxiosResponse = yield call(apiSollar.get as any, `/qrcode`, {
      headers: { token },
      params: data,
    });

    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* createQrCode({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/qrcode/store`,
      { ...payload }
    );
    yield put(loadSuccess(response.data));
  } catch (err) {
    yield put(loadFailure());
    toast.error("Erro ao Criar QR Code");
  }
}

export function* updateQrCode({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/qrcode/update`,
      data
      // { headers: { token } }
    );

    yield put(updateQrCodeSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar o QR Code");
    yield put(loadFailure());
  }
}
