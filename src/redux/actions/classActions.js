import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getClassDetails = (classDet) => ({
  type: ActionTypes.GET_CLASS_DETAILS,
  payload: classDet,
});

export const getClassDetailsInitiate = (id) => {
  return function (dispatch) {
    db.classes
      .doc(id)
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (querySnapshot.exists) {
          dispatch(getClassDetails({...querySnapshot.data(), id: querySnapshot.id}));
        } else {
          console.log("No Class Details Found!");
        }
      });
  };
};

export const resetSelectedClassInitiate = () =>({
  type: ActionTypes.RESET_SELECTED_CLASS
})