import { registerUnconfirmedUserRequest } from "./../unconfirmeduser/actions";
import { Reducer } from "redux";
import { CustomerState, CustomerTypes } from "./types";

export const INITIAL_STATE: CustomerState = {
  data: {
    active: true,
    _id: "",
    name: "",
    social_name: "",

    fiscal_number: "",
    address: {
      postal_code: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      complement: "",
    },
    email: "",
    phones: [
      {
        cellphone: "",
        phone: "",
        telegram: false,
        whatsapp: false,
      },
    ],
    responsible_user: "",
    cellphone: "",
    phone: "",
  },
  list: {
    data: [],
    limit: "10",
    page: "1",
    total: 0,
  },
  permission: {
    _id: "",
    rights: [],
    customer_id: "",
    name: "",
    active: false,
  },
  error: false,
  loading: false,
  success: false,
  errorCep: false,
  permissionLoad: false,
  permissionSuccess: false,
  requestSucess: false,
};

const reducer: Reducer<CustomerState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerTypes.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CustomerTypes.LOAD_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
      };
    case CustomerTypes.LOAD_SUCCESS_BY_ID:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        success: false,
        list: INITIAL_STATE.list,
        requestSucess: true,
        permissionSuccess: false,
      };
    case CustomerTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        list: INITIAL_STATE.list,
      };
    case CustomerTypes.LOAD_FAILURE_CEP:
      return {
        ...state,
        loading: false,
        errorCep: true,
        success: true,
        list: {
          data: [],
          limit: "10",
          page: "1",
          total: 0,
        },
      };

    case CustomerTypes.CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
        isRegistrationCompleted: true,
      };
    case CustomerTypes.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CustomerTypes.LOAD_REQUEST_ADDRESS:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CustomerTypes.LOAD_RESPONSE_ADDRESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorCep: false,
        data: {
          ...state.data,
          address: {
            ...state.data.address,
            postal_code: action.payload.data.cep,
            street: action.payload.data.logradouro,
            number: "",
            district: action.payload.data.bairro,
            city: action.payload.data.localidade,
            state: action.payload.data.uf,
            complement: action.payload.data.complemento,
          },
        },
      };
    case CustomerTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };

    case CustomerTypes.LOAD_REQUEST_PERMISSION:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        permissionLoad: false,
      };
    case CustomerTypes.LOAD_RESPONSE_PERMISSION:
      return {
        ...state,
        permission: action.payload.data,
        loading: false,
        permissionLoad: true,
      };
    case CustomerTypes.CLEAN_PERMISSION:
      return {
        ...state,
        permission: {
          _id: "",
          rights: [],
          customer_id: "",
          name: "",
          active: false,
        },
        loading: false,
        permissionLoad: false,
      };
    case CustomerTypes.UPDATE_PERMISSION_SUCCESS:
      return {
        ...state,
        permission: action.payload.data,
        loading: false,
        error: false,
        permissionSuccess: true,
      };
    case CustomerTypes.CREATE_PERMISSION_SUCCESS:
      return {
        ...state,
        permission: action.payload.data,
        loading: false,
        permissionSuccess: true,
      };

    case CustomerTypes.CLEAN:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default reducer;
