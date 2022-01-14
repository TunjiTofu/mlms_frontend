import {ActionTypes} from "../constants/action-types";

const initialState = {
  parentComments: [],
  childComments: [],
};

const postCommentsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_PARENT_COMMENTS:
      return {
        ...state,
        parentComments: payload,
      };

    case ActionTypes.RESET_PARENT_COMMENTS:
      return {
        ...state,
        parentComments: [],
      };

    default:
      return state;
  }
};

export default postCommentsReducer;
