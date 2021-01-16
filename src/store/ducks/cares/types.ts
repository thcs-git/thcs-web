import { PatientInterface } from '../patients/types';
/**
 * Action types
 */
export enum CareTypes {
  LOAD_REQUEST = "@care/LOAD_REQUEST",
  LOAD_SUCCCES = "@care/LOAD_SUCCCES",
  LOAD_FAILURE = "@care/LOAD_FAILURE",

  CREATE_CARE_REQUEST = "@care/CREATE_CARE_REQUEST",
  CREATE_CARE_SUCCESS = "@care/CREATE_CARE_SUCCESS",

  UPDATE_CARE_REQUEST = "@care/UPDATE_CARE_REQUEST",
  UPDATE_CARE_SUCCESS = "@care/UPDATE_CARE_SUCCESS",

  LOAD_REQUEST_CARE_BY_ID = "@care/LOAD_REQUEST_CARE_BY_ID",
  LOAD_SUCCCES_CARE_BY_ID = "@care/LOAD_SUCCCES_CARE_BY_ID",

  SEARCH_CARE_REQUEST = "@care/SEARCH_CARE_REQUEST",
  SEARCH_CARE_SUCCESS = "@care/SEARCH_CARE_SUCCESS",
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
  care_type_id: string;
  procedure_id?: string;
  cid_id?: string;
  area_id?: string;
  user_id: string; // *
  status: string, // * Pre-Atendimento, Em atendimento, Cancelado, Finalizado
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
}

export type LoadRequestParams = Partial<Omit<CareList, 'data'>>
