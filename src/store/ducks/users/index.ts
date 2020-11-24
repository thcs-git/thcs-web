import { Reducer } from 'redux';
import { UserState, UserTypes } from './types';

export const INITIAL_STATE: UserState = {
  data: {
    companies: [],
    name: '',
    birthdayDate: '',
    gender: '',
    rg: '',
    issuing_organ: '',
    cpf: '',
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
    userType: '',
    especialties: [],
    council: '',
    councilNumber: '',
    active: true,
  },
  success: false,
  error: false,
  loading: false,
};

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case UserTypes.LOAD_SUCCCES:
      return {
        ...state,
        data: action.payload,
        loading: false,
        success: false,
      };
    case UserTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true
      };
    case UserTypes.CREATE_USER_REQUEST:
      return {
        ...state, loading: false, error: false
      };
    case UserTypes.CREATE_USER_SUCCESS:
      return {
        ...state,
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
      };
    default:
      return state;
  }
}

export default reducer;
