import { Reducer } from "redux";
import { CustomerLogsTypes, CustomerLogsState } from "./types";

export const INITIAL_STATE: CustomerLogsState = {
  data: [],
  loading: false,
  success: false,
  error: false,
};

const reducer: Reducer<CustomerLogsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CustomerLogsTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case CustomerLogsTypes.LOAD_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        data: action.payload,
      };
    case CustomerLogsTypes.LOAD_FAILURE:
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
