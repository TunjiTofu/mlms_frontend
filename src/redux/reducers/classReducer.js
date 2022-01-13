import {ActionTypes} from "../constants/action-types";

const initialState = {
  classes: [],
};
export const classReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.FETCH_CLASSES:
      return {...state, classes: payload};
    case ActionTypes.SET_CLASSES:
      return {...state, classes: payload};
    default:
      return state;
  }
};
