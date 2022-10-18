export enum AttachmentsIntegrationTypes {
  DISPATCH_DOCS = "@attachmentsIntegration/DISPATCH_DOCS",
  DISPATCH_DOCS_SUCCESS = "@attachmentsIntegration/DISPATCH_DOCS_SUCCESS",
  DISPATCH_DOCS_FAILURE = "@attachmentsIntegration/DISPATCH_DOCS_FAILURE",

  VERIFY_STATUS_DOCS = "@attachmentsIntegration/VERIFY_STATUS_DOCS",
  VERIFY_STATUS_DOCS_SUCCESS = "@attachmentsIntegration/VERIFY_STATUS_DOCS_SUCCESS",
  VERIFY_STATUS_DOCS_FAILURE = "@attachmentsIntegration/VERIFY_STATUS_DOCS_FAILURE",
}

export interface AttachmentsIntegrationState {
  data: any;
  loading: boolean;
  error: boolean;
  success: boolean;
}
