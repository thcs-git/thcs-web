import { Reducer } from 'redux';
import { DocumentState, DocumentTypes } from './types';

export const INITIAL_STATE: DocumentState = {
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

const reducer: Reducer<DocumentState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DocumentTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false, };
    case DocumentTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false
      };
    case DocumentTypes.CREATE_DOCUMENT_REQUEST:
      return {
        ...state, loading: true, error: false, success: false,
      };
    case DocumentTypes.CREATE_DOCUMENT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true
      };
    case DocumentTypes.LOAD_SUCCESS_BY_CARE_ID:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        error: false,
        success: true
      };
    default:
      return state;
  }
}

export default reducer;
