import { action } from "typesafe-actions";
import { AttachmentsIntegrationTypes } from "./types";

export const dispatchDocs = (data: any) =>
  action(AttachmentsIntegrationTypes.DISPATCH_DOCS, data);
export const dispatchDocsSuccess = (data: any) =>
  action(AttachmentsIntegrationTypes.DISPATCH_DOCS_SUCCESS, data);
export const dispatchDocsFailure = () =>
  action(AttachmentsIntegrationTypes.DISPATCH_DOCS_FAILURE);

export const verifyStatusDocs = () =>
  action(AttachmentsIntegrationTypes.VERIFY_STATUS_DOCS);
export const verifyStatusDocsSuccess = (data: any) =>
  action(AttachmentsIntegrationTypes.VERIFY_STATUS_DOCS_SUCCESS, data);
export const verifyStatusDocsFailure = () =>
  action(AttachmentsIntegrationTypes.VERIFY_STATUS_DOCS_FAILURE);
