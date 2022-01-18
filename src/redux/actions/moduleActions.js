import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getClassModules = (modules) => ({
  type: ActionTypes.GET_SELECTED_CLASS_MODULES,
  payload: modules,
});

const getModuleDetails = (module) => ({
  type: ActionTypes.GET_MODULE_DETAILS,
  payload: module,
});

export const getClassModulesInitiate = (id) => {
  return function (dispatch) {
    db.classModules
      .orderBy("sortNumber", "asc")
      .where("class", "==", id)
      .where("status", "==", "active")
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const classModules = [];
          querySnapshot.forEach((doc) => {
            classModules.push({...doc.data(), moduleId: doc.id});
          });
          dispatch(getClassModules(classModules));
        } else {
          console.log("No Class Module Found!");
        }
      });
  };
};

export const getModuleDetailsInitiate = (id) => {
  return function (dispatch) {
    db.classModules
      .doc(id)
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (querySnapshot.exists) {
          dispatch(getModuleDetails({...querySnapshot.data(), id: querySnapshot.id}));
        } else {
          console.log("No Module Details Found!");
        }
      }); 
  };
};


export const resetSelectedClassModuleInitiate = () => ({
  type: ActionTypes.RESET_SELECTED_CLASS_MODULES,
});
