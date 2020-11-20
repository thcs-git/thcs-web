import { Reducer } from 'redux';
import { CompanyState, CompanyTypes } from './types';

export const INITIAL_STATE: CompanyState = {
  data: {
    id: '',
    companyId: '',
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
    default:
      return state;
  }
}

export default reducer;
