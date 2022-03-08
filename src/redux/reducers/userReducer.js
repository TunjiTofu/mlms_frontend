// import { ActionTypes } from "../constants/action-types";

// const initialState = {
//     usern: null
// }
// export const userReducer = (state= initialState, {type, payload}) =>{
//     switch (type) {
//         case ActionTypes.GET_CURRENT_USER:
//             return {...state, usern:payload}
//         default:
//             return state;
//     }
// }

import {ActionTypes} from "../constants/action-types";

const initialState = {
  allUsers: [],
  singleUser: {},
};

const userReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_ALL_USERS:
      return {
        ...state,
        allUsers: payload,
      };
    case ActionTypes.GET_SINGLE_USER:
      return {
        ...state,
        singleUser: payload,
      };
    case ActionTypes.RESET_ALL_USERS:
      return {
        ...state,
        allUsers: [],
      };
    case ActionTypes.RESET_SINGLE_USER:
      return {
        ...state,
        singleUser: {},
      };

    default:
      return state;
  }
};

export default userReducer;
