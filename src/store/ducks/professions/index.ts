import { Reducer } from "redux";
import { ProfessionState, ProfessionTypes } from "./types";

export const INITIAL_STATE: ProfessionState = {
  data: {
    name: "",
    describe: "",
    active: true,
  },
  list: {
    data: [],
    limit: "10",
    page: "1",
    total: 0,
  },
  error: false,
  loading: false,
  success: false,
  isRegistrationCompleted: false,
};

const reducer: Reducer<ProfessionState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfessionTypes.REGISTRAION_COMPLETED:
      return {
        ...state,
        data: {
          ...state.data,
          _id: action.payload.id,
        },
        isRegistrationCompleted: action.payload.value,
      };
    case ProfessionTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false };
    case ProfessionTypes.LOAD_SUCCCES:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };

    case ProfessionTypes.UPDATE_PROFESSION_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true,
      };
    case ProfessionTypes.UPDATE_PROFESSION_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case ProfessionTypes.LOAD_FAILURE:
      return {
        ...INITIAL_STATE,
        loading: false,
        error: true,
        success: false,
        list: {
          data: [],
          limit: "10",
          page: "1",
          total: 0,
        },
      };
    case ProfessionTypes.LOAD_FAILURE_CREATE_PROFESSION:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case ProfessionTypes.CREATE_PROFESSION_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case ProfessionTypes.CREATE_PROFESSION_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };

    case ProfessionTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };
    default:
      return state;
  }
};

export default reducer;
