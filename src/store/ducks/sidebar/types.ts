export enum SidebarTypes {
  MODIFY_SIDEBAR_AREA = "@sidebar/MODIFY_SIDEBAR_AREA"

}

export interface SidebarInterface {
  clientEdit: boolean;
  companyEdit: boolean;
  userEdit: boolean;
  userDesegagedEdit: boolean;
  areaEdit: boolean;
  patientsEdit: boolean;
  avaliationEdit: boolean;
  attendenceEdit: boolean;
}
