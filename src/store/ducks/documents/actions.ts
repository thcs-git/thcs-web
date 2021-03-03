import { action } from 'typesafe-actions';
import { DocumentTypes, DocumentInterface, LoadRequestParams } from './types';

export const loadRequest = (params: any) => action(DocumentTypes.LOAD_REQUEST, { params });

export const loadSuccess = (data: DocumentInterface) => action(DocumentTypes.LOAD_SUCCESS, { data });

export const loadFailure = () => action(DocumentTypes.LOAD_FAILURE);

export const createDocumentRequest = (data: DocumentInterface) => action(DocumentTypes.CREATE_DOCUMENT_REQUEST, { ...data });
export const createDocumentSuccess = (data: DocumentInterface) => action(DocumentTypes.CREATE_DOCUMENT_SUCCESS, { data });

export const loadRequestGetByCareId = (care_id: string) => action(DocumentTypes.LOAD_REQUEST_BY_CARE_ID, { care_id });
export const loadSuccessGetByCareId = (data: any) => action(DocumentTypes.LOAD_SUCCESS_BY_CARE_ID, { data });
