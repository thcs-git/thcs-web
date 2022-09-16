export enum AttachmentsIntegrationTypes {
  DISPATCH_DOCS = "@attachmentsIntegration/DISPATCH_DOCS",
  DISPATCH_DOCS_SUCCESS = "@attachmentsIntegration/DISPATCH_DOCS_SUCCESS",
  DISPATCH_DOCS_FAILURE = "@attachmentsIntegration/DISPATCH_DOCS_FAILURE",
}

export interface AttachmentsIntegrationState {
  data: any;
  loading: boolean;
  error: boolean;
  success: boolean;
}
