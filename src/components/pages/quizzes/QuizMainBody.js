import {
  Button,
  Divider,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import {useTheme} from "@mui/styles";
import {Box} from "@mui/system";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import {useStylesPages} from "../../../Styles/PageStyles";
import {useDispatch, useSelector} from "react-redux";
import {getRandomSCQInitiate, getScoreInitiate, resetSCQQuestionsInitiate} from "../../../redux/actions/scqActions";
import {getQuizDetailsInitiate} from "../../../redux/actions/quizAction";
import ReactHtmlParser from "react-html-parser";


const QuizMainBody = () => {
  const {classId} = useParams();
  const {quizId} = useParams();
  const classes = useStylesPages();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();

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
      // dispatch(getRandomSCQInitiate(quizId, selectedClassQuizDetails.noqScq));
    }
    return () => {
      dispatch(resetSCQQuestionsInitiate());
    };
  }, []);

  

  const handleClickNext=(e)=>{
    // console.log("Quest Index ", scqQuestionIndex);
    if (scqQuestionIndex + 1 < studentSCQQuestions.length) {
      setScqQuestionIndex(scqQuestionIndex + 1);
    } else {
      console.log("End of all Questions");
    }
  }

  const handleClickPrev=(e)=>{
    // console.log("Quest Index ", scqQuestionIndex);
    if (scqQuestionIndex - 1 > -1) {
      setScqQuestionIndex(scqQuestionIndex - 1);
    } else {
      console.log("Begining of all Questions");
    }
  }

  const handleClickAnswer = val=> () =>{
    // console.log("Ans Click", e)
    // console.log(e.target.dataset.id);

    // const question = response.results[questionIndex];
    // if (e.target.textContent === question.correct_answer) {
    //   dispatch(scoreChangeInitiate(score + 1));
    // }

    // const ans = studentSCQQuestions[scqQuestionIndex].answer
    // console.log("Quest Ans", ans);
    
    var selectedSCQAns = val
    const SCQQuestAns = studentSCQQuestions[scqQuestionIndex].answer

    console.log("Selected Ans ", val);
    console.log("Question Ans ", SCQQuestAns);
    if (SCQQuestAns === selectedSCQAns) {
      dispatch(getScoreInitiate(studentScore + 1))
    }
  }

  return (
    <>
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
          <Grid item xs={12} sx={{textAlign: "left"}}>
            <Paper elevation={0} className={classes.quizDetailsLayout}>
              <Typography variant="body2" color="primary">
                Question {scqQuestionIndex+1}/{studentSCQQuestions.length}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
          {studentSCQQuestions &&
                  studentSCQQuestions.map((scqItem, index) => (

                    scqQuestionIndex == index?

            <Paper elevation={3} className={classes.quizDetailsLayout} key={index}>
              <Grid item xs={12} mb={2}>
                
                    
                    <Typography variant="h6">
                     {/* { studentSCQQuestions[scqQuestionIndex].question} */}
                     {ReactHtmlParser( scqItem.question)}
                    </Typography> 
              </Grid>
              <Divider />
              <Grid item xs={12} mt={2}>
                <p>
                  A. <Button variant="outlined" style={{textTransform: "none"}} data-id="A" onClick={handleClickAnswer('A')} id="ansBtn">
                   {ReactHtmlParser(scqItem.optionA)}
                  </Button>
                </p>
                <p>
                  B. <Button variant="outlined" style={{textTransform: "none"}} data-id="B" onClick={handleClickAnswer('B')} id="ansBtn">
                  {ReactHtmlParser(scqItem.optionB)}

                  </Button>
                </p>
                <p>
                  C. <Button variant="outlined" style={{textTransform: "none"}} data-id="C" onClick={handleClickAnswer('C')} id="ansBtn">
                  {ReactHtmlParser(scqItem.optionC)}

                  </Button>
                </p>
                <p>
                  D. <Button variant="outlined" style={{textTransform: "none"}} data-id="D" onClick={handleClickAnswer('D')} id="ansBtn">
                  {ReactHtmlParser(scqItem.optionD)}

                  </Button>
                </p>
              </Grid>
            </Paper>
            :
            null
            ))}  

          </Grid>
          <Grid item xs={12} mt={1}>
            <Paper elevation={3} className={classes.quizDetailsLayout}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{textTransform: "none"}}
                onClick={handleClickPrev}
                
              >
                Previous
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                style={{textTransform: "none", float: "right"}}
                onClick={handleClickNext}
              >
                Next
              </Button>
            </Paper>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid item xs={12} sx={{textAlign: "left"}}>
            <Paper elevation={0} className={classes.quizDetailsLayout}>
              <Typography variant="body2" color="primary">
                Question 1/45
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.quizDetailsLayout}>
              <Grid item xs={12} mb={2}>
                <Typography variant="h6">
                  Water is good for the human body?
                </Typography>
              </Grid>
              <Divider />
              <Grid
                item
                xs={12}
                mt={2}
                sx={{display: "flex", justifyContent: "space-around"}}
              >
                <Button variant="outlined" style={{textTransform: "none"}}>
                  True
                </Button>

                <Button variant="outlined" style={{textTransform: "none"}}>
                  False
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} mt={1}>
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
              >
                Previous
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                style={{textTransform: "none"}}
              >
                Next
              </Button>
            </Paper>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid item xs={12} sx={{textAlign: "left"}} mb={1}>
            <Paper elevation={0}>
              <Typography variant="body2" color="primary">
                Question 1/8
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.quizDetailsLayout}>
              <Grid item xs={12}>
                <Grid item xs={12} mb={2}>
                  <Typography variant="h6">
                    List and Explain three types of water
                  </Typography>
                </Grid>
                <Divider />
                <Grid item xs={12} mt={2}>
                  <TextField
                    id="outlined-textarea"
                    label="Your Answer here..."
                    placeholder="Write your answer here..."
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  mt={2}
                  sx={{display: "flex", justifyContent: "space-around"}}
                >
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    style={{textTransform: "none"}}
                  >
                    Save Current Theory Answer
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} mt={1}>
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
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    style={{textTransform: "none"}}
                  >
                    Next
                  </Button>
                </Paper>
              </Grid>
            </Paper>
          </Grid>
        </TabPanel>
      </SwipeableViews>
      <Grid
        item
        xs={12}
        style={{display: "flex", justifyContent: "space-around"}}
      >
        <Button variant="contained" size="large" color="success">
          Submit All Examination
        </Button>
      </Grid>
    </>
  );
};

export default QuizMainBody;
