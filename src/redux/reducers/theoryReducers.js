import {ActionTypes} from "../constants/action-types";

const initialState = {
  studentTheoryQuestions: [],
};

const theoryReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_RANDOM_THEORY_QUESTIONS:
      return {
        ...state,
        studentTheoryQuestions: payload,
      };

    case ActionTypes.RESET_RANDOM_THEORY_QUESTIONS:
      return {
        ...state,
        studentTheoryQuestions: [],
      };

    default:
      return state;
  }
};

export default theoryReducer;
