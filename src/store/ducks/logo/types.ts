export enum LogoTypes {
  LOAD_REQUEST = "@logo/LOAD_REQUEST",
  LOAD_SUCCESS = "@logo/LOAD_SUCCESS",
  LOAD_FAILURE = "@logo/LOAD_FAILURE",
}

export interface Logo {
  name: string;
  logo: {
    type: string;
    data: [];
  };
}

export interface LogoState {
  data: Logo;
  loading: boolean;
  success: boolean;
  error: boolean;
}
