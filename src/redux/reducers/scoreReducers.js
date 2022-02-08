import {ActionTypes} from "../constants/action-types";

const initialState = {
  studentScore: {},
  
};

const scoreReducers = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_STUDENT_SCORE:
      return {
        ...state,
        studentScore: payload,
      };
    // case ActionTypes.GET_MODULE_DETAILS:
    //   return {
    //     ...state,
    //     selectedClassModuleDetails: payload,
    //   };
    // case ActionTypes.RESET_SELECTED_CLASS_MODULES:
    //   return {
    //     ...state,
    //     allModules: [],
    //   };

    default:
      return state;
  }
};

export default scoreReducers;
