import LOCALSTORAGE from "./constants/localStorage";

export const handleCompanySelected = () => {
  return localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
};
export const handleUserSelectedId = () => {
  return localStorage.getItem(LOCALSTORAGE.USER_ID)
    ? localStorage.getItem(LOCALSTORAGE.USER_ID)
    : "";
};
