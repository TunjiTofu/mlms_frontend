import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getClassQuizzes = (quizzes) => ({
  type: ActionTypes.GET_QUIZ_LISTS,
  payload: quizzes,
});

const getQuizDetails = (quiz) => ({
  type: ActionTypes.GET_QUIZ_DETAILS,
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

export const getQuizDetailsInitiate = (id) => {
  return function (dispatch) {
    db.classQuizzes
      .doc(id)
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (querySnapshot.exists) {
          dispatch(getQuizDetails({...querySnapshot.data(), quizId: querySnapshot.id}));
        } else {
          console.log("No Quiz Details Found!");
        }
      });
  };
};

export const resetSelectedClassQuizInitiate = () => ({
  type: ActionTypes.RESET_SELECTED_CLASS_QUIZ,
});

export const resetQuizDetailsInitiate = () => ({
    type: ActionTypes.RESET_QUIZ_DETAILS,
  });
