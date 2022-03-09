import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getRandomTheory = (theory) => ({
  type: ActionTypes.GET_RANDOM_THEORY_QUESTIONS,
  payload: theory,
});

export const getRandomTheoryInitiate = (id, maxQuest) => {
  return function (dispatch) {

    db.questTHEORY
      .where("quizId", "==", id).where("status", "==", "active")
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          // console.log("QSnap", querySnapshot.docs);

          var selectedTheoryQuestId = [];
          const docSize = querySnapshot.size;
          const theoryQuestionsToStud = [];

          //Loopong to get unique random number based not more than the document size to serve as indexes
          while (selectedTheoryQuestId.length < maxQuest) {
            var randomTheoryDocId = Math.floor(Math.random() * docSize);
            // console.log("New Rand Theory Id", randomTheoryDocId);

            // if (!selectedBQQuestId.includes(randomBQDocId)) {
            if (selectedTheoryQuestId.indexOf(randomTheoryDocId) === -1) {
                selectedTheoryQuestId.push(randomTheoryDocId);
            }
          }

          // console.log("Unique THEORY Array Elements", randomTheoryDocId);//Unique array elements

          //The unique array elements is used as index to pull question out
          selectedTheoryQuestId.forEach(function (entry) {
            // console.log("My BQ entry", entry);
            theoryQuestionsToStud.push({
              ...querySnapshot.docs[entry].data(),
              theoryQuestionId: querySnapshot.docs[entry].id,
            });

            const docId = querySnapshot.docs[entry].id;
            // console.log("Unique THEORY Doc -ID", docId);
          });


          // console.log("Selected THEORY questions for each studnet", theoryQuestionsToStud);
          dispatch(getRandomTheory(theoryQuestionsToStud));

        } else {
          console.log("No THEORY Question Found!");
        }
      });
  };
};

export const resetTheoryQuestionsInitiate = () => ({
  type: ActionTypes.RESET_RANDOM_THEORY_QUESTIONS,
});

