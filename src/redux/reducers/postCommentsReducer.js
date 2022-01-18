import {ActionTypes} from "../constants/action-types";

const initialState = {
  parentComments: [],
  childrenComments: [],
  noRecord: "",
};

const postCommentsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_PARENT_COMMENTS:
      return {
        ...state,
        parentComments: payload,
      };
    case ActionTypes.GET_CHILDREN_COMMENTS:
      return {
        ...state,
        childrenComments: payload,
      };
    case ActionTypes.GET_NO_RECORD:
      return {
        ...state,
        noRecord: payload,
      };

    case ActionTypes.RESET_PARENT_COMMENTS:
      return {
        ...state,
        parentComments: [],
      };

    case ActionTypes.RESET_CHILDREN_COMMENTS:
      return {
        ...state,
        childrenComments: [],
      };

    default:
      return state;
  }
};

export default postCommentsReducer;
