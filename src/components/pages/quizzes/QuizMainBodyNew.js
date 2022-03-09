import {
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Box} from "@mui/system";
import {useTheme} from "@mui/styles";
import SwipeableViews from "react-swipeable-views";
import {Link, useHistory, useParams} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext";
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {getQuizDetailsInitiate} from "../../../redux/actions/quizAction";
import {
  getRandomSCQInitiate,
  resetSCQQuestionsInitiate,
} from "../../../redux/actions/scqActions";
import {useStylesPages} from "../../../Styles/PageStyles";
import ReactHtmlParser from "react-html-parser";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  getRandomBQInitiate,
  resetBQQuestionsInitiate,
} from "../../../redux/actions/bqActions";
import {useTimer} from "react-timer-hook";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import {
  getRandomTheoryInitiate,
  resetTheoryQuestionsInitiate,
} from "../../../redux/actions/theoryActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuizMainBodyNew = () => {
  const {classId} = useParams();
  const {quizId} = useParams();
  const {currentUser} = useAuth();
  const userID = currentUser.uid;
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

  const {studentBQQuestions} = useSelector(
    (state) => state.selectedBQQuestions
  );

  const {studentTheoryQuestions} = useSelector(
    (state) => state.selectedTheoryQuestions
  );

  const [scqQuestionIndex, setScqQuestionIndex] = useState(0);
  const [bqQuestionIndex, setBqQuestionIndex] = useState(0);
  const [theoryQuestionIndex, setTheoryQuestionIndex] = useState(0);

  useEffect(() => {
    dispatch(getQuizDetailsInitiate(quizId));

    dispatch(getRandomSCQInitiate(quizId, selectedClassQuizDetails.noqScq));
    dispatch(getRandomBQInitiate(quizId, selectedClassQuizDetails.noqBq));
    dispatch(
      getRandomTheoryInitiate(quizId, selectedClassQuizDetails.noqTheory)
    );

    // console.log("Allll Student SCQ ", studentSCQQuestions);
    // console.log("Allll Student BQ ", studentBQQuestions);
    // console.log("Allll Student Theory ", studentTheoryQuestions);

    return () => {
      dispatch(resetSCQQuestionsInitiate());
      dispatch(resetBQQuestionsInitiate());
      dispatch(resetTheoryQuestionsInitiate());
    };
  }, []);

  const [scqQuiz, setSCQQuiz] = useState([]);
  const [bqQuiz, setBQQuiz] = useState([]);
  const [theoryQuiz, setTheoryQuiz] = useState([]);

  const [score, setScore] = useState({
    correct: 0,
    false: 0,
    length: 0,
  });

  const [bqScore, setBqScore] = useState({
    bqCorrect: 0,
    bqFalse: 0,
    bqLength: 0,
  });

  const [theoryScore, setTheoryScore] = useState({
    theoryCorrect: 0,
    theoryFalse: 0,
    theoryLength: 0,
  });

  const selectOption = (scqIndexSelected, optionSelected) => {
    // console.log("Index", scqIndexSelected);
    // console.log("Option Sele", optionSelected);

    setTimeout(() => {
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
    }, 200);
  };

  const selectBQOption = (bqIndexSelected, optionSelected) => {
    // console.log("Index", bqIndexSelected);
    // console.log("Option Sele", optionSelected);

    setTimeout(() => {
      bqQuiz.some((item) => item.bqIndex === bqIndexSelected)
        ? setBQQuiz(
            bqQuiz.map((item, index) =>
              item.bqIndex === bqIndexSelected
                ? (bqQuiz[bqIndexSelected] = {
                    ...item,
                    optionSelected: optionSelected,
                  })
                : item
            )
          )
        : setBQQuiz([
            ...bqQuiz,
            {
              bqIndex: bqIndexSelected,
              optionSelected: optionSelected,
              selected: true,
            },
          ]);
    }, 200);
  };

  const [theoryAns, setTheoryAns] = useState("");

  // useEffect(() => {
  //   console.log("T/FFF", bqQuiz);
  // }, [bqQuiz]);

  const previousQuestion = () => {
    if (scqQuestionIndex === 0) return;
    setScqQuestionIndex(scqQuestionIndex - 1);
  };

  const previousBqQuestion = () => {
    if (bqQuestionIndex === 0) return;
    setBqQuestionIndex(bqQuestionIndex - 1);
  };

  // const previousTheoryQuestion = () => {
  //   if (theoryQuestionIndex === 0) return;
  //   setTheoryQuestionIndex(theoryQuestionIndex - 1);
  // };

  const nextQuestion = () => {
    if (studentSCQQuestions.length - 1 === scqQuestionIndex) return;
    setScqQuestionIndex(scqQuestionIndex + 1);
  };

  const nextBqQuestion = () => {
    if (studentBQQuestions.length - 1 === bqQuestionIndex) return;
    setBqQuestionIndex(bqQuestionIndex + 1);
  };

  // const nextTheoryQuestion = () => {
  //   if (studentTheoryQuestions.length - 1 === theoryQuestionIndex) return;
  //   setTheoryQuestionIndex(theoryQuestionIndex + 1);
  // };

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

  const checkBqScore = () => {
    const questionBqAnswered = bqQuiz.filter((item) => item.optionSelected);
    // console.log("Q Answered", questionAnswered);
    const questionBqCorrect = questionBqAnswered.filter(
      (item) => item.optionSelected === studentBQQuestions[item.bqIndex].answer
    );
    // console.log("Q Correct", questionCorrect);
    setBqScore({
      bqCorrect: questionBqCorrect.length,
      bqFalse: studentBQQuestions.length - questionBqCorrect.length,
      bqLength: studentBQQuestions.length,
    });
  };

  useEffect(() => {
    checkScore();
  }, [scqQuiz]);

  useEffect(() => {
    checkBqScore();
  }, [bqQuiz]);

  // console.log("Final SCQ Score ", score);
  // console.log("Final BQ Score ", bqScore);

  const history = useHistory();

  const MINUTES = 10 * 60;
  const time = new Date();
  time.setSeconds(time.getSeconds() + MINUTES); // 10 minutes timer

  const {
    seconds,
    minutes,
    hours,
    // days,
    // isRunning,
    // start,
    // pause,
    // resume,
    // restart,
  } = useTimer({
    expiryTimestamp: time,
    onExpire: () =>
      setTimeout(() => {
        alert("Time Up");
        history.push({
          pathname: "/summary",
          state: {
            studentSCQQuestions,
            scqQuiz,
            score,
            studentBQQuestions,
            bqQuiz,
            bqScore,
            classId,
            quizId,
            userID,
            theoryAns,
            studentTheoryQuestions,
          },
        });
      }, 1000),
    // null,

    // null,

    // history.push("/summary", {
    //   state: {
    //     studentSCQQuestions,
    //     scqQuiz,
    //     score,
    //     studentBQQuestions,
    //     bqQuiz,
    //     bqScore,
    //     classId,
    //     quizId,
    //     userID,
    //   },
    // }),
  });

  const modules = {
    toolbar: [
      [{font: []}],
      [{size: ["small", false, "large", "huge"]}],
      ["bold", "italic", "underline"],
      // ["bold", "italic", "underline", "link"],
      [{list: "ordered"}, {list: "bullet"}],
      [{align: []}],
      [{color: []}],
      // [{color: []}, {background: []}],
      ["clean"],
    ],
  };

  return (
    <>
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
            {/* <p>
              <Button
                variant="contained"
                color="error"
                size="small"
                style={{textTransform: "none", float: "right"}}
              >
                Quit Test
              </Button>
            </p> */}
            <Typography variant="h2" color="primary">
              <AccessTimeOutlinedIcon sx={{fontSize: 50}} />
              {hours}:{minutes}:{seconds}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12}>
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
            {/* <Tab label="Theory" {...a11yProps(2)} /> */}
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
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{marginBottom: 1}}
                >
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
                        {/* {scqQuestionIndex + 1}. */}
                        {ReactHtmlParser(scqItem.question)}
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

                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  style={{textTransform: "none"}}
                  onClick={() => nextQuestion()}
                  disabled={
                    studentSCQQuestions.length - 1 === scqQuestionIndex
                      ? true
                      : false
                  }
                >
                  Next
                </Button>

                {/* {studentSCQQuestions.length - 1 === scqQuestionIndex ? (
                <Link
                  style={{
                    textDecoration: "none",
                    backgroundColor: "green",
                    color: "#fff",
                    padding: 6,
                    borderRadius: 3,
                    fontSize: 12,
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
              )} */}
              </Paper>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Grid item xs={12} sx={{textAlign: "left", marginBottom: 2}}>
              <Paper elevation={1} className={classes.quizDetailsLayout}>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{marginBottom: 1}}
                >
                  Question {bqQuestionIndex + 1}/{studentBQQuestions.length}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {studentBQQuestions.map((item, index) => (
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
                          index === bqQuestionIndex
                            ? "greenyellow"
                            : "transparent",
                      }}
                      onClick={() => setBqQuestionIndex(index)}
                    >
                      <div> {index + 1} </div>

                      {bqQuiz.map((item) =>
                        item.bqIndex === index ? (
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
              {studentBQQuestions &&
                studentBQQuestions.map((bqItem, index) => (
                  <Typography variant="h6">
                    {index === bqQuestionIndex ? (
                      <Paper
                        elevation={1}
                        className={classes.quizDetailsLayout}
                        sx={{marginBottom: 2}}
                        key={index}
                      >
                        {/* {bqQuestionIndex + 1}. */}
                        {ReactHtmlParser(bqItem.question)}
                        <Divider />
                        {bqQuiz.some(
                          (item) =>
                            item.bqIndex === bqQuestionIndex &&
                            item.optionSelected === "true"
                        ) ? (
                          <Chip
                            label="True"
                            color="success"
                            sx={{marginTop: 2, marginRight: 3}}
                          />
                        ) : (
                          <Chip
                            label="True"
                            variant="outlined"
                            sx={{marginTop: 2, marginRight: 3}}
                            onClick={() =>
                              selectBQOption(bqQuestionIndex, "true")
                            }
                          />
                        )}
                        {bqQuiz.some(
                          (item) =>
                            item.bqIndex === bqQuestionIndex &&
                            item.optionSelected === "false"
                        ) ? (
                          <Chip
                            label="False"
                            color="success"
                            sx={{marginTop: 2}}
                          />
                        ) : (
                          <Chip
                            label="False"
                            variant="outlined"
                            sx={{marginTop: 2, marginRight: 3}}
                            onClick={() =>
                              selectBQOption(bqQuestionIndex, "false")
                            }
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
                  onClick={() => previousBqQuestion()}
                  disabled={bqQuestionIndex === 0 ? true : false}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  style={{textTransform: "none"}}
                  onClick={() => nextBqQuestion()}
                  disabled={
                    studentBQQuestions.length - 1 === bqQuestionIndex
                      ? true
                      : false
                  }
                >
                  Next
                </Button>
              </Paper>
            </Grid>
          </TabPanel>
          {/* <TabPanel value={value} index={2} dir={theme.direction}>
            <Grid item xs={12} sx={{textAlign: "left", marginBottom: 2}}>
              <Paper elevation={1} className={classes.quizDetailsLayout}>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{marginBottom: 1}}
                >
                  Question {theoryQuestionIndex + 1}/
                  {studentTheoryQuestions.length}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {studentTheoryQuestions.map((item, index) => (
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
                          index === theoryQuestionIndex
                            ? "greenyellow"
                            : "transparent",
                      }}
                      onClick={() => setTheoryQuestionIndex(index)}
                    >
                      <div> {index + 1} </div>

                    
                    </div>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </TabPanel> */}
        </SwipeableViews>
      </Grid>

      {/* <Divider /> */}
      <Grid item xs={12}>
        <Paper
          elevation={2}
          sx={{margin: 2}}
          className={classes.quizDetailsLayout}
        >
          <Typography variant="h6" color="primary" sx={{fontWeight: "bold"}}>
            Theory Questions
          </Typography>
          <Typography variant="body1">
            {/* {index === theoryQuestionIndex ? ( */}

            {studentTheoryQuestions &&
              studentTheoryQuestions.map((theoryItem, index) => (
                <div key={index}>
                  <div style={{fontWeight: "bold"}}>Question {index + 1}.</div>

                  {ReactHtmlParser(theoryItem.question)}
                  <Chip
                    label={`${theoryItem.score} marks`}
                    variant="outlined"
                    color="primary"
                    sx={{marginBottom: 1}}
                  />
                  <Divider />
                </div>
              ))}
          </Typography>

          <Typography variant="h6" color="secondary"><b>Answer Sheet</b></Typography>
          <ReactQuill
            theme="snow"
            modules={modules}
            // formats={formats}
            onChange={setTheoryAns}
            value={theoryAns}
            placeholder="Your Answer Here..."
          />
          {/* 
          <TextField
            label="You Answer Here..."
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            sx={{marginTop: 1}}
            value={theoryAns}
            onChange={(e) => setTheoryAns(e.target.value)}
          /> */}
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Link
          style={{
            textDecoration: "none",
            backgroundColor: "green",
            color: "#fff",
            padding: 10,
            borderRadius: 3,
            fontSize: 15,
            display: "grid",
            justifyContent: "center",
          }}
          to={{
            pathname: "/summary",
            state: {
              studentSCQQuestions,
              scqQuiz,
              score,
              studentBQQuestions,
              bqQuiz,
              bqScore,
              classId,
              quizId,
              userID,
              theoryAns,
              studentTheoryQuestions,
            },
          }}
        >
          Submit Exam
        </Link>
        {/* <TextField
          label="You Answer Here..."
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          sx={{marginTop: 1}}
          value={theoryAns}
          onChange={(e) => setTheoryAns(e.target.value)}
        /> */}
      </Grid>
    </>
  );
};

export default QuizMainBodyNew;
