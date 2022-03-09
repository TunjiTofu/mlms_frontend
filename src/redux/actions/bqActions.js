import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getRandomBq = (bq) => ({
  type: ActionTypes.GET_RANDOM_BQ_QUESTIONS,
  payload: bq,
});

export const getRandomBQInitiate = (id, maxQuest) => {
  return function (dispatch) {

    db.questBQ
      .where("quizId", "==", id).where("status", "==", "active")
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          // console.log("QSnap", querySnapshot.docs);

          var selectedBQQuestId = [];
          const docSize = querySnapshot.size;
          const bqQuestionsToStud = [];

          //Loopong to get unique random number based not more than the document size to serve as indexes
          while (selectedBQQuestId.length < maxQuest) {
            var randomBQDocId = Math.floor(Math.random() * docSize);
            // console.log("New Rand BQ Id", randomBQDocId);

            // if (!selectedBQQuestId.includes(randomBQDocId)) {
            if (selectedBQQuestId.indexOf(randomBQDocId) === -1) {
                selectedBQQuestId.push(randomBQDocId);
            }
          }

          // console.log("Unique Array Elements", selectedBQQuestId);//Unique array elements

          //The unique array elements is used as index to pull question out
          selectedBQQuestId.forEach(function (entry) {
            // console.log("My BQ entry", entry);
            bqQuestionsToStud.push({
              ...querySnapshot.docs[entry].data(),
              bqQuestionId: querySnapshot.docs[entry].id,
            });

            const docId = querySnapshot.docs[entry].id;
            // console.log("Unique BQ Doc -ID", docId);
          });


          // console.log("Selected bq questions for each studnet", bqQuestionsToStud);
          dispatch(getRandomBq(bqQuestionsToStud));

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

export const resetBQQuestionsInitiate = () => ({
  type: ActionTypes.RESET_RANDOM_BQ_QUESTIONS,
});

// export const getScoreInitiate = (score) => ({
//   type: ActionTypes.GET_SCORE,
//   payload: score,
// });



// export const resetQuizDetailsInitiate = () => ({
//     type: ActionTypes.RESET_QUIZ_DETAILS,
//   });
