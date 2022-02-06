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

function QuizDetails() {
  const {classId} = useParams();
  const {quizId} = useParams();
  const classes = useStylesPages();

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
    <div>
      <ModuleMenuItems />
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
        <Typography variant="subtitle2" color="secondary" sx={{marginLeft: 2}}>
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
          component={Link} to={`/quizmain/${classId}/${quizId}`}
          startIcon={<PlayCircleOutlinedIcon />}
        >
          Start Quiz
        </Button>
      </Paper>
    </div>
  );
}

export default QuizDetails;
