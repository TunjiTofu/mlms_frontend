import {
  Divider,
  Grid,
  Chip,
  Typography,
  Box,
} from "@mui/material";
import {format} from "date-fns";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {
  getClassQuizzesInitiate,
  resetSelectedClassQuizInitiate,
} from "../../../redux/actions/quizAction";
import {useStylesPages} from "../../../Styles/PageStyles";
import ModuleMenuItems from "../classmodules/ModuleMenuItems";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";

function QuizList() {
  const {classId} = useParams();
  const classes = useStylesPages();

  const dispatch = useDispatch();
  const {allQuizzes} = useSelector((state) => state.selectedClassQuizzes);

  useEffect(() => {
    // console.log("Allll Modulesss ", allModules );
    if (allQuizzes && allQuizzes !== "")
      dispatch(getClassQuizzesInitiate(classId));
    return () => {
      dispatch(resetSelectedClassQuizInitiate());
    };
  }, []);

  return (
    <div>
      <ModuleMenuItems />
      <Grid container spacing={2}>
        {allQuizzes &&
          allQuizzes.map((quizItem, index) => (
            <Grid key={index} item xs={12}>
              <Divider />
              {quizItem.status === "active" ? (
                <Box
                  component={Link}
                  to={`/quiz/${classId}/${quizItem.quizId}`}
                  sx={{textDecoration: "none", color: "inherit"}}
                >
                  <Typography variant="h6" color="primary">
                    {quizItem.title}{" "}
                    <Chip
                      label="Active"
                      size="small"
                      color="success"
                      variant="outlined"
                      icon={<ToggleOnOutlinedIcon />}
                    />
                  </Typography>
                  <Typography>
                    Created On:{" "}
                    {format(
                      new Date(quizItem.createdAt.toDate()),
                      "E, dd/MMM/yyyy - h:m a"
                    )}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="h6" color="primary">
                    {quizItem.title}{" "}
                    <Chip
                      label="Disabled"
                      size="small"
                      variant="outlined"
                      icon={<ToggleOffOutlinedIcon />}
                    />
                  </Typography>
                  <Typography>
                    Created On:{" "}
                    {format(
                      new Date(quizItem.createdAt.toDate()),
                      "E, dd/MMM/yyyy - h:m a"
                    )}
                  </Typography>
                </Box>
              )}
              <Divider />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default QuizList;
