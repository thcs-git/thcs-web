import { Reducer } from "redux";
import { FormTypes, FormState } from "./types";

export const INITIAL_STATE: FormState = {
  data: [],
  loading: false,
  success: false,
  error: false,
};

const reducer: Reducer<FormState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case FormTypes.LOAD_SUCCESS:
      return {
        loading: false,
        error: false,
        success: true,
        data: action.payload,
      };
    case FormTypes.LOAD_FAILURE:
      return {

        loading: false,
        error: true,
        success: false,
        data: INITIAL_STATE.data,
      };
    case FormTypes.LOAD_FORMS_FILTER_REQUEST:
      return{
        ...state,
        loading:true,
        error:false,
        success:false
      }
    case FormTypes.LOAD_FORMS_FILTER_SUCCESS:
      return {
        ...state,
        loading:false,
        success:true,
        error:false
      }
    default:
      return state;
  }
};
export default reducer;
