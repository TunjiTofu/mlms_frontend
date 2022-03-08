import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getclassTitle = (title) => ({
  type: ActionTypes.GET_CLASS_TITLE,
  payload: title,
});

const getUserName = (userName) => ({
  type: ActionTypes.GET_USER_NAME,
  payload: quiz,
});

export const getClassQuizzesInitiate = (id) => {
  return function (dispatch) {
    db.classQuizzes
      .orderBy("createdAt", "desc")
      .where("class", "==", id)
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const classQuizzes = [];
          querySnapshot.forEach((doc) => {
            classQuizzes.push({...doc.data(), quizId: doc.id});
          });
          dispatch(getClassQuizzes(classQuizzes));
        } else {
          console.log("No Quiz Found!");
        }
      });
  };
};