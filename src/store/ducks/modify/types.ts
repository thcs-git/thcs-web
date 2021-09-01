export enum ModifyTypes {
    MODIF_AVALIATION = "@modify/MODIF_AVALIATION",
    MODIF_CARE = "@modify/MODIF_CARE",
    MODIF_COMPANY = "@modify/MODIF_COMPANY",
    MODIF_COUNCIL = "@modify/MODIF_COUNCIL",
    MODIF_CUSTOMER = "@modify/MODIF_CUSTOMER",
    MODIF_SPECIALITY = "@modify/MODIF_SPECIALITY",
    MODIF_USER = "@modify/MODIF_USER",
    NOMODIF_AVALIATION = "@modify/NOMODIF_AVALIATION",
    NOMODIF_CARE = "@modify/NOMODIF_CARE",
    NOMODIF_COMPANY = "@modify/NOMODIF_COMPANY",
    NOMODIF_COUNCIL = "@modify/NOMODIF_COUNCIL",
    NOMODIF_CUSTOMER = "@modify/NOMODIF_CUSTOMER",
    NOMODIF_SPECIALITY = "@modify/NOMODIF_SPECIALITY",
    NOMODIF_USER = "@modify/NOMODIF_USER"
}

export interface ModifyState {
    avaliation: boolean;
    care: boolean;
    company: boolean;
    council: boolean;
    customer: boolean;
    speciality: boolean;
    user: boolean;
}