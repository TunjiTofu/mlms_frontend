import {ActionTypes} from "../constants/action-types";

const initialState = {
  studentBQQuestions: [],
  studentScore: 0,
};

const bqReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_RANDOM_BQ_QUESTIONS:
      return {
        ...state,
        studentBQQuestions: payload,
      };

    case ActionTypes.GET_SCORE:
      return {
        ...state,
        studentScore: payload,
      };
    case ActionTypes.RESET_RANDOM_BQ_QUESTIONS:
      return {
        ...state,
        studentBQQuestions: [],
      };

    default:
      return state;
  }
};

export default bqReducer;
