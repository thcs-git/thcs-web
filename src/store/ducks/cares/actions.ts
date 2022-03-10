import { action } from "typesafe-actions";
import {
  CareTypes,
  CareInterface,
  LoadRequestParams,
  DocumentGroupInterface,
  DocumentInterface,
  HealthInsuranceInterface,
  HealthPlanInterface,
  ReleaseReasonInterface,
  ReleaseReferralInterface,
} from "./types";

export const loadRequest = (params: LoadRequestParams = {}) =>
  action(CareTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: CareInterface) =>
  action(CareTypes.LOAD_SUCCESS, { data });

export const loadFailure = () => action(CareTypes.LOAD_FAILURE);

export const createCareRequest = (data: CareInterface) =>
  action(CareTypes.CREATE_CARE_REQUEST, { data });
export const createCareSuccess = (data: CareInterface) =>
  action(CareTypes.CREATE_CARE_SUCCESS, { data });

export const updateCareRequest = (data: CareInterface) =>
  action(CareTypes.UPDATE_CARE_REQUEST, { data });
export const updateCareSuccess = (data: CareInterface) =>
  action(CareTypes.UPDATE_CARE_SUCCESS, { data });

export const transferCareRequest = (data: CareInterface) =>
  action(CareTypes.TRANSFER_CARE_REQUEST, { data });
export const transferCareSuccess = (data: CareInterface) =>
  action(CareTypes.TRANSFER_CARE_SUCCESS, { data });

export const deleteCareRequest = (id: string) =>
  action(CareTypes.DELETE_CARE_REQUEST, { id });
export const deleteCareSuccess = () => action(CareTypes.DELETE_CARE_SUCCESS);

export const loadCareById = (id: string) =>
  action(CareTypes.LOAD_REQUEST_CARE_BY_ID, { id });
export const loadSuccessGetCareById = (data: CareInterface) =>
  action(CareTypes.LOAD_SUCCESS_CARE_BY_ID, { data });

export const searchCareRequest = (params: any) =>
  action(CareTypes.SEARCH_CARE_REQUEST, { params });
export const searchCareSuccess = (data: CareInterface) =>
  action(CareTypes.SEARCH_CARE_SUCCESS, { data });

export const loadRequestPopUp = (params: LoadRequestParams = {}) =>
  action(CareTypes.LOAD_PATIENT_REQUEST, { params });

export const searchPatientSuccess = (data: CareInterface) =>
  action(CareTypes.SEARCH_PATIENT_SUCCESS, { data });

/**
 * Documento Socioambiental
 */

export const actionDocumentGroupSocioAmbientalRequest = () =>
  action(CareTypes.DOCUMENT_GROUP_SOCIOAMBIENTAL_REQUEST);
export const actionDocumentGroupSocioAmbiental = (
  data: DocumentGroupInterface
) => action(CareTypes.DOCUMENT_GROUP_SOCIOAMBIENTAL, { data });

export const actionDocumentSocioAmbientalRequest = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_REQUEST, { ...data });
export const actionDocumentSocioAmbiental = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_SOCIOAMBIENTAL, { data });

export const actionDocumentSocioAmbientalStoreRequest = (
  data: DocumentInterface
) =>
  action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_STORE_REQUEST, {
    ...data,
  });
export const actionDocumentSocioAmbientalStore = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_STORE, { data });

export const actionDocumentSocioAmbientalUpdateRequest = (
  data: DocumentInterface
) =>
  action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_UPDATE_REQUEST, {
    ...data,
  });
export const actionDocumentSocioAmbientalUpdate = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_UPDATE, { data });

/**
 * Documento ABEMID
 */

export const actionDocumentGroupAbemidRequest = () =>
  action(CareTypes.DOCUMENT_GROUP_ABEMID_REQUEST);
export const actionDocumentGroupAbemid = (data: DocumentGroupInterface) =>
  action(CareTypes.DOCUMENT_GROUP_ABEMID, { data });

export const actionDocumentAbemidRequest = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_ABEMID_REQUEST, { ...data });
export const actionDocumentAbemid = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_ABEMID, { data });

export const actionDocumentAbemidStoreRequest = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_ABEMID_STORE_REQUEST, {
    ...data,
  });
export const actionDocumentAbemidStore = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_ABEMID_STORE, { data });

export const actionDocumentAbemidUpdateRequest = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_ABEMID_UPDATE_REQUEST, {
    ...data,
  });
export const actionDocumentAbemidUpdate = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_ABEMID_UPDATE, { data });

/**
 * Documento NEAD
 */

export const actionDocumentGroupNeadRequest = () =>
  action(CareTypes.DOCUMENT_GROUP_NEAD_REQUEST);
export const actionDocumentGroupNead = (data: DocumentGroupInterface) =>
  action(CareTypes.DOCUMENT_GROUP_NEAD, { data });

export const actionDocumentNeadRequest = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_NEAD_REQUEST, { ...data });
export const actionDocumentNead = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_NEAD, { data });

export const actionDocumentNeadStoreRequest = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_NEAD_STORE_REQUEST, {
    ...data,
  });
export const actionDocumentNeadStore = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_NEAD_STORE, { data });

export const actionDocumentNeadUpdateRequest = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_NEAD_UPDATE_REQUEST, {
    ...data,
  });
export const actionDocumentNeadUpdate = (data: DocumentInterface) =>
  action(CareTypes.DOCUMENT_NEAD_UPDATE, { data });

export const cleanAction = () => action(CareTypes.CLEAN);

/**
 * Health Care
 */
export const healthInsuranceRequest = () =>
  action(CareTypes.HEALTH_INSURANCE_REQUEST);
export const healthInsuranceSuccess = (data: HealthInsuranceInterface) =>
  action(CareTypes.HEALTH_INSURANCE_SUCCESS, { data });

/**
 * Health Plan
 */
export const healthPlanRequest = (id: string | null) =>
  action(CareTypes.HEALTH_PLAN_REQUEST, { id });
export const healthPlanSuccess = (data: HealthPlanInterface) =>
  action(CareTypes.HEALTH_PLAN_SUCCESS, { data });

/**
 * Health Sub Plan
 */
export const healthSubPlanRequest = (id: string | null) =>
  action(CareTypes.HEALTH_SUBPLAN_REQUEST, { id });
export const healthSubPlanSuccess = (data: HealthPlanInterface) =>
  action(CareTypes.HEALTH_SUBPLAN_SUCCESS, { data });

/**
 * Accommondation type
 */
export const AccommodationTypeRequest = () =>
  action(CareTypes.TYPE_ACCOMMODATION_REQUEST);
export const AccommodationTypeSuccess = (data: HealthPlanInterface) =>
  action(CareTypes.TYPE_ACCOMMODATION_SUCCESS, { data });

/**
 * Care type
 */
export const careTypeRequest = () => action(CareTypes.CARE_TYPE_REQUEST);
export const careTypeSuccess = (data: HealthPlanInterface) =>
  action(CareTypes.CARE_TYPE_SUCCESS, { data });

/**
 * CID
 */
export const cidAllRequest = () => action(CareTypes.LOAD_CID_REQUEST);
export const cidRequest = (cid: string) =>
  action(CareTypes.SEARCH_CID_REQUEST, { cid });
export const cidSuccess = (data: HealthPlanInterface) =>
  action(CareTypes.SEARCH_CID_SUCCESS, { data });

/**
 * Release Reasons
 */

export const releaseReasonRequest = () =>
  action(CareTypes.LOAD_RELEASE_REASON_REQUEST);
export const releaseReasonSuccess = (data: ReleaseReasonInterface) =>
  action(CareTypes.RELEASE_REASON_SUCCESS, { data });

/**
 * Release Referral
 */

export const releaseReferralRequest = () =>
  action(CareTypes.LOAD_RELEASE_REFERRAL_REQUEST);
export const releaseReferralSuccess = (data: ReleaseReferralInterface) =>
  action(CareTypes.RELEASE_REFERRAL_SUCCESS, { data });

/**
 * Document
 */
export const loadDocumentRequest = (id: string) =>
  action(CareTypes.LOAD_DOCUMENT_REQUEST, { id });
export const loadDocumentSuccess = (data: any) =>
  action(CareTypes.LOAD_DOCUMENT_SUCCESS, { data });

/**
 * History
 */
export const loadHistoryRequest = (id: string, type: string) =>
  action(CareTypes.LOAD_HISTORY_REQUEST, { id, type });
export const loadHistorySuccess = (data: any) =>
  action(CareTypes.LOAD_HISTORY_SUCCESS, { data });

/**
 * Schedule
 */
export const loadScheduleRequest = (params: any) =>
  action(CareTypes.LOAD_SCHEDULE_REQUEST, { params });
export const loadScheduleSuccess = (data: any) =>
  action(CareTypes.LOAD_SCHEDULE_SUCCESS, { data });

export const createScheduleRequest = (data: any) =>
  action(CareTypes.CREATE_SCHEDULE_REQUEST, { ...data });
export const createScheduleSuccess = (data: any) =>
  action(CareTypes.CREATE_SCHEDULE_SUCCESS, { data });

export const updateScheduleRequest = (params: any) =>
  action(CareTypes.UPDATE_SCHEDULE_REQUEST, { ...params });
export const updateScheduleSuccess = (data: any) =>
  action(CareTypes.UPDATE_SCHEDULE_SUCCESS, { data });

export const deleteScheduleRequest = (id: string, type?: string) =>
  action(CareTypes.DELETE_SCHEDULE_REQUEST, { id, type });
export const deleteScheduleSuccess = (data: any) =>
  action(CareTypes.DELETE_SCHEDULE_SUCCESS, { data });

/**
 * evolution
 */

export const loadEvolutionRequest = (id: any) =>
  action(CareTypes.LOAD_EVOLUTION_REQUEST, id);

export const loadEvolutionSuccess = (data: any) =>
  action(CareTypes.LOAD_EVOLUTION_SUCCESS, data);

export const loadEvolutionFailure = () =>
  action(CareTypes.LOAD_EVOLUTION_FAILURE);
