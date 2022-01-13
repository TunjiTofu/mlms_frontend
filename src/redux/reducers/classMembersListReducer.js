import {ActionTypes} from "../constants/action-types";

const initialState = {
  classMemberDetails: [],
  classMemberDetail: {},
};

const classMemberListReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_CLASS_MEMBERS_LIST:
      return {
        ...state,
        classMemberDetails: payload,
      };

    default:
      return state;
  }
};


export default classMemberListReducer;