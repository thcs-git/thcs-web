import { Reducer } from 'redux';
import { ModifyState, ModifyTypes } from './types';


export const INITIAL_STATE: ModifyState = {
    avaliation:false,
    care:false,
    company:false,
    council:false,
    customer:false,
    speciality:false,
    user:false
};

const reducer: Reducer<ModifyState> = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ModifyTypes.MODIF_AVALIATION:
            return{
                ...state,
                avaliation:true
            };
        case ModifyTypes.MODIF_CARE:
            return{
                ...state,
                care:true
            };
        case ModifyTypes.MODIF_COMPANY:
            return{
                ...state,
                company:true
            };
        case ModifyTypes.MODIF_COUNCIL:
            return{
                ...state,
                council:true
            };
        case ModifyTypes.MODIF_CUSTOMER:
            return{
                ...state,
                customer:true
            };
        case ModifyTypes.MODIF_SPECIALITY:
            return{
                ...state,
                speciality:true
            };
        case ModifyTypes.MODIF_USER:
            return{
                ...state,
                user:true
            };
        case ModifyTypes.NOMODIF_AVALIATION:
            return{
                ...state,
                avaliation:false
            };
        case ModifyTypes.NOMODIF_CARE:
            return{
                ...state,
                care:false
            };
        case ModifyTypes.NOMODIF_COMPANY:
            return{
                ...state,
                company:false
            };
        case ModifyTypes.NOMODIF_COUNCIL:
            return{
                ...state,
                council:false
            };
        case ModifyTypes.NOMODIF_CUSTOMER:
            return{
                ...state,
                customer:false
            };
        case ModifyTypes.NOMODIF_SPECIALITY:
            return{
                ...state,
                speciality:false
            };
        case ModifyTypes.NOMODIF_USER:
            return{
                ...state,
                user:false
            };
        default:
            return state;
    }
}



export default reducer;


