import {ActionTypes} from "../constants/action-types";

const initialState = {
  allModules: [],
  selectedClassModuleDetails: {},
};

const classModuleReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case ActionTypes.GET_SELECTED_CLASS_MODULES:
      return {
        ...state,
        allModules: payload,
      };
    case ActionTypes.GET_MODULE_DETAILS:
      return {
        ...state,
        selectedClassModuleDetails: payload,
      };
    case ActionTypes.RESET_SELECTED_CLASS_MODULES:
      return {
        ...state,
        selectedClassModuleDetails: {},
      };

    default:
      return state;
  }
};

export default classModuleReducer;
