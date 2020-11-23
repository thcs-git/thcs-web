import { Reducer } from 'redux';
import { UserState, UserTypes } from './types';

export const INITIAL_STATE: UserState = {
  data: {
    id: '',
    companyId: '',
    name: '',
    birthdayDate: '',
    gender: '',
    rg: '',
    dispatchingAgency: '',
    fiscalNumber: '',
    motherName: '',
    nationality: '',
    postalCode: '',
    city: '',
    neighborhood: '',
    address: '',
    addressNumber: '',
    addressComplement: '',
    state: '',
    email: '',
    phone: '',
    cellphone: '',
    userType: '',
    especialties: [],
    council: '',
    councilNumber: '',
    active: true,
  },
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
      };
    case UserTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true
      };
    default:
      return state;
  }
}

export default reducer;
