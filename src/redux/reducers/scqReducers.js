import {ActionTypes} from "../constants/action-types";

const initialState = {
  selectedSCQQustions: [],
};

const scqReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_RANDOM_SCQ_QUESTIONS:
      return {
        ...state,
        selectedSCQQustions: payload,
      };
    // case ActionTypes.GET_QUIZ_DETAILS:
    //   return {
    //     ...state,
    //     selectedClassQuizDetails: payload,
    //   };
    // case ActionTypes.RESET_SELECTED_CLASS_QUIZ:
    //   return {
    //     ...state,
    //     allQuizzes: [],
    //   };

    // case ActionTypes.RESET_QUIZ_DETAILS:
    //   return {
    //     ...state,
    //     selectedClassQuizDetails: {},
    //   };

    default:
      return state;
  }
};

export default scqReducer;
