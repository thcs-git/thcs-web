import { Reducer } from "redux";
import { MeasurementsState, MeasurementsTypes } from "./types";

export const INITIAL_STATE: MeasurementsState = {
  data: [
    {
      _id: "",
      list: [
        {
          _id: "",
          attendance_id: "",
          canceled: false,
          company_id: "",
          created_at: "",
          created_by: [
            {
              _id: "",
              companies_links: [
                {
                  _id: "",
                  active: false,
                  companie_id: "",
                  customer_id: "",
                  exp: "",
                  function: "",
                  id_integration: "",
                  linked_at: "",
                },
              ],
              name: "",
            },
          ],
          itens: [
            {
              _id: "",
              name: "",
              reference: "", //tipar depois
              type: "",
              unit_id: "", //tipar depois
              value: "",
            },
          ],
          patient_id: "",
        },
      ],
    },
  ],
  loading: false,
  success: false,
  error: false,
};

const reducer: Reducer<MeasurementsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MeasurementsTypes.LOAD_REQUEST:
      return { ...state, loading: true };
    case MeasurementsTypes.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        data: action.payload,
      };
    case MeasurementsTypes.LOAD_FAILURE:
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
