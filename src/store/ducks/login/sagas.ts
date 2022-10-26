import { put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import { apiSollar } from "../../../services/axios";
import history from "../../../routes/history";
import { AxiosResponse } from "axios";

import LOCALSTORAGE from "../../../helpers/constants/localStorage";
import SESSIONSTORAGE from "../../../helpers/constants/sessionStorage";

import {
  loadSuccess,
  loadFailure,
  emailSuccess,
  emailFailure,
} from "./actions";
import _ from "lodash";

export function* doLogin({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/user/login`,
      payload?.credentials
    );

    const { data } = response;

    // localStorage.removeItem(LOCALSTORAGE.TOKEN);
    // localStorage.removeItem(LOCALSTORAGE.USERNAME);
    // localStorage.removeItem(LOCALSTORAGE.USER_ID);
    // localStorage.removeItem(LOCALSTORAGE.COMPANY_SELECTED);
    // localStorage.removeItem(LOCALSTORAGE.COMPANY_NAME);
    // localStorage.removeItem(LOCALSTORAGE.CUSTOMER);
    // localStorage.removeItem(LOCALSTORAGE.CUSTOMER_NAME);

    // localStorage.setItem(LOCALSTORAGE.TOKEN, data.token);
    localStorage.setItem(LOCALSTORAGE.TOKEN, data.token);
    localStorage.setItem(LOCALSTORAGE.USERNAME, data.name);
    localStorage.setItem(LOCALSTORAGE.USER_ID, data._id);

    const lastLastLogin = _.find(data.companies_links, {
      companie_id: {
        _id: localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED),
      },
    });

    if (lastLastLogin) {
      localStorage.setItem(
        LOCALSTORAGE.CUSTOMER,
        lastLastLogin?.companie_id?.customer_id?._id
      );

      localStorage.setItem(
        LOCALSTORAGE.CUSTOMER_NAME,
        lastLastLogin?.companie_id?.customer_id?.name
      );

      localStorage.setItem(
        LOCALSTORAGE.COMPANY_SELECTED,
        lastLastLogin?.companie_id?._id
      );

      localStorage.setItem(
        LOCALSTORAGE.COMPANY_NAME,
        lastLastLogin?.companie_id?.name
      );

      lastLastLogin?.companie_id?.customer_id?.integration &&
        sessionStorage.setItem(
          SESSIONSTORAGE.INTEGRATION,
          lastLastLogin?.companie_id?.customer_id?.integration
        );

      lastLastLogin?.companie_id?.customer_id?.integration_name &&
        sessionStorage.setItem(
          SESSIONSTORAGE.INTEGRATION_NAME,
          lastLastLogin?.companie_id?.customer_id?.integration_name
        );

      lastLastLogin?.companie_id?.customer_id?.integration_token &&
      sessionStorage.setItem(
          SESSIONSTORAGE.INTEGRATION_TOKEN,
          lastLastLogin?.companie_id?.customer_id?.integration_token
      );

      lastLastLogin?.company_external_id &&
        localStorage.setItem(
          LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED,
          lastLastLogin?.company_external_id
        );

      lastLastLogin?.user_external_id &&
        localStorage.setItem(
          LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID,
          lastLastLogin?.user_external_id
        );
    } else {
      localStorage.setItem(
        LOCALSTORAGE.CUSTOMER,
        data.companies_links[0]?.companie_id?.customer_id?._id || null
      );

      localStorage.setItem(
        LOCALSTORAGE.CUSTOMER_NAME,
        data.companies_links[0]?.companie_id?.customer_id?.name || "SEM"
      );

      localStorage.setItem(
        LOCALSTORAGE.COMPANY_SELECTED,
        data.companies_links[0]?.companie_id?._id || null
      );

      localStorage.setItem(
        LOCALSTORAGE.COMPANY_NAME,
        data.companies_links[0]?.companie_id?.name || "SEM"
      );

      data.companies_links[0]?.companie_id?.customer_id?.integration &&
        sessionStorage.setItem(
          SESSIONSTORAGE.INTEGRATION,
          data.companies_links[0]?.companie_id?.customer_id?.integration
        );

      data.companies_links[0]?.companie_id?.customer_id?.integration_name &&
        sessionStorage.setItem(
          SESSIONSTORAGE.INTEGRATION_NAME,
          data.companies_links[0]?.companie_id?.customer_id?.integration_name
        );

      data.companies_links[0]?.companie_id?.customer_id?.integration_token &&
      sessionStorage.setItem(
          SESSIONSTORAGE.INTEGRATION_TOKEN,
          data.companies_links[0]?.companie_id?.customer_id?.integration_token
      );

      data.companies_links[0]?.company_external_id &&
        localStorage.setItem(
          LOCALSTORAGE.INTEGRATION_COMPANY_SELECTED,
          data.companies_links[0]?.company_external_id
        );

      data.companies_links[0]?.user_external_id &&
        localStorage.setItem(
          LOCALSTORAGE.SOLLAR_INTEGRATION_USER_ID,
          data.companies_links[0]?.user_external_id
        );
    }

    // yield put(loadSuccess(data));

    if (localStorage.getItem(LOCALSTORAGE.CUSTOMER_NAME) != "SEM") {
      history.push("/");
    } else {
      history.push("/dashboard_user");
    }

    location.reload();
  } catch (err) {
    console.log("err", err);
    yield put(loadFailure());

    toast.error("E-mail e/ou senha errada.");
  }
}

export function* checkEmail({ payload }: any) {
  try {
    const response: AxiosResponse = yield call(
      apiSollar.post as any,
      `/user/checkemail`,
      payload.credentials
    );

    const { data } = response;
    data.token.auth &&
      localStorage.setItem(LOCALSTORAGE.TOKEN, data.token.token);
    yield put(emailSuccess(data));
  } catch (err) {
    console.log("err", err);
    yield put(emailFailure());

    toast.error("E-mail e/ou senha errada.");
  }
}
