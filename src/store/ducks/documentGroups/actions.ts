import { action } from 'typesafe-actions';
import { DocumentGroupTypes, DocumentGroupInterface, LoadRequestParams } from './types';

export const loadRequest = (params: any) => action(DocumentGroupTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: DocumentGroupInterface) => action(DocumentGroupTypes.LOAD_SUCCCES, { data });

export const loadFailure = () => action(DocumentGroupTypes.LOAD_FAILURE);

export const loadRequestByIds = (ids: string) => action(DocumentGroupTypes.LOAD_REQUEST_DOCUMENTS_BY_ID, { ids });
export const loadSuccessByIds = (data: any) => action(DocumentGroupTypes.LOAD_SUCCESS_DOCUMENTS_BY_ID, { data });
