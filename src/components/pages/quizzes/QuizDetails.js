import {Paper, Typography, Button} from "@mui/material";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useStylesPages} from "../../../Styles/PageStyles";
import ModuleMenuItems from "../classmodules/ModuleMenuItems";
import {Link, useParams} from "react-router-dom";
import {
  resetQuizDetailsInitiate,
  getQuizDetailsInitiate,
} from "../../../redux/actions/quizAction";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import {getStudentScoreInitiate} from "../../../redux/actions/scoreActions";
import {useAuth} from "../../../context/AuthContext";

function QuizDetails() {
  const {classId} = useParams();
  const {quizId} = useParams();
  const classes = useStylesPages();
  const {currentUser} = useAuth();

  const dispatch = useDispatch();
  const {selectedClassQuizDetails} = useSelector(
    (state) => state.selectedClassQuizzes
  );

  const {studentScore} = useSelector((state) => state.studentQuizScore);

  useEffect(() => {
    if (selectedClassQuizDetails && selectedClassQuizDetails !== "")
      dispatch(getQuizDetailsInitiate(quizId));
    dispatch(getStudentScoreInitiate(quizId, currentUser.uid));
    return () => {
      dispatch(resetQuizDetailsInitiate());
    };
  }, [quizId]);

  return (
    <div>
      <ModuleMenuItems />
      {studentScore.id && studentScore.id ? (
        <Paper elevation={3} sx={{padding: 2}}>
          <Typography variant="h5" color="primary" gutterBottom>
            <b>{selectedClassQuizDetails.title}</b>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>You have written this exam </b>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>Your score is stated below:</b>
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            sx={{marginLeft: 2}}
          >
            <b>Objectives:</b> {studentScore.scqScore}
            <br />
            <b>Binary Choice Questions (T/F): </b>
            {studentScore.bqScore} <br />
            <b>Theory Questions: </b>This is yet to be uploaded
          </Typography>
          <br />
          {/* <Button
            variant="contained"
            color="success"
            component={Link}
            to={`/quizmain/${classId}/${quizId}`}
            startIcon={<PlayCircleOutlinedIcon />}
          >
            Start Quiz
          </Button> */}
        </Paper>
      ) : (
        <Paper elevation={3} sx={{padding: 2}}>
          <Typography variant="h5" color="primary" gutterBottom>
            <b>{selectedClassQuizDetails.title}</b>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>Duration: </b>
            {selectedClassQuizDetails.duration} mins.
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <b>Number of Questions to be Answered: </b>
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            sx={{marginLeft: 2}}
          >
            <b>Single Choice Questions:</b> {selectedClassQuizDetails.noqScq}
            <br />
            <b>Binary Choice Questions (T/F): </b>
            {selectedClassQuizDetails.noqBq} <br />
            <b>Theory Questions: </b> {selectedClassQuizDetails.noqTheory}
          </Typography>
          <br />
          <Button
            variant="contained"
            color="success"
            component={Link}
            to={`/quizmain/${classId}/${quizId}`}
            startIcon={<PlayCircleOutlinedIcon />}
          >
            Start Quiz
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default QuizDetails;
