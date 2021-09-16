import { action } from "typesafe-actions";
import { SidebarTypes } from "./types";

export const setModifySidebarArea = () => action(SidebarTypes.MODIFY_SIDEBAR_AREA);
