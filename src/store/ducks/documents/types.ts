import { PatientInterface } from '../patients/types';
import { CareInterface } from '../cares/types';
/**
 * Action types
 */
export enum DocumentTypes {
  LOAD_REQUEST = "@document/LOAD_REQUEST",
  LOAD_SUCCESS = "@document/LOAD_SUCCESS",
  LOAD_FAILURE = "@document/LOAD_FAILURE",

  CREATE_DOCUMENT_REQUEST = "@document/CREATE_DOCUMENT_REQUEST",
  CREATE_DOCUMENT_SUCCESS = "@document/CREATE_DOCUMENT_SUCCESS",

  LOAD_REQUEST_BY_CARE_ID = "@document/LOAD_REQUEST_BY_CARE_ID",
  LOAD_SUCCESS_BY_CARE_ID = "@document/LOAD_SUCCESS_BY_CARE_ID",
}

/**
 * Data types
 */

export interface DocumentInterface {
  _id?: string;
  pacient_id?: string | PatientInterface;
  care_id?: string | CareInterface;
  document_group_id?: Record<string, DocumentGroupData>;
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

export interface DocumentList {
  data: DocumentInterface[];
  limit: string;
  page: string;
  total: number;
}

interface DocumentGroupData {
  _id: string;
  name: string;
}

/**
 * State type
 */
export interface DocumentState {
  data: DocumentInterface;
  list: DocumentList;
  loading: boolean;
  error: boolean;
  success: boolean;
}

export type LoadRequestParams = Partial<Omit<DocumentList, 'data'>>
