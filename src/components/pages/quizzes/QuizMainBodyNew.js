import {
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {useTheme} from "@mui/styles";
import SwipeableViews from "react-swipeable-views";
import {Link, useParams} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {getQuizDetailsInitiate} from "../../../redux/actions/quizAction";
import {
  getRandomSCQInitiate,
  resetSCQQuestionsInitiate,
  selectOptionInitiate,
} from "../../../redux/actions/scqActions";
import {useStylesPages} from "../../../Styles/PageStyles";
import ReactHtmlParser from "react-html-parser";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const QuizMainBodyNew = () => {
  const {classId} = useParams();
  const {quizId} = useParams();
  const {currentUser} = useAuth();
  const classes = useStylesPages();

  const theme = useTheme();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{p: 3}}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const dispatch = useDispatch();

  const {selectedClassQuizDetails} = useSelector(
    (state) => state.selectedClassQuizzes
  );

  const {studentSCQQuestions, studentScore} = useSelector(
    (state) => state.selectedSCQQuestions
  );

  const [scqQuestionIndex, setScqQuestionIndex] = useState(0);

  useEffect(() => {
    if (studentSCQQuestions && studentSCQQuestions) {
      dispatch(getQuizDetailsInitiate(quizId));
      console.log("Allll Student SCQ ", studentSCQQuestions);
      dispatch(getRandomSCQInitiate(quizId, selectedClassQuizDetails.noqScq));
      //   dispatch(getRandomBQInitiate(quizId, selectedClassQuizDetails.noqBq));
      // dispatch(getRandomSCQInitiate(quizId, selectedClassQuizDetails.noqScq));
    }
    return () => {
      dispatch(resetSCQQuestionsInitiate());
      //   dispatch(resetBQQuestionsInitiate());
    };
  }, []);

  const [scqQuiz, setSCQQuiz] = useState([]);
  const [score, setScore] = useState({
    correct: 0,
    false: 0,
    length: 0,
  });

  const selectOption = (scqIndexSelected, optionSelected) => {
    // console.log("Index", scqIndexSelected);
    // console.log("Option Sele", optionSelected);

    scqQuiz.some((item) => item.sqIndex === scqIndexSelected)
      ? setSCQQuiz(
          scqQuiz.map((item, index) =>
            item.sqIndex === scqIndexSelected
              ? (scqQuiz[scqIndexSelected] = {
                  ...item,
                  optionSelected: optionSelected,
                })
              : item
          )
        )
      : setSCQQuiz([
          ...scqQuiz,
          {
            sqIndex: scqIndexSelected,
            optionSelected: optionSelected,
            selected: true,
          },
        ]);
  };

  // useEffect(() => {
  //   console.log("Quiz", scqQuiz);
  // }, [scqQuiz]);

  const previousQuestion = () => {
    if (scqQuestionIndex === 0) return;
    setScqQuestionIndex(scqQuestionIndex - 1);
  };

  const nextQuestion = () => {
    if (studentSCQQuestions.length - 1 === scqQuestionIndex) return;
    setScqQuestionIndex(scqQuestionIndex + 1);
  };

  const checkScore = () => {
    const questionAnswered = scqQuiz.filter((item) => item.optionSelected);
    // console.log("Q Answered", questionAnswered);
    const questionCorrect = questionAnswered.filter(
      (item) => item.optionSelected === studentSCQQuestions[item.sqIndex].answer
    );
    // console.log("Q Correct", questionCorrect);
    setScore({
      correct: questionCorrect.length,
      false: studentSCQQuestions.length - questionCorrect.length,
      length: studentSCQQuestions.length,
    });
  };

  useEffect(() => {
    checkScore();
  }, [scqQuiz]);

  console.log("Final Score ", score);

  return (
    <>
      <div>QuizMainBodyNew</div>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Objective" {...a11yProps(0)} />
          <Tab label="True/False" {...a11yProps(1)} />
          <Tab label="Theory" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid item xs={12} sx={{textAlign: "left", marginBottom: 2}}>
            <Paper elevation={1} className={classes.quizDetailsLayout}>
              <Typography variant="body2" color="primary">
                Question {scqQuestionIndex + 1}/{studentSCQQuestions.length}
              </Typography>
              <Stack direction="row" spacing={1}>
                {studentSCQQuestions.map((item, index) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: 30,
                      width: 35,
                      alignItems: "center",
                      marginRight: 5,
                      marginBottom: 5,
                      borderRadius: 5,
                      border: "solid thin",
                      cursor: "pointer",
                      fontSize: 12,
                      backgroundColor:
                        index === scqQuestionIndex
                          ? "greenyellow"
                          : "transparent",
                    }}
                    onClick={() => setScqQuestionIndex(index)}
                  >
                    <div> {index + 1} </div>

                    {scqQuiz.map((item) =>
                      item.sqIndex === index ? (
                        // <div style={{color: "green"}}><CheckCircleOutlineIcon/>{/* {index + 1} */}</div>
                        <div>
                          <CheckCircleOutlineIcon
                            color="success"
                            sx={{fontSize: 12}}
                          />
                        </div>
                      ) : null
                    )}
                  </div>
                ))}
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {/* {studentSCQQuestions.optionA} */}

            {studentSCQQuestions &&
              studentSCQQuestions.map((scqItem, index) => (
                <Typography variant="h6">
                  {index === scqQuestionIndex ? (
                    <Paper
                      elevation={1}
                      className={classes.quizDetailsLayout}
                      sx={{marginBottom: 2}}
                      key={index}
                    >
                      {scqQuestionIndex + 1}.{ReactHtmlParser(scqItem.question)}
                      <Divider />
                      {scqQuiz.some(
                        (item) =>
                          item.sqIndex === scqQuestionIndex &&
                          item.optionSelected === "A"
                      ) ? (
                        <Chip
                          label={ReactHtmlParser(scqItem.optionA)}
                          color="success"
                          sx={{marginTop: 2}}
                        />
                      ) : (
                        <Chip
                          label={ReactHtmlParser(scqItem.optionA)}
                          variant="outlined"
                          sx={{marginTop: 2}}
                          onClick={() => selectOption(scqQuestionIndex, "A")}
                        />
                      )}
                      <div />
                      {scqQuiz.some(
                        (item) =>
                          item.sqIndex === scqQuestionIndex &&
                          item.optionSelected === "B"
                      ) ? (
                        <Chip
                          label={ReactHtmlParser(scqItem.optionB)}
                          color="success"
                          sx={{marginTop: 2}}
                        />
                      ) : (
                        <Chip
                          label={ReactHtmlParser(scqItem.optionB)}
                          variant="outlined"
                          sx={{marginTop: 2}}
                          onClick={() => selectOption(scqQuestionIndex, "B")}
                        />
                      )}
                      <div />
                      {scqQuiz.some(
                        (item) =>
                          item.sqIndex === scqQuestionIndex &&
                          item.optionSelected === "C"
                      ) ? (
                        <Chip
                          label={ReactHtmlParser(scqItem.optionC)}
                          color="success"
                          sx={{marginTop: 2}}
                        />
                      ) : (
                        <Chip
                          label={ReactHtmlParser(scqItem.optionC)}
                          variant="outlined"
                          sx={{marginTop: 2}}
                          onClick={() => selectOption(scqQuestionIndex, "C")}
                        />
                      )}
                      <div />
                      {scqQuiz.some(
                        (item) =>
                          item.sqIndex === scqQuestionIndex &&
                          item.optionSelected === "D"
                      ) ? (
                        <Chip
                          label={ReactHtmlParser(scqItem.optionD)}
                          color="success"
                          sx={{marginTop: 2}}
                        />
                      ) : (
                        <Chip
                          label={ReactHtmlParser(scqItem.optionD)}
                          variant="outlined"
                          sx={{marginTop: 2}}
                          onClick={() => selectOption(scqQuestionIndex, "D")}
                        />
                      )}
                    </Paper>
                  ) : null}
                </Typography>
              ))}
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              className={classes.quizDetailsLayout}
              sx={{display: "flex", justifyContent: "space-between"}}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{textTransform: "none"}}
                onClick={() => previousQuestion()}
                disabled={scqQuestionIndex === 0 ? true : false}
              >
                Previous
              </Button>

              {studentSCQQuestions.length - 1 === scqQuestionIndex ? (
                <Link
                  // variant="contained"
                  // size="small"
                  // color="success"
                  // // href={"/summary"}
                  // to={"/summary"}
                  // state={{studentSCQQuestions, score}}
                  component="button"
                  style={{
                    textDecoration: "none",
                    backgroundColor: "green",
                    color: "#fff",
                    padding: 4,
                    borderRadius: 5,
                    fontSize: 15, border: "none"
                  }}
                  to={{
                    pathname: "/summary",
                    state: {studentSCQQuestions, scqQuiz, score},
                  }}
                >
                  Done with OBJ
                </Link>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  style={{textTransform: "none"}}
                  onClick={() => nextQuestion()}
                >
                  Next
                </Button>
              )}
            </Paper>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}></TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}></TabPanel>
      </SwipeableViews>
    </>
  );
};

export default QuizMainBodyNew;
