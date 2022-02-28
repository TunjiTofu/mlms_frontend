import React from "react";
import {useLocation, useHistory} from "react-router-dom";

const QuizSummary = () => {
  const {state} = useLocation();
  const history = useHistory();
  return (
    <>
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
    </>
  );
};

export default QuizSummary;
