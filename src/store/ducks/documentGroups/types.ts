import { PatientInterface } from '../patients/types';
/**
 * Action types
 */
export enum DocumentGroupTypes {
  LOAD_REQUEST = "@documentGroup/LOAD_REQUEST",
  LOAD_SUCCCES = "@documentGroup/LOAD_SUCCCES",
  LOAD_FAILURE = "@documentGroup/LOAD_FAILURE",

  LOAD_REQUEST_DOCUMENTS_BY_ID = "@documentGroup/LOAD_REQUEST_DOCUMENTS_BY_ID",
  LOAD_SUCCESS_DOCUMENTS_BY_ID = "@documentGroup/LOAD_SUCCESS_DOCUMENTS_BY_ID",
}

/**
 * Data types
 */

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

export type LoadRequestParams = Partial<Omit<DocumentGroupList, 'data'>>
