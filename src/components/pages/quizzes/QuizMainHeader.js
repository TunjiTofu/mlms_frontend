import {Button, Grid, Paper, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
  getQuizDetailsInitiate,
  resetQuizDetailsInitiate,
} from "../../../redux/actions/quizAction";
import {useStylesPages} from "../../../Styles/PageStyles";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CountDownTimer from "./CountDownTimer";

const QuizMainHeader = () => {
  const {classId} = useParams();
  const {quizId} = useParams();
  const classes = useStylesPages();

  const hoursMinSecs = {hours: 0, minutes: 1, seconds: 0};

  const dispatch = useDispatch();
  const {selectedClassQuizDetails} = useSelector(
    (state) => state.selectedClassQuizzes
  );

  useEffect(() => {
    if (selectedClassQuizDetails && selectedClassQuizDetails !== "")
      dispatch(getQuizDetailsInitiate(quizId));
    return () => {
      dispatch(resetQuizDetailsInitiate());
    };
  }, [quizId]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={7}>
        <Paper elevation={3} className={classes.quizDetailsLayout}>
          <Typography variant="h5" color="primary" gutterBottom>
            <b>{selectedClassQuizDetails.title}</b>
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <b>
              <h className={classes.txtSecondary}>Duration:</h>{" "}
            </b>
            {selectedClassQuizDetails.duration} mins.
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            <b>
              <h className={classes.txtSecondary}>Number of Questions:</h>{" "}
            </b>
            <b>OBJ:</b> {selectedClassQuizDetails.noqScq};<b>T/F: </b>
            {selectedClassQuizDetails.noqBq};<b>Theory: </b>{" "}
            {selectedClassQuizDetails.noqTheory}
          </Typography>
          <Typography variant="subtitle1" gutterBottom></Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            sx={{marginLeft: 2}}
          ></Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Paper elevation={3} className={classes.quizDetailsLayout}>
          <p>
            <Button
              variant="contained"
              color="error"
              size="small"
              style={{textTransform: "none", float: "right"}}
            >
              Quit Test
            </Button>
          </p>
          <Typography variant="h2" color="primary">
            <AccessTimeOutlinedIcon sx={{fontSize: 50}} /><CountDownTimer hoursMinSecs={hoursMinSecs} />
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default QuizMainHeader;
