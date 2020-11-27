import { Reducer } from 'redux';
import { CustomerState, CustomerTypes } from './types';

export const INITIAL_STATE: CustomerState = {
  data: {
    id: '',
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
    case CustomerTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true
      };
    default:
      return state;
  }
}

export default reducer;
