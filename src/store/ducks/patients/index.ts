import { Reducer } from "redux";
import { PatientState, PatientTypes } from "./types";

export const INITIAL_STATE: PatientState = {
  data: {
    companies: [],
    name: "",
    social_name: "",
    created_at: "",
    birthdate: "",
    gender: "",
    mother_name: "",
    profession: "FIELD_NOT_EXISTS_IN_PATIENT_REGISTRATION",
    nationality: "",
    naturalness: "FIELD_NOT_EXISTS_IN_PATIENT_REGISTRATION",
    marital_status: "",
    fiscal_number: "",
    national_id: "",
    issuing_organ: "",
    address_id: {
      postal_code: "",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "",
      complement: "",
    },
    area_id: "",
    phones: [{
        cellnumber:"",
        number:""
    },
    {
      cellnumber:"",
      number:""
    }
  ],
    email: "",
    sus_card: "FIELD_NOT_EXISTS_IN_PATIENT_REGISTRATION",
    blood_type: "",
    organ_donor: false,
    responsable: {
      name: "",
      phone: "",
      cellphone: "",
      relationship: "",
    },
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

const reducer: Reducer<PatientState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PatientTypes.REGISTRAION_COMPLETED:
      return {
        ...state,
        data: {
          ...state.data,
          _id: action.payload.id,
        },
        isRegistrationCompleted: action.payload.value,
      };
    case PatientTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false };
    case PatientTypes.LOAD_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: true,
        error: false,
      };
    case PatientTypes.LOAD_REQUEST_PATIENT_BY_ID:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case PatientTypes.LOAD_SUCCESS_PATIENT_BY_ID:
      return {
        ...state,
        data: { ...action.payload.data },
        loading: false,
        error: false,
        success: false,
      };
    case PatientTypes.UPDATE_PATIENT_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: true,
      };
    case PatientTypes.UPDATE_PATIENT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case PatientTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorCep: true,
        success: false,
        list: {
          data: [],
          limit: "10",
          page: "1",
          total: 0,
        },
      };
    case PatientTypes.LOAD_FAILURE_CREATE_PATIENT:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case PatientTypes.CREATE_PATIENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case PatientTypes.CREATE_PATIENT_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case PatientTypes.LOAD_RESPONSE_ADDRESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        errorCep: false,
        data: {
          ...state.data,
          address_id: {
            ...state.data.address_id,
            postal_code: action.payload.data.cep,
            street: action.payload.data.logradouro,
            number: "",
            district: action.payload.data.bairro,
            city: action.payload.data.localidade,
            state: action.payload.data.uf,
            complement: action.payload.data.complemento,
          },
        },
      };
    case PatientTypes.LOAD_PATIENT_CAPTURE:
      return { ...state, loading: true, success: false };
    case PatientTypes.LOAD_PATIENT_CAPTURE_SUCCESS:
      return {
        ...state,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case PatientTypes.SEARCH_REQUEST:
      return { ...state, loading: true, error: false };

    case PatientTypes.CLEAN:
      return INITIAL_STATE;
    default:
        return state;
  }
};

export default reducer;
