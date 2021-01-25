import { Reducer } from 'redux';
import { PrescriptionState, PrescriptionTypes } from './types';

export const INITIAL_STATE: PrescriptionState = {
  data: {
    companies: [],
    name: '',
    social_name: '',
    birthdate: '',
    gender: '',
    mother_name: '',
    profession: '',
    nationality: '',
    naturalness: '',
    marital_status: '',
    fiscal_number: '',
    national_id: '',
    issuing_organ: '',
    address_id: {
      postal_code: '',
      street: '',
      number: '',
      district: '',
      city: '',
      state: '',
      complement: '',
    },
    phones: [],
    email: '',
    sus_card: '',
    blood_type: '',
    organ_donor: false,
    active: true
    },
    list: {
      data: [],
      limit: '10',
      page: '1',
      total: 0
    },
    error: false,
    loading: false,
    success: false,
};

const reducer: Reducer<PrescriptionState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PrescriptionTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case PrescriptionTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
      };
    case PrescriptionTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true, success: false,
        list: {
          data: [],
          limit: '10',
          page: '1',
          total: 0
        }
      };
    case PrescriptionTypes.LOAD_SUCCCES_PRESCRIPTION_BY_ID:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: false,
      };

    case PrescriptionTypes.UPDATE_PRESCRIPTION_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case PrescriptionTypes.UPDATE_PRESCRIPTION_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    case PrescriptionTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };
    default:
      return state;
  }
}

export default reducer;
