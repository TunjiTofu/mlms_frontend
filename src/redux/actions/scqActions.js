import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getRandomScq = (scq) => ({
  type: ActionTypes.GET_RANDOM_SCQ_QUESTIONS,
  payload: scq,
});

// const getQuizDetails = (quiz) => ({
//   type: ActionTypes.GET_QUIZ_DETAILS,
//   payload: quiz,
// });

export const getRandomSCQInitiate = (id, maxQuest) => {
  return function (dispatch) {
    db.qestOBJ
      .where("quizId", "==", id)
    //   .orderBy("createdAt", "desc")
      .limit(maxQuest)
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const scqQuestions = [];
          querySnapshot.forEach((doc) => {
            scqQuestions.push({...doc.data(), scqQuestionId: doc.id});
          });
          dispatch(getRandomScq(scqQuestions));
        } else {
          console.log("No Question Found!");
        }
      });
  };
};

// export const getQuizDetailsInitiate = (id) => {
//   return function (dispatch) {
//     db.classQuizzes
//       .doc(id)
//       .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
//         if (querySnapshot.exists) {
//           dispatch(getQuizDetails({...querySnapshot.data(), quizId: querySnapshot.id}));
//         } else {
//           console.log("No Quiz Details Found!");
//         }
//       });
//   };
// };

// export const resetSelectedClassQuizInitiate = () => ({
//   type: ActionTypes.RESET_SELECTED_CLASS_QUIZ,
// });

// export const resetQuizDetailsInitiate = () => ({
//     type: ActionTypes.RESET_QUIZ_DETAILS,
//   });
