export enum AttachmentTypes {
  LOAD_REQUEST = "@attachment/LOAD_REQUEST",
  LOAD_SUCCESS = "@attachment/LOAD_SUCCESS",
  LOAD_FAILURE = "@attachment/LOAD_FAILURE",
  LOAD_REQUEST_FILE = "@attachment/LOAD_REQUEST_FILE",
  LOAD_SUCCESS_FILE = "@attachment/LOAD_SUCCESS_FILE",
}

export interface attachments {
  _id: string;
  external_patient_id: number;
  company_id: string;
  documents: {
    _id: string;
    content_type: string;
    name_file: string;
    upload_date: string;
    external_attendance_id: number;
    document_type: string;
    requester_name: string;
  };
}

export interface attachmentList {
  _id: { type: string };
  list: attachments[];
}

export interface AttachmentState {
  data: attachmentList[];
  loading: boolean;
  success: boolean;
  error: boolean;
}

export type LoadRequestParams = Partial<Omit<attachments | any, "data">>;
