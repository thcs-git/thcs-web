import { action } from 'typesafe-actions';
import { ModifyTypes } from './types';

export const modify_avaliation = () =>
    action(ModifyTypes.MODIF_AVALIATION);
export const modify_care = () =>
    action(ModifyTypes.MODIF_CARE);
export const modify_company = () =>
    action(ModifyTypes.MODIF_COMPANY);
export const modify_council = () =>
    action(ModifyTypes.MODIF_COUNCIL);
export const modify_customer = () =>
    action(ModifyTypes.MODIF_CUSTOMER);
export const modify_speciality = () =>
    action(ModifyTypes.MODIF_SPECIALITY);
export const modify_user = () =>
    action(ModifyTypes.MODIF_USER);


export const nomodify_avaliation = () =>
    action(ModifyTypes.NOMODIF_AVALIATION);
export const nomodify_care = () =>
    action(ModifyTypes.NOMODIF_CARE);
export const nomodify_company = () =>
    action(ModifyTypes.NOMODIF_COMPANY);
export const nomodify_council = () =>
    action(ModifyTypes.NOMODIF_COUNCIL);
export const nomodify_customer = () =>
    action(ModifyTypes.NOMODIF_CUSTOMER);
export const nomodify_speciality = () =>
    action(ModifyTypes.NOMODIF_SPECIALITY);
export const nomodify_user = () =>
    action(ModifyTypes.NOMODIF_USER);


