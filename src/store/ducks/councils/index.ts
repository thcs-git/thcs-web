import { Reducer } from 'redux';
import { CouncilState, CouncilTypes } from './types';

export const INITIAL_STATE: CouncilState = {
  data: {
    company_id: { _id: '' },
    name: '',
    describe: '',
    initials: '',
    federative_unit: '',
    active: true,
  },
  list: [],
  error: false,
  loading: false,
  success: false,
};

const reducer: Reducer<CouncilState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CouncilTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CouncilTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
      };
    case CouncilTypes.LOAD_FAILURE:
      return {
      ...state, loading: false, error: true
      };
    case CouncilTypes.LOAD_SUCCESS_COUNCIL_BY_ID:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: false,
      };

    case CouncilTypes.UPDATE_COUNCIL_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true
      }
    case CouncilTypes.UPDATE_COUNCIL_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      }
    default:
      return state;
  }
}

export default reducer;
