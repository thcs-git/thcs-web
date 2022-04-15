import { combineReducers } from "redux";

import { IInitialState } from "./states";

/** Reducers  */
import areas from "./areas";
import login from "./login";
import cares from "./cares";
import companies from "./companies";
import customers from "./customers";
import councils from "./councils";
import documents from "./documents";
import documentGroups from "./documentGroups";
import specialties from "./specialties";
import patients from "./patients";
import users from "./users";
import profession from "./professions";
import layout from "./layout";
import message from "./message";
import allergies from "./allergies";
import measurements from "./measurements";
import qrCode from "./qrCode";
import prescription from "./prescripition";
import antibiotic from "./antibiotic";
import exams from "./exams";
import attest from "./attest";
import logo from "./logo";

export default combineReducers<IInitialState>({
  areas,
  login,
  cares,
  companies,
  customers,
  specialties,
  councils,
  documents,
  documentGroups,
  patients,
  users,
  profession,
  layout,
  message,
  allergies,
  measurements,
  qrCode,
  prescription,
  antibiotic,
  exams,
  attest,
  logo,
});
