import { Reducer } from "redux";
import { UserState, UserTypes } from "./types";

export const INITIAL_STATE: UserState = {
  data: {
    companies: [],
    companies_links: [],
    name: "",
    birthdate: "",
    gender: "",
    national_id: "",
    issuing_organ: "",
    fiscal_number: "",
    mother_name: "",
    nationality: "",
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
    phone: "",
    cellphone: "",
    user_type_id: "",
    specialties: [],
    council_state: "",
    council_number: "",
    verified: "",
    customer_id: "",
    active: true,
    professions: [],
  },
  list: {
    data: [],
    limit: "10",
    page: "1",
    total: 0,
  },

  success: false,
  error: false,
  loading: false,
  successRecovery: false,
};

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false };
    case UserTypes.LOAD_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case UserTypes.LOAD_REQUEST_USER_DISENGAGED:
      return { ...state, loading: true, success: false };
    case UserTypes.LOAD_RESPONSE_USER_DISENGAGED:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case UserTypes.LOAD_REQUEST_USER_BY_ID:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case UserTypes.LOAD_SUCCESS_USER_BY_ID:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        loading: false,
        error: false,
        success: false,
      };
    case UserTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true,
      };
    case UserTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
          phone: action.payload.data.phones[0]?.number,
          cellphone: action.payload.data.phones[1]?.number,
        },
        loading: false,
        error: false,
        success: true,
      };
    case UserTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case UserTypes.CREATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case UserTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
          phone: action.payload.data.phones[0].number,
          cellphone: action.payload.data.phones[1]?.number,
        },
        loading: false,
        error: false,
        success: true,
      };
    case UserTypes.REGISTER_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case UserTypes.ERROR_RESPONSE_ADDRESS:
      return {
        ...state,
        data: {
          ...state.data,
          address: {
            ...state.data.address,
            postal_code: "",
            street: "",
            number: "",
            district: "",
            city: "",
            state: "",
            complement: "",
          },
        },
        loading: false,
        error: true,
        success: false,
      };
    case UserTypes.LOAD_RESPONSE_ADDRESS:
      return {
        ...state,
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
        loading: false,
        error: false,
        success: false,
      };
    case UserTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };
    case UserTypes.LOAD_RESPONSE_PROFESSION:
      return {
        ...state,
        data: {
          ...state.data,
          professions: action.payload.data,
        },
        loading: false,
        error: false,
        success: false,
        successRecovery: false,
      };
    case UserTypes.LOAD_RESPONSE_USER_TYPES:
      return {
        ...state,
        data: {
          ...state.data,
          user_types: action.payload.data,
        },
        loading: false,
        error: false,
        success: false,
        successRecovery: false,
      };
    case UserTypes.LOAD_SUCCESS_USER_BY_EMAIL:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        successRecovery: false,
      };
    case UserTypes.LOAD_REQUEST_CHECK_EMAIL:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        successRecovery: false,
      };

    case UserTypes.LOAD_RESPONSE_CHECK_EMAIL:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload.data,
        },
        loading: false,
        error: false,
        success: true,
      };
    case UserTypes.LOAD_SUCCESS_RECOVERY_PASSWORD:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };
    case UserTypes.CLEAN:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;
