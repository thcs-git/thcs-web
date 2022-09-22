import { action } from "typesafe-actions";
import { AttachmentsIntegrationTypes } from "./types";

export const dispatchDocs = (data: any) =>
  action(AttachmentsIntegrationTypes.DISPATCH_DOCS, data);
export const dispatchDocsSuccess = (data: any) =>
  action(AttachmentsIntegrationTypes.DISPATCH_DOCS_SUCCESS, data);
export const dispatchDocsFailure = () =>
  action(AttachmentsIntegrationTypes.DISPATCH_DOCS_FAILURE);
