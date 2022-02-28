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
          created_by: "",
          measurements: [
            { _id: "", active: false, measurement_item_id: "", value: "" },
          ],
          user: [
            {
              __v: 0,
              _id: "",
              active: true,
              address: "",
              birthdate: "",
              cellphone: "",
              companies: [],
              companies_links: [
                {
                  _id: "",
                  active: "",
                  companie_id: "",
                  customer_id: "",
                  exp: "",
                  function: "",
                  id_integration: "",
                  linked_at: "",
                },
              ],
              council_id: "",
              council_number: "",
              council_state: "",
              created_at: "",
              customer_id: "",
              email: "",
              fiscal_number: "",
              gender: "",
              issuing_organ: "",
              main_specialty_id: "",
              mother_name: "",
              name: "",
              national_id: "",
              nationality: "",
              password: "",
              phone: "",
              phones: [
                {
                  _id: "",
                  number: "",
                  telegram: false,
                  whatsapp: false,
                },
              ],
              profession_id: "",
              specialties: [],
              type_user: "",
              user_type: "",
              user_type_id: null,
              username: "",
              verified: false,
            },
          ],
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
