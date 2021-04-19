export enum GlobalReducerTypes {
  GLOBAL_LOAD_REQUEST = "@global/LOAD_REQUEST",
  GLOBAL_LOAD_SUCCESS = "@global/LOAD_SUCCESS",
  GLOBAL_LOAD_FAILURE = "@global/LOAD_FAILURE",
}

export interface GlobalAddressInterface {
  postal_code: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  complement: string;
  geolocation?: { latitude: number, longitude: number }
}
