import {Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import {db} from "../../../firebase";
import {getQuizDetailsInitiate} from "../../../redux/actions/quizAction";
import {submitStudentScoreInitiate} from "../../../redux/actions/scoreActions";
import {submitStudentTheoryAnsInitiate} from "../../../redux/actions/scoreActions";

const QuizSummary = () => {
  const {state} = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const {selectedClassQuizDetails} = useSelector(
    (state) => state.selectedClassQuizzes
  );

  const formData = {
    classId: state.classId,
    quizId: state.quizId,
    userId: state.userID,
    scqScore: state.score.correct,
    bqScore: state.bqScore.bqCorrect,
    theoryScore: 0,
    submittedAt: db.getCurrentTimeStamp,
  };

  const theoryAnsData = {
    classId: state.classId,
    quizId: state.quizId,
    userId: state.userID,
    submittedAt: db.getCurrentTimeStamp,
    theoryAns: state.theoryAns,
    theoryQuest: state.studentTheoryQuestions,
  };
  console.log("Form Data", formData);
  console.log("Theory Data", theoryAnsData);
  dispatch(submitStudentScoreInitiate(formData));
  dispatch(submitStudentTheoryAnsInitiate(theoryAnsData));
  

  useEffect(() => {
    dispatch(getQuizDetailsInitiate(state.quizId));
  }, []);

  return (
    <>
      <Typography variant="h5" color="primary" sx={{fontWeight: "bold"}}>
        Exam Summary
      </Typography>
      <Typography variant="body1">Class Id: {state.classId}</Typography>
      <Typography variant="body1">Quiz Id: {state.quizId}</Typography>
      <Typography variant="body1">User Id: {state.userID}</Typography>
      <p></p>
      <Typography variant="h6" color="primary" sx={{fontWeight: "bold"}}>
        Objective Exam
      </Typography>
      <Typography variant="body1" color="green">
        Your Score: {state.score.correct}/{state.score.length}{" "}
      </Typography>
      <Typography variant="body1" color="error">
        You missed: {state.score.false}{" "}
      </Typography>
      <p></p>
      {/*       
      Questions
      {state.studentSCQQuestions.map((item, index) => (
        <div key={index}>{item.question}</div>
      ))}
      <p></p>
      Student Selection
      {state.scqQuiz.map((item, index) => (
        <div key={index}>{item.sqIndex}</div>
      ))} */}
      <Typography variant="h6" color="primary" sx={{fontWeight: "bold"}}>
        True/False Exam
      </Typography>
      <Typography variant="body1" color="green">
        Your Score: {state.bqScore.bqCorrect}/{state.bqScore.bqLength}
      </Typography>
      <Typography variant="body1" color="error">
        You missed: {state.bqScore.bqFalse}
      </Typography>
      <p></p>

      {/* Questions
      {state.studentBQQuestions.map((item, index) => (
        <div key={index}>{item.question}</div>
      ))}
      <p></p>
      Student Selection
      {state.bqQuiz.map((item, index) => (
        <div key={index}>{item.bqIndex}</div>
      ))} */}

      <Typography variant="h6" color="primary" sx={{fontWeight: "bold"}}>
        Theory Exam
      </Typography>
      <Typography variant="body1" color="green">
        You Theory score would be uploaded by your teacher
      </Typography>
      {/* <div> Theory Answers</div>
      {state.theoryAns} */}
    </>
  );
};

export default QuizSummary;
