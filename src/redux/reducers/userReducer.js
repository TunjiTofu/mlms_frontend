import { ActionTypes } from "../constants/action-types";

const initialState = {
    usern: null
}
export const userReducer = (state= initialState, {type, payload}) =>{
    switch (type) {
        case ActionTypes.GET_CURRENT_USER:
            return {...state, usern:payload}
        default:
            return state;
    }
}