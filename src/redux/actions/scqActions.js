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
    // db.qestOBJ
    //   .where("quizId", "==", id)
    //   //   .orderBy("createdAt", "desc")
    //   .limit(maxQuest)
    //   .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
    //     if (!querySnapshot.empty) {
    //       const scqQuestions = [];
    //       querySnapshot.forEach((doc) => {
    //         scqQuestions.push({...doc.data(), scqQuestionId: doc.id});
    //       });
    //       dispatch(getRandomScq(scqQuestions));
    //     } else {
    //       console.log("No Question Found!");
    //     }
    //   });

    db.qestOBJ
      .where("quizId", "==", id)
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          // console.log("QSnap", querySnapshot.docs);

          var selectedQuestId = [];
          const docSize = querySnapshot.size;
          const scqQuestionsToStud = [];

          //Loopong to get unique random number based not more than the document size to serve as indexes
          while (selectedQuestId.length < maxQuest) {
            var randomDocId = Math.floor(Math.random() * docSize);
            console.log("New Rand Id", randomDocId);

            // if (!selectedQuestId.includes(randomDocId)) {
            if (selectedQuestId.indexOf(randomDocId) === -1) {
              selectedQuestId.push(randomDocId);
            }
          }

          console.log("Unique Array Elements", selectedQuestId);//Unique array elements

          //The unique array elements is used as index to pull question out
          selectedQuestId.forEach(function (entry) {
            console.log("My entry", entry);
            scqQuestionsToStud.push({
              ...querySnapshot.docs[entry].data(),
              scqQuestionId: querySnapshot.docs[entry].id,
            });

            const docId = querySnapshot.docs[entry].id;
            console.log("Unique Doc -ID", docId);
          });


          console.log("Selected scq questions for each studnet", scqQuestionsToStud);
          dispatch(getRandomScq(scqQuestionsToStud));

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

export const resetSCQQuestionsInitiate = () => ({
  type: ActionTypes.RESET_RANDOM_SCQ_QUESTIONS,
});

export const getScoreInitiate = (score) => ({
  type: ActionTypes.GET_SCORE,
  payload: score,
});



// export const resetQuizDetailsInitiate = () => ({
//     type: ActionTypes.RESET_QUIZ_DETAILS,
//   });
