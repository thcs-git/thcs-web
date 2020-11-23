/**
 * Action types
 */
export enum UserTypes {
  LOAD_REQUEST = "@customer/LOAD_REQUEST",
  LOAD_SUCCCES = "@customer/LOAD_SUCCCES",
  LOAD_FAILURE = "@customer/LOAD_FAILURE",
}

/**
 * Data types
 */

export interface EspecialtiesUserInterface {
  id: string;
  description: string;
};

export interface UserInterface {
  id?: string;
  companyId: string;
	name: string;
  birthdayDate: string;
  gender: string;
  rg: string;
  dispatchingAgency: string;
  fiscalNumber: string;
  motherName: string;
  nationality: string;
	postalCode: string;
	city: string;
	neighborhood: string;
	address: string;
	addressNumber: string;
	addressComplement: string;
	state: string;
	email: string;
	phone: string;
  cellphone: string;
  userType: string;
  especialties: (EspecialtiesUserInterface | {})[];
  council: string;
  councilNumber: string;
  active?: boolean;
}


/**
 * State type
 */
export interface UserState {
  data: UserInterface;
  loading: boolean;
  error: boolean;
}
