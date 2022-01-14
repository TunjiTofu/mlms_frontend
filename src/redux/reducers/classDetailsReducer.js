import {ActionTypes} from "../constants/action-types";

const initialState = {
  allClassDetails: [],
  classDetails: {},
};

const classDetailsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_CLASS_DETAILS:
      return {
        ...state,
        classDetails: payload,
      };
    case ActionTypes.RESET_SELECTED_CLASS:
      return {
        ...state,
        classDetails: {},
      };

    default:
      return state;
  }
};

export default classDetailsReducer;
