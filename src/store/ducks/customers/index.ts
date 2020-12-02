import { Reducer } from 'redux';
import { CustomerState, CustomerTypes } from './types';

export const INITIAL_STATE: CustomerState = {
  data: {
    id: '',
    socialName: '',
    fantasyName: '',
    fiscalNumber: '',
    address: [{
      postal_code: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: '',
      neighborhood: ''
    }],
    email: '',
    phones: [{
      number: '',
      telegram: false,
      whatsapp: false,
    }],
    cellphone: ''
  },
  list: [],
  error: false,
  loading: false,
};

const reducer: Reducer<CustomerState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CustomerTypes.LOAD_SUCCCES:
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
      };
    case CustomerTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true
      };
    default:
      return state;
  }
}

export default reducer;
