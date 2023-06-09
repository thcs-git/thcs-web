import { Reducer } from "redux";
import { CareState, CareTypes } from "./types";

export const INITIAL_STATE: CareState = {
  data: {
    mot_alta: "",
    speciality: "",
    tipo: "",
    health_insurance_id: "",
    health_plan_id: "",
    health_sub_plan_id: "",
    contract: "",
    health_plan_card_number: "",
    health_plan_card_validate: "",
    origin_id: "",
    accommodation_type_id: "",
    care_type_id: "",
    procedure_id: "",
    cid_id: "",
    user_id: "",
    area_id: "",
    status: "", // Pre-Atendimento, Em atendimento, Cancelado, Finalizad,
    created_at: "",
    dt_alta: "",
    updated_at: "",
    qrCode: "",
  },
  list: {
    data: [],
    limit: "10",
    page: "1",
    total: 0,
  },
  list2: {
    data: [],
    limit: "1000",
    page: "1",
    total: 0,
  },
  history: {
    data: [],
    limit: "10",
    page: "1",
    total: 0,
  },
  error: false,
  loading: false,
  success: false,
  healthInsurance: [],
  healthPlan: [],
  healthSubPlan: [],
  accommondation_type: [],
  care_type: [],
  cid: [],
  release_reason: [],
  release_referral: [],
  documentGroupSocioAmbiental: {},
  documentSocioAmbiental: {},
  documentGroupAbemid: {},
  documentAbemid: {},
  documentGroupNead: {},
  documentNead: {},
  document: "",
  schedule: [],
  evolution: {
    data: [],
    error: false,
    loading: false,
    success: false,
  },
  checkin: {
    loading: false,
    success: false,
    error: false,
    data: [],
  },
};

const reducer: Reducer<CareState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CareTypes.LOAD_REQUEST:
      return { ...state, loading: true, success: false };
    case CareTypes.LOAD_PATIENT_REQUEST:
      return { ...state, loading: true, success: false };
    case CareTypes.SEARCH_PATIENT_SUCCESS:
      return {
        ...state,
        data: INITIAL_STATE.data,
        list2: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case CareTypes.LOAD_SUCCESS:
      return {
        ...state,
        data: INITIAL_STATE.data,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    // Health Insurance
    case CareTypes.HEALTH_INSURANCE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.HEALTH_INSURANCE_SUCCESS:
      return {
        ...state,
        healthInsurance: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    // Accommodation type
    case CareTypes.TYPE_ACCOMMODATION_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.TYPE_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        accommondation_type: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    // Care type
    case CareTypes.CARE_TYPE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.CARE_TYPE_SUCCESS:
      return {
        ...state,
        care_type: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    // CID
    case CareTypes.LOAD_CID_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.SEARCH_CID_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.SEARCH_CID_SUCCESS:
      return {
        ...state,
        cid: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    // Release Reason
    case CareTypes.LOAD_RELEASE_REASON_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.RELEASE_REASON_SUCCESS:
      return {
        ...state,
        release_reason: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    // Release Reason
    case CareTypes.LOAD_RELEASE_REFERRAL_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.RELEASE_REFERRAL_SUCCESS:
      return {
        ...state,
        release_referral: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case CareTypes.HEALTH_PLAN_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.HEALTH_PLAN_SUCCESS:
      return {
        ...state,
        healthPlan: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case CareTypes.HEALTH_SUBPLAN_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.HEALTH_SUBPLAN_SUCCESS:
      return {
        ...state,
        healthSubPlan: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case CareTypes.SEARCH_CARE_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.SEARCH_CARE_SUCCESS:
      return {
        ...state,
        data: INITIAL_STATE.data,
        list: action.payload.data,
        loading: false,
        success: false,
        error: false,
      };
    case CareTypes.LOAD_REQUEST_CARE_BY_ID:
      return {
        ...state,
        error: false,
        loading: true,
        success: false,
      };
    case CareTypes.LOAD_SUCCESS_CARE_BY_ID:
      return {
        ...state,
        data: { ...action.payload.data },
        loading: false,
        error: false,
        success: false,
      };
    case CareTypes.UPDATE_CARE_REQUEST:
      return {
        ...state,
        data: action.payload.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.UPDATE_CARE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.TRANSFER_CARE_REQUEST:
      return {
        ...state,
        data: INITIAL_STATE.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.TRANSFER_CARE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DELETE_CARE_REQUEST:
      return {
        ...state,
        data: INITIAL_STATE.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DELETE_CARE_SUCCESS:
      return {
        ...state,
        data: INITIAL_STATE.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case CareTypes.SEARCH_CARE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.CREATE_CARE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.CREATE_CARE_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };

    //SOCIOAMBIENTAL
    case CareTypes.DOCUMENT_GROUP_SOCIOAMBIENTAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_GROUP_SOCIOAMBIENTAL:
      return {
        ...state,
        documentGroupSocioAmbiental: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_SOCIOAMBIENTAL_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_SOCIOAMBIENTAL:
      return {
        ...state,
        documentSocioAmbiental: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_SOCIOAMBIENTAL_STORE_REQUEST:
      return {
        ...state,
        documentSocioAmbiental: action.payload.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_SOCIOAMBIENTAL_STORE:
      return {
        ...state,
        documentSocioAmbiental: {
          ...action.payload.data,
          loading: false,
          error: false,
          success: true,
        },
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_SOCIOAMBIENTAL_UPDATE_REQUEST:
      return {
        ...state,
        documentSocioAmbiental: action.payload.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_SOCIOAMBIENTAL_UPDATE:
      return {
        ...state,
        documentSocioAmbiental: {
          ...action.payload.data,
          loading: false,
          error: false,
          success: true,
        },
        loading: false,
        error: false,
        success: true,
      };

    // ABEMID
    case CareTypes.DOCUMENT_GROUP_ABEMID_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_GROUP_ABEMID:
      return {
        ...state,
        documentGroupAbemid: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_ABEMID_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_ABEMID:
      return {
        ...state,
        documentAbemid: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_ABEMID_STORE_REQUEST:
      return {
        ...state,
        documentAbemid: action.payload.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_ABEMID_STORE:
      return {
        ...state,
        documentAbemid: {
          ...action.payload.data,
          loading: false,
          error: false,
          success: true,
        },
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_ABEMID_UPDATE_REQUEST:
      return {
        ...state,
        documentAbemid: action.payload.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_ABEMID_UPDATE:
      return {
        ...state,
        documentAbemid: {
          ...action.payload.data,
          loading: false,
          error: false,
          success: true,
        },
        loading: false,
        error: false,
        success: true,
      };

    // NEAD
    case CareTypes.DOCUMENT_GROUP_NEAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_GROUP_NEAD:
      return {
        ...state,
        documentGroupNead: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_NEAD_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_NEAD:
      return {
        ...state,
        documentNead: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_NEAD_STORE_REQUEST:
      return {
        ...state,
        documentNead: action.payload.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_NEAD_STORE:
      return {
        ...state,
        documentNead: {
          ...action.payload.data,
          loading: false,
          error: false,
          success: true,
        },
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DOCUMENT_NEAD_UPDATE_REQUEST:
      return {
        ...state,
        documentNead: action.payload.data,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DOCUMENT_NEAD_UPDATE:
      return {
        ...state,
        documentNead: {
          ...action.payload.data,
          loading: false,
          error: false,
          success: true,
        },
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.LOAD_DOCUMENT_REQUEST:
      return {
        ...state,
        document: {},
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.LOAD_DOCUMENT_SUCCESS:
      return {
        ...state,
        document: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.LOAD_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.LOAD_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.CREATE_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.CREATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.UPDATE_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        schedule: action.payload.data,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.DELETE_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.LOAD_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case CareTypes.LOAD_HISTORY_SUCCESS:
      return {
        ...state,
        history: action.payload.data,

        loading: false,
        error: false,
        success: true,
      };
    case CareTypes.LOAD_HISTORY_FAILURE:
      return {
        ...state,
        history: INITIAL_STATE.history,
        loading: false,
        success: false,
        error: true,
      };
    case CareTypes.LOAD_EVOLUTION_REQUEST:
      return {
        ...state,
        evolution: {
          ...state.evolution,
          loading: true,
          success: false,
          error: false,
        },
      };
    case CareTypes.LOAD_EVOLUTION_SUCCESS:
      return {
        ...state,
        evolution: {
          data: action.payload,
          loading: false,
          error: false,
          success: true,
        },
      };
    case CareTypes.LOAD_EVOLUTION_FAILURE:
      return {
        ...state,
        evolution: {
          data: [],
          loading: false,
          error: true,
          success: false,
        },
      };
    case CareTypes.LOAD_CHECKIN_REQUEST:
      return {
        ...state,
        checkin: {
          ...state.checkin,
          loading: true,
          success: false,
          error: false,
        },
      };
    case CareTypes.LOAD_CHECKIN_SUCCESS:
      return {
        ...state,
        checkin: {
          data: action.payload,
          loading: false,
          success: true,
          error: false,
        },
      };
    case CareTypes.LOAD_CHECKIN_FAILURE:
      return {
        ...state,
        checkin: { data: [], loading: false, success: false, error: true },
      };
    case CareTypes.LOAD_CHECKIN_REPORT_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.LOAD_CHECKIN_REPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
    case CareTypes.LOAD_CHECKIN_REPORT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
      };
    case CareTypes.LOAD_CHECKIN_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.LOAD_CHECKIN_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
    case CareTypes.LOAD_EVOLUTION_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.LOAD_EVOLUTION_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
    case CareTypes.LOAD_MEASUREMENT_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.LOAD_MEASUREMENT_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
    case CareTypes.LOAD_ALLERGY_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.LOAD_ALLERGY_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };
    case CareTypes.LOAD_ADVERSE_EVENT_FILTER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
      };
    case CareTypes.LOAD_ADVERSE_EVENT_FILTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: false,
      };

    case CareTypes.CLEAN:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;
