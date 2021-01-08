import { Reducer } from 'redux';
import { CareState, CareTypes } from './types';

export const INITIAL_STATE: CareState = {
  data: {
    health_insurance_id: '',
    health_plan_id: '',
    health_sub_plan_id: '',
    contract: '',
    health_plan_card_number: '',
    health_plan_card_validate: '',
    origin_id: '',
    accommodation_type_id: '',
    care_type_id: '',
    procedure_id: '',
    cid_id: '',
    user_id: '',
    area_id: '',
    status: '', // Pre-Atendimento, Em atendimento, Cancelado, Finalizad,
    created_at: '',
    updated_at: '',
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

const reducer: Reducer<CareState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CareTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false, };
    case CareTypes.LOAD_SUCCCES:
    case CareTypes.SEARCH_CARE_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false
      };
    case CareTypes.LOAD_REQUEST_CARE_BY_ID:
      return {
        ...state, error: false, loading: true, success: false
      }
    case CareTypes.LOAD_SUCCCES_CARE_BY_ID:
      return {
        ...state,
        data: {...action.payload.data},
        loading: false,
        error: false,
        success: false,
      }
    case CareTypes.UPDATE_CARE_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case CareTypes.UPDATE_CARE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    case CareTypes.LOAD_FAILURE:
      return {
        ...state, loading: false, error: true, success: false,
      };
    case CareTypes.CREATE_CARE_REQUEST:
      return {
        ...state, loading: true, error: false, success: false,
      };
    case CareTypes.CREATE_CARE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      };
    default:
      return state;
  }
}

export default reducer;
