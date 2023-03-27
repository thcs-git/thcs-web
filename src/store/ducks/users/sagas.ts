import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import {
  apiSollar,
  viacep,
  googleMaps,
  apiIntegra,
} from "../../../services/axios";
import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import {
  loadSuccess,
  loadFailure,
  successGetAddress,
  createUserSuccess,
  loadSuccessGetUserById,
  updateUserSuccess,
  loadProfessionsSuccess,
  loadUserTypesSuccess,
  loadSuccessGetUserDisengaged,
  errorGetAddress,
  loadCheckSuccess,
  loadSuccessGetUserByEmail,
  loadRecoverySuccess,
  loadSuccessConfirm,
} from "./actions";
import { loadRequest } from "../login/actions";

import { ViacepDataInterface } from "./types";

import { getGeolocation } from "../__globalReducer/saga";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

const token = localStorage.getItem(LOCALSTORAGE.TOKEN);
const tokenAux = localStorage.getItem(LOCALSTORAGE.TOKEN_AUX);

export function* get({ payload }: any) {
  try {
    const { params } = payload;
    let response: AxiosResponse;
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

    // if (integration) {
    //   const company = localStorage.getItem(LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED)
    //   response = yield call(
    //     apiIntegra(integration),
    //     `/user/getUserByCompany/${company}?limit=${params.limit ?? 10}&page=${params.page || 1}`
    //   );
    // } else {
    response = yield call(
      apiSollar.get as any,
      `/user?limit=${params.limit ?? 10}&page=${params.page || 1}${
        params.search ? "&search=" + params.search : ""
      }${params.profession_id ? "&profession_id=" + params.profession_id : ""}`
    );
    // }
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do usuario");
    yield put(loadFailure());
  }
}

export function* getUserById({ payload: { id: _id, page: page } }: any) {
  try {
    let response: AxiosResponse;
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

    // if (integration && !(page === 'sidebar' || page === 'userconfiguration')) {
    //   response = yield call(apiIntegra(integration), `/user/${_id}`, {});
    // } else {
    response = yield call(apiSollar.get as any, `/user`, {
      headers: { token },
      params: { _id },
    });
    // }

    yield put(loadSuccessGetUserById(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getUserByEmail({ payload: { email: email } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/user/confirmUserbyEmail`,
      {
        params: { email },
      }
    );

    yield put(loadSuccessGetUserByEmail(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* loadGetUserDisengaged({ payload }: any) {
  const { params } = payload;
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/user/getUserDisengaged?limit=${params.limit ?? 10}&page=${
        params.page || 1
      }`,
      {
        headers: { token },
      }
    );
    yield put(loadSuccessGetUserDisengaged(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export async function* registerUser({ payload: { data } }: any) {
  // const phones = [];

  // if (data.phone.length > 0) {
  //   phones.push({
  //     whatsapp: false,
  //     telegram: false,
  //     number: data.phone,
  //   });
  // }

  // if (data.cellphone.length > 0) {
  //   phones.push({
  //     whatsapp: false,
  //     telegram: false,
  //     number: data.cellphone,
  //   });
  // }

  data.username = data.email;
  data.password = data.fiscal_number;

  // data.phones = phones;

  data.user_type_id = { _id: "5fc05d1803058800244bc41b" };

  if (data.address.postal_code) {
    let { street, number, district, city, state } = data.address;

    try {
      const { data: googleAddressData }: AxiosResponse = yield googleMaps.get(
        `/geocode/json?address=${street},${number},${district},${city},${state}`
      );

      if (googleAddressData.results) {
        const { lat: latitude, lng: longitude } =
          googleAddressData.results[0].geometry.location;
        data.address.geolocation = { latitude, longitude };
      }
    } catch (e: any) {
      console.error("Get google maps data", e.message);
    }
  }

  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/user/register`,
      data,
      { headers: { token } }
    );
    yield put(createUserSuccess(response.data));
    toast.success("Usuário cadastrado com sucesso!");
  } catch (e) {
    toast.error("Não foi possível cadastrar o usuário");
    yield put(loadFailure());
  }
}

export function* createUser({ payload: { data } }: any) {
  // const phones = [];

  // if (data.phone.length > 0) {
  //   phones.push({
  //     whatsapp: false,
  //     telegram: false,
  //     number: data.phone,
  //   });
  // }

  // if (data.cellphone.length > 0) {
  //   phones.push({
  //     whatsapp: false,
  //     telegram: false,
  //     number: data.cellphone,
  //   });
  // }

  data.username = data.email;
  data.fiscal_number = data.fiscal_number
    .replaceAll(".", "")
    .replaceAll("/", "")
    .replaceAll("-", "");
  // data.password = data.fiscal_number
  //   .replaceAll(".", "")
  //   .replaceAll("/", "")
  //   .replaceAll("-", "");

  data.password = data.password;
  // data.phones = phones;

  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/user/store`,
      data,
      { headers: { token } }
    );

    yield put(createUserSuccess(response.data));
    toast.success("Usuário cadastrado com sucesso!");
  } catch (e) {
    toast.error("Não foi possível cadastrar o usuário");
    yield put(loadFailure());
  }
}

export function* updateUser({ payload: { data } }: any) {
  const { _id } = data;

  // const phones = [];

  // if (data?.phone) {
  //   phones.push({
  //     whatsapp: false,
  //     telegram: false,
  //     number: data.phone,
  //   });
  // }

  // if (data?.cellphone) {
  //   phones.push({
  //     whatsapp: false,
  //     telegram: false,
  //     cellnumber: data.cellphone,
  //   });
  // }

  // data.phones = phones;

  delete data.phone;
  delete data.cellphone;

  if (data.address.postal_code) {
    let { street, number, district, city, state } = data.address;

    try {
      const { data: googleAddressData }: AxiosResponse = yield googleMaps.get(
        `/geocode/json?address=${street},${number},${district},${city},${state}`
      );

      if (googleAddressData.results) {
        const { lat: latitude, lng: longitude } =
          googleAddressData.results[0].geometry.location;
        data.address.geolocation = { latitude, longitude };
      }
    } catch (e: any) {
      console.error("Get google maps data", e.message);
    }
  }

  try {
    const response: AxiosResponse = yield call(
      apiSollar.put as any,
      `/user/${_id}/update`,
      { ...data },
      { headers: { token } }
    );

    toast.success("Usuário atualizado com sucesso!");
    yield put(updateUserSuccess(response.data));
  } catch (error) {
    toast.error("Não foi possível atualizar os dados do usuario");
    yield put(loadFailure());
  }
}

export function* updateUserPassword({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.patch as any,
      `/user/updatepassword`,
      { ...data },
      { headers: { token: tokenAux } }
    );

    yield put(loadRequest(data));
  } catch (error) {
    // toast.error("Não foi possível atualizar os dados do usuario");
    yield put(loadFailure());
  }
}

export function* getAddress({ payload }: any) {
  try {
    const { data }: AxiosResponse<ViacepDataInterface> = yield call(
      viacep.get,
      `${payload.postalCode}/json`
    );

    if (data.erro) {
      yield put(errorGetAddress());
      return;
    }

    yield put(successGetAddress(data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getProfessions() {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/profession`,
      {
        headers: { token },
      }
    );

    yield put(loadProfessionsSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* searchUser({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/user/?limit=10&page=1`,
      { params: data }
    );
    yield put(loadSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados do usuário");
    yield put(loadFailure());
  }
}

export function* searchUserDisengaged({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/user/getUserDisengaged?limit=10&page=1${
        !!value ? "&search=" + value : ""
      }`
    );
    yield put(loadSuccessGetUserDisengaged(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados do usuário");
    yield put(loadFailure());
  }
}

export function* getUserTypes({ payload: { value } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/usertype/?limit=10&page=1${!!value ? "&search=" + value : ""}`
    );
    yield put(loadUserTypesSuccess(response.data));
  } catch (error) {
    toast.info("Não foi possível buscar os dados do usuário");
    yield put(loadFailure());
  }
}

export function* checkEmail({ payload: { token } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/email?token=${token}`
    );
    yield put(loadCheckSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* recoveryPassword({ payload: { data } }: any) {
  localStorage.removeItem(LOCALSTORAGE.TOKEN);
  localStorage.removeItem(LOCALSTORAGE.USER_ID);
  localStorage.removeItem(LOCALSTORAGE.COMPANY_SELECTED);
  localStorage.removeItem(LOCALSTORAGE.CUSTOMER);
  // localStorage.removeItem(LOCALSTORAGE.CUSTOMER_NAME);
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/users/recoverypassword`,
      { ...data }
      );
    yield put(loadRecoverySuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* recoverypasswordiftoken({ payload: { data } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/users/recoverypasswordiftoken`,
      { ...data }
    );
    if (response.data.value === "senha atualizada") {
      toast.success("Senha atualizada.");
    } else {
      toast.error("Senha antiga errada.");
    }
    yield put(loadRecoverySuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* loadConfirmUser({ payload: { token } }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.get as any,
      `/user/confirm?token=${token}`
    );
    yield put(loadSuccessConfirm(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}

export function* getByClient({ payload }: any) {
  try {
    const { params } = payload;
    let response: AxiosResponse;
    const integration = sessionStorage.getItem(SESSIONSTORAGE.INTEGRATION);

    // if (integration) {
    //   response = yield call(
    //     apiIntegra(integration),
    //     `/user?limit=${params.limit ?? 10}&page=${params.page || 1}`
    //   );
    // } else {
    response = yield call(
      apiSollar.get as any,
      `/user/getByClient?limit=${params.limit ?? 10}&page=${params.page || 1}${
        params.search ? "&search=" + params.search : ""
      }${params.profession_id ? "&profession_id=" + params.profession_id : ""}`
    );
    // }

    yield put(loadSuccess(response.data));
  } catch (error) {
    yield put(loadFailure());
  }
}
