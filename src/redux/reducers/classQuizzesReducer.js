import {ActionTypes} from "../constants/action-types";

const initialState = {
  allQuizzes: [],
  selectedClassQuizDetails: {},
};

const classQuizzesReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_QUIZ_LISTS:
      return {
        ...state,
        allQuizzes: payload,
      };
    case ActionTypes.GET_QUIZ_DETAILS:
      return {
        ...state,
        selectedClassQuizDetails: payload,
      };
    case ActionTypes.RESET_SELECTED_CLASS_QUIZ:
      return {
        ...state,
        allQuizzes: [],
      };

    case ActionTypes.RESET_QUIZ_DETAILS:
      return {
        ...state,
        selectedClassQuizDetails: {},
      };

    default:
      return state;
  }
};

export default classQuizzesReducer;
