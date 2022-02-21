import { PatientInterface } from "./../patients/types";
import { AllergiesInterface } from "./types";
import { loadFailure, loadSuccess } from "./../allergies/actions";
import { call, put } from "redux-saga/effects";
import { apiSollarMobi, apiSollar } from "../../../services/axios";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export function* load(data: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollarMobi.post,
      `/allergies`,
      { patient_id: data.payload }
    );
    yield put(loadSuccess(response.data));
  } catch (err) {
    yield put(loadFailure());
    toast.error("Erro ao buscar alergias");
  }
}
