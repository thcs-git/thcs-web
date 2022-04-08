import { Reducer } from "redux";
import { ExamsTypes, ExamsState } from "./types";

export const INITIAL_STATE: ExamsState = {
  data: {
    data: [],
    total: 0,
  },
  loading: false,
  success: false,
  error: false,
};
const reducer: Reducer<ExamsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ExamsTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case ExamsTypes.LOAD_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        data: action.payload,
      };
    case ExamsTypes.LOAD_FAILURE:
      return {
        loading: false,
        error: true,
        success: false,
        data: INITIAL_STATE.data,
      };
    default:
      return state;
  }
};
export default reducer;
