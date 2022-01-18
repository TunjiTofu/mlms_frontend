import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

// export const setCurrentUserN = (usern) => {
//     return {
//       type: ActionTypes.GET_CURRENT_USER,
//       payload: usern,
//     };
//   };

const getUsers = (users) => ({
  type: ActionTypes.GET_ALL_USERS,
  payload: users,
});

const getSingleUser = (user) => ({
  type: ActionTypes.GET_SINGLE_USER,
  payload: user,
});

// export const getClassModulesInitiate = (id) => {
//   return function (dispatch) {
//     db.classModules
//       .orderBy("sortNumber", "asc")
//       .where("class", "==", id)
//       .where("status", "==", "active")
//       .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
//         if (!querySnapshot.empty) {
//           const classModules = [];
//           querySnapshot.forEach((doc) => {
//             classModules.push({...doc.data(), moduleId: doc.id});
//           });
//           dispatch(getClassModules(classModules));
//         } else {
//           console.log("No Class Module Found!");
//         }
//       });
//   };
// };

export const getSingleUserInitiate = (id) => {
  return function (dispatch) {
    db.users
      .doc(id)
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (querySnapshot.exists) {
          dispatch(
            getSingleUser({...querySnapshot.data(), id: querySnapshot.id})
          );
        } else {
          console.log("No User Found!");
        }
      });
  };
};

export const resetSelectedUserInitiate = () => ({
  type: ActionTypes.RESET_SINGLE_USER,
});

export const resetAllUserInitiate = () => ({
  type: ActionTypes.RESET_ALL_USERS,
});
