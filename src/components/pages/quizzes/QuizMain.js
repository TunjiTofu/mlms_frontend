import React from "react";
import {useStylesPages} from "../../../Styles/PageStyles";
import {useParams} from "react-router-dom";
import QuizMainHeader from "./QuizMainHeader";
import QuizMainBody from "./QuizMainBody";

function QuizMain() {
  const {classId} = useParams();
  const {quizId} = useParams();
  const classes = useStylesPages();

  //   console.log(quizId);

  return (
    <>
      {/* <Grid container spacing={1}> */}
      <QuizMainHeader />

      <QuizMainBody />
      {/* <QuizMainBody /> */}

      {/* </Grid> */}
    </>
  );
}

export default QuizMain;
