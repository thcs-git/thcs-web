import LOCALSTORAGE from './constants/localStorage';

export const handleCompanySelected = () => {
  return localStorage.getItem(LOCALSTORAGE.COMPANY_SELECTED);
}
