import { Reducer } from 'redux';
import { UserState, UserTypes } from './types';

export const INITIAL_STATE: UserState = {
  data: {
    companies: [],
    name: '',
    birthdate: '',
    gender: '',
    national_id: '',
    issuing_organ: '',
    fiscal_number: '',
    mother_name: '',
    nationality: '',
    address: {
      postal_code: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: '',
    },
    email: '',
    phone: '',
    cellphone: '',
    user_type_id: '',
    specialties: [],
    council_number: '',
    active: true,
  },
  list: [],
  success: false,
  error: false,
  loading: false,
};

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false, };
    case UserTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false
      };
    case UserTypes.LOAD_REQUEST_USER_BY_ID:
      return {
        ...state, error: false, loading: true, success: false
      }
    case UserTypes.LOAD_SUCCCES_USER_BY_ID:
      return {
        ...state,
        data: {...action.payload.data},
        loading: false,
        error: false,
        success: false,
      }
    case UserTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case UserTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
          phone: action.payload.data.phones[0].number,
          cellphone: action.payload.data.phones[1].number,
        },
        loading: false,
        error: false,
        success: true
      }
    case UserTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true, success: false,
      };
    case UserTypes.CREATE_USER_REQUEST:
      return {
        ...state, loading: true, error: false, success: false,
      };
    case UserTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...action.payload.data,
          phone: action.payload.data.phones[0].number,
          cellphone: action.payload.data.phones[1].number,
        },
        loading: false,
        error: false,
        success: true
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
            number: '',
            district: action.payload.data.bairro,
            city: action.payload.data.localidade,
            state: action.payload.data.uf,
            complement: action.payload.data.complemento,
          }
        },
        loading: false,
        error: false,
        success: false,
      };
    default:
      return state;
  }
}

export default reducer;
