import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getClassMembersList = (classes) => ({
  type: ActionTypes.GET_CLASS_MEMBERS_LIST,
  payload: classes,
});

export const getClassMembersListInitiate = (id) => {
  return function (dispatch) {
    db.classesMembers.where("userId", "==", id).onSnapshot((querySnapshot) => {
      if (!querySnapshot.empty) {
        const classListArray = [];
        querySnapshot.forEach((doc) => {
          const classId = doc.data().classId;
          db.classes.doc(classId).onSnapshot((document) => {
            // document.forEach((classDoc)=>{
            classListArray.push({...document.data(), id: classId});
            dispatch(getClassMembersList(classListArray));

            // })
          });
        });
      } else {
        console.log("You have not joined any class");
      }
    });
  };
};
