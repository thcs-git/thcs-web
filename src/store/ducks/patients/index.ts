import { Reducer } from 'redux';
import { PatientState, PatientTypes } from './types';

export const INITIAL_STATE: PatientState = {
  data: {
    _id: '',
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
    sus_card: '',
    blood_type: '',
    organ_donor: false,
    active: true
    },
    list: [],
    error: false,
    loading: false,
    success: false,
};

const reducer: Reducer<PatientState> = (state = INITIAL_STATE, action) => {
  console.log('state', state)

  switch (action.type) {
    case PatientTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false, };
    case PatientTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false
      };
    case PatientTypes.LOAD_REQUEST_PATIENT_BY_ID:
      return {
        ...state, error: false, loading: true, success: false
      }
    case PatientTypes.LOAD_SUCCCES_PATIENT_BY_ID:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: false,
      }
    case PatientTypes.UPDATE_PATIENT_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case PatientTypes.UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    case PatientTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true, success: false,
      };
    case PatientTypes.CREATE_PATIENT_REQUEST:
      return {
        ...state, loading: true, error: false, success: false,
      };
    case PatientTypes.CREATE_PATIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      };
    case PatientTypes.LOAD_RESPONSE_ADDRESS:
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
