import {ActionTypes} from "../constants/action-types";

const initialState = {
  studentSCQQuestions: [],
  studentScore: 0,
};

const scqReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_RANDOM_SCQ_QUESTIONS:
      return {
        ...state,
        studentSCQQuestions: payload,
      };

    case ActionTypes.GET_SCORE:
      return {
        ...state,
        studentScore: payload,
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

    case ActionTypes.RESET_RANDOM_SCQ_QUESTIONS:
      return {
        ...state,
        studentSCQQuestions: [],
      };

    default:
      return state;
  }
};

export default scqReducer;
