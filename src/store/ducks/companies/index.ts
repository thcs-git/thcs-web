import { Reducer } from 'redux';
import { CompanyState, CompanyTypes } from './types';

export const INITIAL_STATE: CompanyState = {
  data: {
    id: '',
    customerId: '',
    name: '',
    fantasyName: '',
    fiscalNumber: '',
    address: {
      postalCode: '',
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
    active: true,
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
        address: {
          ...state.data.address,
          postalCode: action.payload.data.cep,
          street: action.payload.data.logradouro,
          number: '',
          district: action.payload.data.bairro,
          city: action.payload.data.localidade,
          state: action.payload.data.uf,
          complement: action.payload.data.complemento,
        }
      }
      };
    default:
      return state;
  }
}

export default reducer;
