import { action } from 'typesafe-actions';
import { CareTypes, CareInterface, LoadRequestParams, DocumentGroupInterface, DocumentInterface, HealthInsuranceInterface, HealthPlanInterface } from './types';

export const loadRequest = (params: LoadRequestParams = {}) => action(CareTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: CareInterface) => action(CareTypes.LOAD_SUCCCES, { data });

export const loadFailure = () => action(CareTypes.LOAD_FAILURE);

export const createCareRequest = (data: CareInterface) => action(CareTypes.CREATE_CARE_REQUEST, { data });
export const createCareSuccess = (data: CareInterface) => action(CareTypes.CREATE_CARE_SUCCESS, { data });

export const updateCareRequest = (data: CareInterface) => action(CareTypes.UPDATE_CARE_REQUEST, { data });
export const updateCareSuccess = (data: CareInterface) => action(CareTypes.UPDATE_CARE_SUCCESS, { data });

export const loadCareById = (id: string) => action(CareTypes.LOAD_REQUEST_CARE_BY_ID, { id });
export const loadSuccessGetCareById = (data: CareInterface) => action(CareTypes.LOAD_SUCCCES_CARE_BY_ID, { data });

export const searchCareRequest = (params: any) => action(CareTypes.SEARCH_CARE_REQUEST, { params });
export const searchCareSuccess = (data: CareInterface) => action(CareTypes.SEARCH_CARE_SUCCESS, { data });

/**
 * Documento Socioambiental
 */

export const actionDocumentGroupSocioAmbientalRequest = () => action(CareTypes.DOCUMENT_GROUP_SOCIOAMBIENTAL_REQUEST);
export const actionDocumentGroupSocioAmbiental = (data: DocumentGroupInterface) => action(CareTypes.DOCUMENT_GROUP_SOCIOAMBIENTAL, { data });

export const actionDocumentSocioAmbientalRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_REQUEST, { data });
export const actionDocumentSocioAmbiental = (data: DocumentInterface) => action(CareTypes.DOCUMENT_SOCIOAMBIENTAL, { data });

export const actionDocumentSocioAmbientalStoreRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_STORE_REQUEST, {
  ...data
});
export const actionDocumentSocioAmbientalStore = (data: DocumentInterface) => action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_STORE, { data });

export const actionDocumentSocioAmbientalUpdateRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_UPDATE_REQUEST, {
  ...data
});
export const actionDocumentSocioAmbientalUpdate = (data: DocumentInterface) => action(CareTypes.DOCUMENT_SOCIOAMBIENTAL_UPDATE, { data });

/**
 * Documento ABEMID
 */

export const actionDocumentGroupAbemidRequest = () => action(CareTypes.DOCUMENT_GROUP_ABEMID_REQUEST);
export const actionDocumentGroupAbemid = (data: DocumentGroupInterface) => action(CareTypes.DOCUMENT_GROUP_ABEMID, { data });

export const actionDocumentAbemidRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_ABEMID_REQUEST, { data });
export const actionDocumentAbemid = (data: DocumentInterface) => action(CareTypes.DOCUMENT_ABEMID, { data });

export const actionDocumentAbemidStoreRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_ABEMID_STORE_REQUEST, {
  ...data
});
export const actionDocumentAbemidStore = (data: DocumentInterface) => action(CareTypes.DOCUMENT_ABEMID_STORE, { data });

export const actionDocumentAbemidUpdateRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_ABEMID_UPDATE_REQUEST, {
  ...data
});
export const actionDocumentAbemidUpdate = (data: DocumentInterface) => action(CareTypes.DOCUMENT_ABEMID_UPDATE, { data });

/**
 * Documento NEAD
 */

export const actionDocumentGroupNeadRequest = () => action(CareTypes.DOCUMENT_GROUP_NEAD_REQUEST);
export const actionDocumentGroupNead = (data: DocumentGroupInterface) => action(CareTypes.DOCUMENT_GROUP_NEAD, { data });

export const actionDocumentNeadRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_NEAD_REQUEST, { data });
export const actionDocumentNead = (data: DocumentInterface) => action(CareTypes.DOCUMENT_NEAD, { data });

export const actionDocumentNeadStoreRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_NEAD_STORE_REQUEST, {
  ...data
});
export const actionDocumentNeadStore = (data: DocumentInterface) => action(CareTypes.DOCUMENT_NEAD_STORE, { data });

export const actionDocumentNeadUpdateRequest = (data: DocumentInterface) => action(CareTypes.DOCUMENT_NEAD_UPDATE_REQUEST, {
  ...data
});
export const actionDocumentNeadUpdate = (data: DocumentInterface) => action(CareTypes.DOCUMENT_NEAD_UPDATE, { data });

export const cleanAction = () => action(CareTypes.CLEAN);


/**
 * Health Care
 */
export const healthInsuranceRequest = () => action(CareTypes.HEALTH_INSURANCE_REQUEST);
export const healthInsuranceSuccess = (data: HealthInsuranceInterface) => action(CareTypes.HEALTH_INSURANCE_SUCCESS, { data });

/**
 * Health Plan
 */
export const healthPlanRequest = (id: string | null) => action(CareTypes.HEALTH_PLAN_REQUEST, { id });
export const healthPlanSuccess = (data: HealthPlanInterface) => action(CareTypes.HEALTH_PLAN_SUCCESS, { data });

