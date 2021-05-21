import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { apiSollar } from "../../../services/axios";
import { loadSuccessMeasurement, loadFailure } from "./actions";
const token = localStorage.getitem("token");

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    const response: AxiosResponse = yield call(
      apiSollar.get,
      `/measurement/lastEntries?patient_id${params.patient_id}`
    );
    yield put(loadSuccessMeasurement(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}
