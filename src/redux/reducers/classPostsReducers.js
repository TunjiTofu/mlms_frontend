import {ActionTypes} from "../constants/action-types";

const initialState = {
  allPosts: [],
  selectedPostDetails: {},
};

const classPostsReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_SELECTED_MODULE_POSTS:
      return {
        ...state,
        allPosts: payload,
      };
    case ActionTypes.GET_POST_DETAILS:
      return {
        ...state,
        selectedPostDetails: payload,
      };
    case ActionTypes.RESET_SELECTED_MODULE_POSTS:
      return {
        ...state,
        allPosts: [],
      };

    case ActionTypes.RESET_POST_DETAILS:
      return {
        ...state,
        selectedPostDetails: {},
      };

    default:
      return state;
  }
};

export default classPostsReducer;
