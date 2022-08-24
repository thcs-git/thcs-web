import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import { apiSollar } from "../../../services/axios";

import {
  loadSuccess,
  loadFailure,
  createUnconfirmedUserSuccess,
  loadSuccessGetUnconfirmedUserById,
  updateUnconfirmedUserSuccess,
} from "./actions";
import { UnconfirmedUserInterface } from "./types";

const token = localStorage.getItem("token");

export function* get({ payload }: any) {
  const { params } = payload;
  const response: AxiosResponse = yield call(
    apiSollar.get as any,
    `/user?limit=${params.limit ?? 10}&page=${params.page || 1}${
      params.search ? "&search=" + params.search : ""
    }`
  );

  try {
    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getUnconfirmedUserById({ payload: { id: _id } }: any) {
  try {
    const response: AxiosResponse = yield call(apiSollar.get as any, `/user`, {
      headers: { token },
      params: { _id },
    });

    yield put(loadSuccessGetUnconfirmedUserById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}
// export function* registerUser({payload:{ data }}:any){
//   const phones = [];

//   if (data.phone.length > 0) {
//     phones.push({
//       whatsapp: false,
//       telegram: false,
//       number: data.phone
//     });
//   }

//   if (data.cellphone.length > 0) {
//     phones.push({
//       whatsapp: false,
//       telegram: false,
//       number: data.cellphone
//     });
//   }

//   data.username = data.email;
//   data.password = data.fiscal_number;

//   data.phones = phones;

//   data.user_type_id = { _id: '5fc05d1803058800244bc41b' }

//   try {
//     const response:AxiosResponse = yield call(apiSollar.post as any, `/user/register`, data, { headers: { token } })
//     yield put(createUserSuccess(response.data))
//     toast.success('Usuário cadastrado com sucesso!');
//   } catch(e) {
//     toast.error('Não foi possível cadastrar o usuário');
//     yield put(loadFailure());
//   }
// }
export function* createUnconfirmedUser({ payload: { data } }: any) {
  const phones = [];

  // if (data.phone.length > 0) {
  phones.push({
    whatsapp: false,
    telegram: false,
    number: data.phone,
  });
  // }

  // if (data.cellphone.length > 0) {
  //   phones.push({
  //     whatsapp: false,
  //     telegram: false,
  //     number: data.cellphone
  //   });
  // }

  data.username = data.email;
  //data.password = data.fiscal_number;

  data.phones = phones;

  //data.user_type_id = { _id: '5fc05d1803058800244bc41b' }
  const response: AxiosResponse = yield call(
    apiSollar.post as any,
    `/unconfirmeduser/store`,
    data
  );
  try {
    yield put(createUnconfirmedUserSuccess(response.data));
    toast.success("Usuário criado com sucesso!");
  } catch (e) {
    toast.error("Não foi possível cadastrar o usuário");
    yield put(loadFailure());
  }
}

export function* updateUnconfirmedUser({ payload: { data } }: any) {
  const { _id } = data;

  const phones = [];

  if (data?.phone?.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.phone,
    });
  }

  if (data?.cellphone?.length > 0) {
    phones.push({
      whatsapp: false,
      telegram: false,
      number: data.cellphone,
    });
  }

  data.phones = phones;

  delete data.phone;
  delete data.cellphone;

  data.user_type_id = { _id: "5fc05d1803058800244bc41b" };

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/unconfirmeduser/${_id}/update`,
      { ...data },
      { headers: { token } }
    );

    console.log(response.data);

    toast.success("Usuário atualizado com sucesso!");
    yield put(updateUnconfirmedUserSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do usuario");
    yield put(loadFailure());
  }
}

export function* searchUnconfirmedUser({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/unconfirmeduser/?limit=10&page=1${!!value ? "&search=" + value : ""}`
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados do usuário");
    yield put(loadFailure());
  }
}
