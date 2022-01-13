import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

export const fetchClasses =
  () =>
  async (dispatch, getState, {getFirebase, getFirestore}) => {
    //async call

    const firestore = getFirestore();

    firestore
      .collection("classesMembers")
      // .where("userId", "==", currentUser.uid)
      .where("userId", "==", "lubGGW39RnWQTTFk545MjFmuT083")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const items = [];
          snapshot.forEach((doc) => {
            const docId = doc.data().classId;
            db.classes
              .doc(docId)
              .get() 
              .then((document) => {
                items.push({docId, ...document.data()});
                console.log("Snapp Doc Itemssssss", items);
                // dispatch(setClasses(items));
                dispatch({
                  type: ActionTypes.FETCH_CLASSES,
                  payload: items,
                });
              });
          });
        } else {
          // setClssInfo("You have not joined any class!");
        }
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

// return {
//   type: ActionTypes.SET_CLASSES,
//   payload: classes,
// };

export const setClasses = (classes) => {
  return {
    type: ActionTypes.SET_CLASSES,
    payload: classes,
  };
};

export const selectedClass = (clas) => {
  return {
    type: ActionTypes.SELECTED_CLASS,
    payload: clas,
  };
};
