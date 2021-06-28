import { Reducer } from "redux";
import { MeasurementTypes, MeasurementState } from "./types";

export const INITIAL_STATE: MeasurementState = {
  data: {
    _id: "",
    measurement_item: {
      _id: "",
      name: "",
      reference: "",
      step_interval: "",
      unit: {
        _id: "",
        name: "",
        short_name: "",
      },
    },
    value: "",
    created_at: "",
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
};
const reducer: Reducer<MeasurementState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MeasurementTypes.LOAD_REQUEST_MEASUREMENT:
      return { ...state, loading: true, success: false };
    case MeasurementTypes.LOAD_SUCCESS_MEASUREMENT:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case MeasurementTypes.LOAD_FAILURE:
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
    default:
      return state;
  }
};
export default reducer;
