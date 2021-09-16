import { Reducer } from "redux";
import { SidebarInterface, SidebarTypes } from "./types";

export const INITIAL_MODIFY_SIDEBAR : SidebarInterface = {
  clientEdit: false,
  companyEdit: false,
  userEdit: false,
  userDesegagedEdit: false,
  areaEdit: false,
  patientsEdit: false,
  avaliationEdit: false,
  attendenceEdit: false,
};

const reducer: Reducer<SidebarInterface> = (state = INITIAL_MODIFY_SIDEBAR, action) => {
  switch (action.type) {
      case SidebarTypes.MODIFY_SIDEBAR_AREA :
        return{
          ...state,
          areaEdit: true,
        }
      default:
        return state;
  }
}

export default reducer;


