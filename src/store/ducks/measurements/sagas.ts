import { call, put } from "redux-saga/effects";
import { apiSollarMobi, apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { loadFailure, loadSuccess } from "./actions";

export function* get(data: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollarMobi.post,
      `/measurement/report`,
      { search: data.payload }
    );
    yield put(loadSuccess(response.data));
    // toast.success("Sucesso  ao buscar Aferições");
  } catch (err) {
    yield put(loadFailure());
    toast.error("Erro ao buscar Aferições");
  }
}
