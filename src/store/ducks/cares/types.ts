import { PatientInterface } from '../patients/types';
/**
 * Action types
 */
export enum CareTypes {
  LOAD_REQUEST = "@care/LOAD_REQUEST",
  LOAD_SUCCCES = "@care/LOAD_SUCCCES",
  LOAD_FAILURE = "@care/LOAD_FAILURE",

  CLEAN = "@care/CLEAN",

  CREATE_CARE_REQUEST = "@care/CREATE_CARE_REQUEST",
  CREATE_CARE_SUCCESS = "@care/CREATE_CARE_SUCCESS",

  UPDATE_CARE_REQUEST = "@care/UPDATE_CARE_REQUEST",
  UPDATE_CARE_SUCCESS = "@care/UPDATE_CARE_SUCCESS",

  LOAD_REQUEST_CARE_BY_ID = "@care/LOAD_REQUEST_CARE_BY_ID",
  LOAD_SUCCCES_CARE_BY_ID = "@care/LOAD_SUCCCES_CARE_BY_ID",

  SEARCH_CARE_REQUEST = "@care/SEARCH_CARE_REQUEST",
  SEARCH_CARE_SUCCESS = "@care/SEARCH_CARE_SUCCESS",

  // Documento Socioambiental

  DOCUMENT_GROUP_SOCIOAMBIENTAL_REQUEST = "@care/DOCUMENT_GROUP_SOCIOAMBIENTAL_REQUEST",
  DOCUMENT_GROUP_SOCIOAMBIENTAL = "@care/DOCUMENT_GROUP_SOCIOAMBIENTAL",

  DOCUMENT_SOCIOAMBIENTAL_REQUEST = "@care/DOCUMENT_SOCIOAMBIENTAL_REQUEST",
  DOCUMENT_SOCIOAMBIENTAL = "@care/DOCUMENT_SOCIOAMBIENTAL",

  DOCUMENT_SOCIOAMBIENTAL_STORE_REQUEST = "@care/DOCUMENT_SOCIOAMBIENTAL_STORE_REQUEST",
  DOCUMENT_SOCIOAMBIENTAL_STORE = "@care/DOCUMENT_SOCIOAMBIENTAL_STORE",

  DOCUMENT_SOCIOAMBIENTAL_UPDATE_REQUEST = "@care/DOCUMENT_SOCIOAMBIENTAL_UPDATE_REQUEST",
  DOCUMENT_SOCIOAMBIENTAL_UPDATE = "@care/DOCUMENT_SOCIOAMBIENTAL_UPDATE",

  // Documento ABEMID

  DOCUMENT_GROUP_ABEMID_REQUEST = "@care/DOCUMENT_GROUP_ABEMID_REQUEST",
  DOCUMENT_GROUP_ABEMID = "@care/DOCUMENT_GROUP_ABEMID",

  DOCUMENT_ABEMID_REQUEST = "@care/DOCUMENT_ABEMID_REQUEST",
  DOCUMENT_ABEMID = "@care/DOCUMENT_ABEMID",

  DOCUMENT_ABEMID_STORE_REQUEST = "@care/DOCUMENT_ABEMID_STORE_REQUEST",
  DOCUMENT_ABEMID_STORE = "@care/DOCUMENT_ABEMID_STORE",

  DOCUMENT_ABEMID_UPDATE_REQUEST = "@care/DOCUMENT_ABEMID_UPDATE_REQUEST",
  DOCUMENT_ABEMID_UPDATE = "@care/DOCUMENT_ABEMID_UPDATE",

  // Documento NEAD

  DOCUMENT_GROUP_NEAD_REQUEST = "@care/DOCUMENT_GROUP_NEAD_REQUEST",
  DOCUMENT_GROUP_NEAD = "@care/DOCUMENT_GROUP_NEAD",

  DOCUMENT_NEAD_REQUEST = "@care/DOCUMENT_NEAD_REQUEST",
  DOCUMENT_NEAD = "@care/DOCUMENT_NEAD",

  DOCUMENT_NEAD_STORE_REQUEST = "@care/DOCUMENT_NEAD_STORE_REQUEST",
  DOCUMENT_NEAD_STORE = "@care/DOCUMENT_NEAD_STORE",

  DOCUMENT_NEAD_UPDATE_REQUEST = "@care/DOCUMENT_NEAD_UPDATE_REQUEST",
  DOCUMENT_NEAD_UPDATE = "@care/DOCUMENT_NEAD_UPDATE",


  // Health Care
  HEALTH_INSURANCE_REQUEST = "@care/HEALTH_INSURANCE_REQUEST",
  HEALTH_INSURANCE_SUCCESS = "@care/HEALTH_INSURANCE_SUCCESS",

  // Health Plan
  HEALTH_PLAN_REQUEST = "@care/HEALTH_PLAN_REQUEST",
  HEALTH_PLAN_SUCCESS = "@care/HEALTH_PLAN_SUCCESS",

  // Health Plan
  HEALTH_SUBPLAN_REQUEST = "@care/HEALTH_SUBPLAN_REQUEST",
  HEALTH_SUBPLAN_SUCCESS = "@care/HEALTH_SUBPLAN_SUCCESS",

  // Type Accommodation
  TYPE_ACCOMMODATION_REQUEST = "@care/TYPE_ACCOMMODATION_REQUEST",
  TYPE_ACCOMMODATION_SUCCESS = "@care/TYPE_ACCOMMODATION_SUCCESS",

  // Care Type
  CARE_TYPE_REQUEST = "@care/CARE_TYPE_REQUEST",
  CARE_TYPE_SUCCESS = "@care/CARE_TYPE_SUCCESS",

  // CID
  SEARCH_CID_REQUEST = "@care/SEARCH_CID_REQUEST",
  SEARCH_CID_SUCCESS = "@care/SEARCH_CID_SUCCESS",

  // Document
  LOAD_DOCUMENT_REQUEST = "@care/LOAD_DOCUMENT_REQUEST",
  LOAD_DOCUMENT_SUCCESS = "@care/LOAD_DOCUMENT_SUCCESS",
}

/**
 * Data types
 */

export interface CareInterface {
  _id?: string;
  patient_id?: Record<string, PatientInterface>; // *
  health_insurance_id?: string;
  health_plan_id?: string;
  health_sub_plan_id?: string;
  contract?: string;
  health_plan_card_number?: string;
  health_plan_card_validate?: string;
  origin_id?: string;
  accommodation_type_id?: string;
  care_type_id?: string | CareTypeInterface;
  procedure_id?: string;
  cid_id?: string;
  area_id?: string;
  user_id?: string; // *
  status?: string, // * Pre-Atendimento, Em atendimento, Cancelado, Finalizado
  complexity?: string,
  started_at?: string;
  created_at?: string;
  created_by?: { _id: string };
  updated_at?: string;
  updated_by?: { _id: string };
  documents_id?: Array<any>;
  capture?: {
    type?: string,
    order_number?: string,
    status?: string,
    estimate?: string,
    complexity?: string,
  }
}

export interface CareList {
  data: CareInterface[];
  limit: string;
  page: string;
  total: number;
}

/**
 * State type
 */
export interface CareState {
  data: CareInterface;
  list: CareList;
  loading: boolean;
  error: boolean;
  success: boolean;
  healthInsurance: HealthInsuranceInterface[];
  healthPlan: HealthPlanInterface[];
  healthSubPlan: HealthPlanInterface[];
  accommondation_type: HealthPlanInterface[];
  care_type: HealthPlanInterface[];
  cid: CidInterface[];
  documentGroupSocioAmbiental: DocumentGroupInterface;
  documentGroupAbemid: DocumentGroupInterface;
  documentSocioAmbiental: DocumentState;
  documentAbemid: DocumentState;
  documentGroupNead: DocumentGroupInterface;
  documentNead: DocumentState;
  document: any;
  // document?: {
  //   document_group_id: DocumentGroupInterface
  // } & DocumentGroupInterface;
}

//========

export interface HealthInsuranceInterface {
  _id: string;
  name: string;
}

export interface HealthPlanInterface {
  _id: string;
  name: string;
}

export interface CareTypeInterface {
  _id: string;
  name: string;
  description: string;
}
export interface CidInterface {
  _id: string;
  name: string;
  cid: string;
  gender: string;
  active: boolean;
}

export interface DocumentGroupInterface {
  _id?: string;
  name?: string;
  description?: string;
  fields?: DocumentGroupFields[];
  created_at?: string;
  created_by?: { _id: string };
  updated_at?: string;
  updated_by?: { _id: string };
}

export interface DocumentGroupFields {
  _id?: string;
  rows?: number;
  tags?: string[];
  required?: boolean;
  active?: boolean;
  description?: string;
  placeholder?: string;
  type?: string;
  options?: DocumentGroupFiledsOptions[];
  step?: number;
}

export interface DocumentGroupFiledsOptions {
  _id?: string;
  text?: string;
  value?: string;
}

export interface DocumentGroupList {
  data: DocumentGroupInterface[];
  limit: string;
  page: string;
  total: number;
}

/**
 * State type
 */
export interface DocumentGroupState {
  data: DocumentGroupInterface;
  list: DocumentGroupList;
  loading: boolean;
  error: boolean;
  success: boolean;
}

export interface DocumentInterface {
  _id?: string;
  pacient_id?: string | PatientInterface;
  care_id?: string | CareInterface;
  document_group_id?: string | DocumentGroupData;
  finished?: boolean;
  canceled?: boolean;
  fields?: DocumentFields[];
  score?: number;
  complexity?: string;
  status?: string;
  created_at?: string;
  created_by?: { _id: string };
  updated_at?: string;
  updated_by?: { _id: string };
}

export interface DocumentFields {
  _id?: string;
  description?: string;
  value?: string;
  options?: string | string[];
}

interface DocumentGroupData {
  _id: string;
  name: string;
}
export interface DocumentList {
  data?: DocumentInterface[];
  fields?: any[];
  limit?: string;
  page?: string;
  total?: number;
}
export interface DocumentState {
  data?: DocumentInterface;
  list?: DocumentInterface[];
  loading?: boolean;
  error?: boolean;
  success?: boolean;
}

export interface ICaptureData {
  inpatient: boolean;
  estimate: string;
  order_number: string;
  health_insurance: string;
  health_plan: string;
  health_sub_plan: string;
  hospital: string;
  unity: string;
  assistant_doctor: string;
  sector: string;
  bed: string;
  status: string;
}

export type LoadRequestParams = Partial<Omit<CareList, 'data'>>
