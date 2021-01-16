import { Reducer } from 'redux';
import { DocumentGroupState, DocumentGroupTypes } from './types';

export const INITIAL_STATE: DocumentGroupState = {
  data: {

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

const reducer: Reducer<DocumentGroupState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DocumentGroupTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false, };
    case DocumentGroupTypes.LOAD_SUCCCES:
      return {
        ...state,
        data: action.payload.data,
        // list: action.payload.data,
        loading: false,
        success: false,
        error: false
      };
    case DocumentGroupTypes.LOAD_SUCCESS_DOCUMENTS_BY_ID:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false
      };
    default:
      return state;
  }
}

export default reducer;
