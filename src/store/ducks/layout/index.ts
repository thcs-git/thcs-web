import {Reducer} from "redux";
import {LayoutState, LayoutTypes} from "./types"
import {UserTypes} from "../users/types";

export const INITIAL_STATE: LayoutState = {
  data: {
    rights: [],
  },
  success: false,
  error: false,
  loading: false,
};

const reducer: Reducer<LayoutState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LayoutTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false };
    case LayoutTypes.LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        success: true,
        error: false,
      };
    case LayoutTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case UserTypes.CLEAN:
      return INITIAL_STATE;
    default:
      return state;
  }
}
export default reducer;
