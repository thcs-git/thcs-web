import { Reducer } from "redux";
import { LayoutState, LayoutTypes } from "./types";
import { UserTypes } from "../users/types";

export const INITIAL_STATE: LayoutState = {
  data: {
    token: "",
    rights: [],
    integration: null,
    integration_name: null,
    menuSelected: "",
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
        data: action.payload.data,
        loading: false,
        error: true,
        success: false,
      };
    case LayoutTypes.CLEAN:
      return INITIAL_STATE;
    case LayoutTypes.CHANGE_MENU_SELECTED:
      return {
        ...state,
        data: {
          ...state.data,
          menuSelected: action.payload,
        },
      };
    default:
      return state;
  }
};
export default reducer;
