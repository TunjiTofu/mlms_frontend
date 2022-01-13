import { ActionTypes } from "../constants/action-types";

export const setCurrentUserN = (usern) => {
    return {
      type: ActionTypes.GET_CURRENT_USER,
      payload: usern,
    };
  };