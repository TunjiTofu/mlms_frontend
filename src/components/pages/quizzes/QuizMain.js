import React from "react";
import {useStylesPages} from "../../../Styles/PageStyles";
import {useParams} from "react-router-dom";
import {Box} from "@mui/system";
import {Grid, Paper} from "@mui/material";

function QuizMain() {
  const {classId} = useParams();
  const {quizId} = useParams();
  const classes = useStylesPages();

  console.log(quizId);

  return( 
  <Grid container>
      <Grid item xs={12} >
          <Paper elevation={1} className={classes.quizDetailsLayout}>Heading</Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper elevation={1} className={classes.quizDetailsLayout}>Time</Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper elevation={1} className={classes.quizDetailsLayout}>Quest</Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper elevation={1} className={classes.quizDetailsLayout}>Nav</Paper>
      </Grid>
  </Grid>)
}

export default QuizMain;
