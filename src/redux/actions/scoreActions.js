import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const addStudentScore = () => ({
  type: ActionTypes.ADD_SCORE,
});

export const addStudentScoreInitiate = (content) => {
  return function (dispatch) {
    console.log("Contentsssss ", content);

    const stdScqScore = [];
    var sum = 0;

    content.answers.forEach(function (entry, index) {
      console.log("My entry", entry.id);
      const wordArray = entry.id.split("-");
      console.log("Word Array 0", wordArray[0]);
      console.log("Word Array 1", wordArray[1]);

      if (wordArray[1] === "scq") {
        db.qestOBJ
          .doc(wordArray[0])
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              // console.log("querySnapshot", querySnapshot.data().question);
              let dbAns = querySnapshot.data().answer;
              console.log("Selected Ans", entry.selectedOption);
              console.log("DB answer", dbAns);

              if (entry.selectedOption === dbAns) {
                stdScqScore.push(1);
                // stdScore[index] = 1;
              }
            }
            console.log("Final Student Score Array", stdScqScore);
            //   console.log("Final ------ score Length", stdScqScore.length);
          });
      }

      // scqQuestionsToStud.push({
      //   ...querySnapshot.docs[entry].data(),
      //   scqQuestionId: querySnapshot.docs[entry].id,
      // });

      // const docId = querySnapshot.docs[entry].id;
      // console.log("Unique Doc -ID", docId);
    });

    setTimeout(() => {
      console.log("New Final ------ score Length", stdScqScore.length);
      const score_data = {
        classId: content.classId,
        quizId: content.quizId,
        userId: content.userId,
        submittedAt: content.submittedAt,
        scqScore: stdScqScore.length,
      };
      const newId = content.userId + "-" + content.quizId;
      console.log("Score Data", score_data); 
      db.scores
        .doc(newId)
        .set(score_data)
        .then(() => {
          console.log("Score Data inserted");
        })
        .catch(() => {
          console.log("Error inserting score data");
        });
    }, 5000);

    dispatch(addStudentScore());

    // db.classes
    //   .where("classCode", "==", content.classCode)
    //   .get()
    //   .then((snapshot) => {
    //     if (!snapshot.empty) {
    //       snapshot.forEach((doc) => {
    //         const classIdentity = doc.id;
    //         const data = {
    //           classId: classIdentity,
    //           // classRef: db.classesRefDoc.doc('classes/' + classIdentity),
    //           userId: content.userId,
    //           joinedAt: db.getCurrentTimeStamp,
    //         };
    //         const uniqueId = classIdentity + "-" + data.userId;
    //         //Set Data to firestore table
    //         db.classesMembers
    //           .doc(uniqueId)
    //           .set(data)
    //           .catch((e) => {
    //             console.log("Unable to join class. Try again  - " + e);
    //           });
    //       });
    //     } else {
    //       console.log("Class Not Found! Please try again!");
    //     }
    //   })
    //   .catch((e) => {
    //     console.log("Error Joining Class, Please try again!");
    //     console.log(e);
    //   });
  };
};
