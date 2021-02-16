import { Reducer } from 'redux';
import { AreaState, AreaTypes } from './types';

export const INITIAL_STATE: AreaState = {
  data: {
    name: '',
    supply_days: 0,
    week_day: 0,
    users: [],
    neighborhoods: [],
    active: true,
  },
  list: {
    data: [],
    limit: '10',
    page: '1',
    total: 0
  },
  districts: [],
  error: false,
  loading: false,
};

const reducer: Reducer<AreaState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AreaTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false, };
    case AreaTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false
      };
    case AreaTypes.LOAD_REQUEST_AREA_BY_ID:
      return {
        ...state, error: false, loading: true, success: false
      }
    case AreaTypes.LOAD_SUCCCES_AREA_BY_ID:
      return {
        ...state,
        data: {...action.payload.data},
        loading: false,
        error: false,
        success: false,
      }
    case AreaTypes.UPDATE_AREA_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case AreaTypes.UPDATE_AREA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    case AreaTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        list: {
          data: [],
          limit: '10',
          page: '1',
          total: 0
        }
      };
    case AreaTypes.CREATE_AREA_REQUEST:
      return {
        ...state, loading: true, error: false, success: false,
      };
    case AreaTypes.CREATE_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      };
    case AreaTypes.LOAD_SUCCCES_GET_DISTRICTS:
      return {
        ...state,
        districts: action.payload.data,
        loading: false,
        error: false,
        success: false
      };
    case AreaTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };
    default:
      return state;
  }
}

export default reducer;
