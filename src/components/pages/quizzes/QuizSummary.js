import React from "react";
import { useDispatch } from "react-redux";
import {useLocation, useHistory} from "react-router-dom";
import { db } from "../../../firebase";
import { submitStudentScoreInitiate } from "../../../redux/actions/scoreActions";

const QuizSummary = () => {
  const {state} = useLocation();
  const history = useHistory();
  const dispatch = useDispatch()

  const formData = {
    classId: state.classId,
    quizId: state.quizId,
    userId: state.userID,
    scqScore: state.score.correct,
    bqScore: state.bqScore.bqCorrect,
    submittedAt: db.getCurrentTimeStamp,
  };
//   console.log(formData);
  dispatch(submitStudentScoreInitiate(formData));

  return (
    <>
    <p>Class Id: {state.classId}</p>
    <p>Quiz Id: {state.quizId}</p>
    <p>User Id: {state.userID}</p>

      <div>QuizSummary</div>
      Your Score: {state.score.correct}/{state.score.length} <p></p>
      You missed: {state.score.false} <p></p>
      Questions
      {state.studentSCQQuestions.map((item, index) => (
        <div key={index}>{item.question}</div>
      ))}
      <p></p>
      Student Selection
      {state.scqQuiz.map((item, index) => (
        <div key={index}>{item.sqIndex}</div>
      ))}
      <div> BQ QuizSummary</div>
      Your Score: {state.bqScore.bqCorrect}/{state.bqScore.bqLength} <p></p>
      You missed: {state.bqScore.bqFalse} <p></p>
      Questions
      {state.studentBQQuestions.map((item, index) => (
        <div key={index}>{item.question}</div>
      ))}
      <p></p>
      Student Selection
      {state.bqQuiz.map((item, index) => (
        <div key={index}>{item.bqIndex}</div>
      ))}
    </>
  );
};

export default QuizSummary;
