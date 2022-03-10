import { Reducer } from "redux";
import { AllergiesState, AllergiesTypes } from "./types";

export const INITIAL_STATE: AllergiesState = {
  data: [
    {
      allergy: [
        {
          __v: 0,
          _id: "",
          active: false,
          care_id: "",
          company: "",
          created_at: "",
          created_by: {
            _id: "",
            email: "",
            name: "",
          },
          deny: false,
          description: "",
          observations: "",
          pacient_id: "",
          patient_id: {
            _id: "",
            name: "",
          },
          severity: "",
          type: "",
        },
      ],
      event: "",
    },
  ],
  loading: false,
  success: false,
  error: false,
};

const reducer: Reducer<AllergiesState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AllergiesTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case AllergiesTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        data: action.payload,
      };
    case AllergiesTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
