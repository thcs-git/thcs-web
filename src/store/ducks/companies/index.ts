import { Reducer } from 'redux';
import { CompanyState, CompanyTypes } from './types';

export const INITIAL_STATE: CompanyState = {
  data: {
    id: '',
    customerId: '',
    socialName: '',
    fantasyName: '',
    fiscalNumber: '',
    postalCode: '',
    city: '',
    neighborhood: '',
    address: '',
    addressNumber: '',
    addressComplement: '',
    email: '',
    phone: '',
    cellphone: '',
  },
  error: false,
  loading: false,
};

const reducer: Reducer<CompanyState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CompanyTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CompanyTypes.LOAD_SUCCCES:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case CompanyTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true
      };
    case CompanyTypes.LOAD_RESPONSE_ADDRESS:
      return {
      ...state,
      loading: false,
      error: false,
      data: {
        ...state.data,
        postalCode: action.payload.data.cep,
        city: action.payload.data.localidade,
        neighborhood: action.payload.data.bairro,
        address: action.payload.data.logradouro,
        addressComplement: action.payload.data.complemento,
      }
      };
    default:
      return state;
  }
}

export default reducer;
