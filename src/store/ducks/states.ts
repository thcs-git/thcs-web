import { UnconfirmedUserInterface } from "./unconfirmeduser/types";
import { INITIAL_STATE } from "./login";
import { LoginState } from "./login/types";

import { INITIAL_STATE as INITIAL_STATE_CARE } from "./cares";
import { CareState } from "./cares/types";

import { INITIAL_STATE as INITIAL_STATE_CUSTOMER } from "./customers";
import { CustomerState } from "./customers/types";

import { INITIAL_STATE as INITIAL_STATE_COMPANY } from "./companies";
import { CompanyState } from "./companies/types";

import { INITIAL_STATE as INITIAL_STATE_SPECIALTY } from "./specialties";
import { SpecialtyState } from "./specialties/types";

import { INITIAL_STATE as INITIAL_STATE_COUNCIL } from "./councils";
import { CouncilState } from "./councils/types";

import { INITIAL_STATE as INITIAL_STATE_DOCUMENT } from "./documents";
import { DocumentState } from "./documents/types";

import { INITIAL_STATE as INITIAL_STATE_DOCUMENT_GROUP } from "./documentGroups";
import { DocumentGroupState } from "./documentGroups/types";

import { INITIAL_STATE as INITIAL_STATE_AREA } from "./areas";
import { AreaState } from "./areas/types";

import { INITIAL_STATE as INITIAL_STATE_PATIENT } from "./patients";
import { PatientState } from "./patients/types";

import { INITIAL_STATE as INITIAL_STATE_USER } from "./users";
import { UserState } from "./users/types";

import { INITIAL_STATE as INITIAL_STATE_PROFESSION } from "./professions";
import { ProfessionState, ProfessionTypes } from "./professions/types";

import { INITIAL_STATE as INITIAL_STATE_UNCONFIRMEDUSER } from "./unconfirmeduser";
import { UnconfirmedUserState } from "./unconfirmeduser/types";

import { INITIAL_STATE as INITIAL_STATE_LAYOUT } from "./layout";
import { LayoutState, LayoutTypes } from "./layout/types";

import { INITIAL_STATE as INITIAL_STATE_MESSAGE } from "./message";
import { MessageState, MessageTypes } from "./message/types";

import { INITIAL_STATE as INITIAL_STATE_ALLERGIES } from "./allergies";
import { AllergiesState } from "./allergies/types";

import { INITIAL_STATE as INITIAL_STATE_MEASUREMENTS } from "./measurements";
import { MeasurementsState } from "./measurements/types";

import { INITIAL_STATE as INITIAL_STATE_QR_CODE } from "./qrCode";
import { QrCodeState } from "./qrCode/types";

import { INITIAL_STATE as INITIAL_STATE_PRESCRIPTION } from "./prescripition";
import { PrescriptionState } from "./prescripition/types";

import { INITIAL_STATE as INITIAL_STATE_ANTIBIOTIC } from "./antibiotic";
import { AntibioticState } from "./antibiotic/types";

import { INITIAL_STATE as INITIAL_STATE_EXAMS } from "./exams";
import { ExamsState } from "./exams/types";

import { INITIAL_STATE as INITIAL_STATE_ATTEST } from "./attest";
import { AttestState } from "./attest/types";

import { INITIAL_STATE as INITIAL_STATE_LOGO } from "./logo";
import { LogoState } from "./logo/types";

import { INITIAL_STATE as INITIAL_STATE_ATACHMENT } from "./attachment";
import { AttachmentState } from "./attachment/types";
/**
 * Initial state tree interface
 */
export interface IInitialState {
  areas: Readonly<AreaState>;
  login: Readonly<LoginState>;
  cares: Readonly<CareState>;
  companies: Readonly<CompanyState>;
  customers: Readonly<CustomerState>;
  specialties: Readonly<SpecialtyState>;
  councils: Readonly<CouncilState>;
  documents: Readonly<DocumentState>;
  documentGroups: Readonly<DocumentGroupState>;
  patients: Readonly<PatientState>;
  users: Readonly<UserState>;
  profession: Readonly<ProfessionState>;
  layout: Readonly<LayoutState>;
  message: Readonly<MessageState>;
  allergies: Readonly<AllergiesState>;
  measurements: Readonly<MeasurementsState>;
  qrCode: Readonly<QrCodeState>;
  prescription: Readonly<PrescriptionState>;
  antibiotic: Readonly<AntibioticState>;
  exams: Readonly<ExamsState>;
  attest: Readonly<AttestState>;
  logo: Readonly<LogoState>;
  attachments: Readonly<AttachmentState>;
}

/**
 * Initial state tree
 */
export const InitialState: IInitialState = {
  areas: INITIAL_STATE_AREA,
  login: INITIAL_STATE,
  cares: INITIAL_STATE_CARE,
  companies: INITIAL_STATE_COMPANY,
  customers: INITIAL_STATE_CUSTOMER,
  specialties: INITIAL_STATE_SPECIALTY,
  councils: INITIAL_STATE_COUNCIL,
  documents: INITIAL_STATE_DOCUMENT,
  documentGroups: INITIAL_STATE_DOCUMENT_GROUP,
  patients: INITIAL_STATE_PATIENT,
  users: INITIAL_STATE_USER,
  profession: INITIAL_STATE_PROFESSION,
  layout: INITIAL_STATE_LAYOUT,
  message: INITIAL_STATE_MESSAGE,
  allergies: INITIAL_STATE_ALLERGIES,
  measurements: INITIAL_STATE_MEASUREMENTS,
  qrCode: INITIAL_STATE_QR_CODE,
  prescription: INITIAL_STATE_PRESCRIPTION,
  antibiotic: INITIAL_STATE_ANTIBIOTIC,
  exams: INITIAL_STATE_EXAMS,
  attest: INITIAL_STATE_ATTEST,
  logo: INITIAL_STATE_LOGO,
  attachments: INITIAL_STATE_ATACHMENT,
};
