export enum CustomerLogsTypes {
  LOAD_REQUEST = "@customerLogs/LOAD_REQUEST",
  LOAD_SUCCESS = "@customerLogs/LOAD_SUCCESS",
  LOAD_FAILURE = "@customerLogs/LOAD_FAILURE",
}

export interface CustomerLogsState {
  data: any[];
  loading: boolean;
  success: boolean;
  error: boolean;
}
