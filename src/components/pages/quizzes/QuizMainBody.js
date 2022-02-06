import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
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
import {
  getRandomSCQInitiate,
  getScoreInitiate,
  resetSCQQuestionsInitiate,
} from "../../../redux/actions/scqActions";
import {getQuizDetailsInitiate} from "../../../redux/actions/quizAction";
import ReactHtmlParser from "react-html-parser";

import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormErrors from "../../FormErrors";
import { addStudentScoreInitiate } from "../../../redux/actions/scoreActions";
import { db } from "../../../firebase";

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

  const handleClickNext = (e) => {
    // console.log("Quest Index ", scqQuestionIndex);
    if (scqQuestionIndex + 1 < studentSCQQuestions.length) {
      setScqQuestionIndex(scqQuestionIndex + 1);
    } else {
      console.log("End of all Questions");
    }
  };

  const handleClickPrev = (e) => {
    // console.log("Quest Index ", scqQuestionIndex);
    if (scqQuestionIndex - 1 > -1) {
      setScqQuestionIndex(scqQuestionIndex - 1);
    } else {
      console.log("Begining of all Questions");
    }
  };

  const handleClickAnswer = (val) => () => {
    // console.log("Ans Click", e)
    // console.log(e.target.dataset.id);

    // const question = response.results[questionIndex];
    // if (e.target.textContent === question.correct_answer) {
    //   dispatch(scoreChangeInitiate(score + 1));
    // }

    // const ans = studentSCQQuestions[scqQuestionIndex].answer
    // console.log("Quest Ans", ans);

    var selectedSCQAns = val;
    const SCQQuestAns = studentSCQQuestions[scqQuestionIndex].answer;

    console.log("Selected Ans ", val);
    console.log("Question Ans ", SCQQuestAns);
    if (SCQQuestAns === selectedSCQAns) {
      dispatch(getScoreInitiate(studentScore + 1));
    }
  };

  const steps = [
    {
      label: "Select campaign settings",
      description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    },
    {
      label: "Create an ad group",
      description:
        "An ad group contains one or more ads which target a shared set of keywords.",
    },
    {
      label: "Create an ad",
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  // const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = studentSCQQuestions.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  //Initial Val
  const initialVal = {
    // answers: {},
    answers: [],
  };

  // //Validation Schema
  // const validationSchema = Yup.object().shape({
  //   classCode: Yup.string().trim().required("This is a required field"),
  // });

  //Onsubmit Function
  const onSubmit = (val, onSubmitProps) => {
    // setLoading(true);
    // setError("");
    // setSuccess("");
    console.log(val);
    console.log(val.answers);
    const formData = {
      classId: classId,
      quizId: quizId,
      answers: val.answers,
      submittedAt: db.getCurrentTimeStamp,
    };
    // console.log(formData);
    dispatch(addStudentScoreInitiate(formData));
    // handleClose()
    // onSubmitProps.resetForm();
    onSubmitProps.setSubmitting(false);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialVal}
        // validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
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
                        Question {scqQuestionIndex + 1}/
                        {studentSCQQuestions.length}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    {studentSCQQuestions &&
                      studentSCQQuestions.map((scqItem, index) => (
                        <Paper
                          elevation={3}
                          className={classes.quizDetailsLayout}
                          key={index}
                        >
                          <Grid item xs={12} mb={2}>
                            <Typography variant="h6">
                              {/* { studentSCQQuestions[scqQuestionIndex].question} * */}
                              {ReactHtmlParser(scqItem.question)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} mt={2}>
                            <FormControl
                              component="fieldset"
                              margin="dense"
                              required
                              color="secondary"
                              fullWidth
                            >
                              <Field
                                as={TextField}
                                // name={`answers[${index}].id`}
                                value={`${scqItem.scqQuestionId}`}
                                // defaultValue={scqItem.scqQuestionId}
                                type="text"
                                // variant="standard"
                                // fullWidth
                                // margin="normal"
                                // color="secondary"
                                // size="small"
                                // required
                                // helperText={
                                //   <ErrorMessage
                                //     name="id"
                                //     component={FormErrors}
                                //   />
                                // }
                              />
                              <Field
                                as={RadioGroup}
                                aria-label="ender"
                                // name={scqItem.scqQuestionId}
                                name={`answers[${index}].selectedOption`}
                                onClick={() => {
                                  formik.setFieldValue(
                                    `answers[${index}].id`,
                                    `${scqItem.scqQuestionId}`
                                  );
                                }}
                                onChange={(event) => {
                                  formik.setFieldValue(
                                    `answers[${index}].selectedOption`,
                                    event.currentTarget.value
                                  );
                                }}

                                // style={{display: "initial"}}
                              >
                                <FormControlLabel
                                  value="A"
                                  control={<Radio />}
                                  label={ReactHtmlParser(scqItem.optionA)}
                                />
                                <FormControlLabel
                                  value="B"
                                  control={<Radio />}
                                  label={ReactHtmlParser(scqItem.optionB)}
                                />
                                <FormControlLabel
                                  value="C"
                                  control={<Radio />}
                                  label={ReactHtmlParser(scqItem.optionC)}
                                />
                                <FormControlLabel
                                  value="D"
                                  control={<Radio />}
                                  label={ReactHtmlParser(scqItem.optionD)}
                                />
                              </Field>
                            </FormControl>
                            {/* <FormHelperText>
                              <ErrorMessage
                                name="role"
                                component={FormErrors}
                              />
                            </FormHelperText> */}
                          </Grid>
                          <Divider />
                        </Paper>
                      ))}

                    {/* {studentSCQQuestions &&
              studentSCQQuestions.map((scqItem, index) =>
                scqQuestionIndex == index ? (
                  <Paper
                    elevation={3}
                    className={classes.quizDetailsLayout}
                    key={index}
                  >
                    <Grid item xs={12} mb={2}>
                      <Typography variant="h6">
                        {/* { studentSCQQuestions[scqQuestionIndex].question} *
                        {ReactHtmlParser(scqItem.question)}
                      </Typography>
                    </Grid>
                    <Divider />
                    <Grid item xs={12} mt={2}>
                      <p>
                        A.{" "}
                        <Button
                          variant="outlined"
                          style={{textTransform: "none"}}
                          data-id="A"
                          onClick={handleClickAnswer("A")}
                          id="ansBtn"
                        >
                          {ReactHtmlParser(scqItem.optionA)}
                        </Button>
                      </p>
                      <p>
                        B.{" "}
                        <Button
                          variant="outlined"
                          style={{textTransform: "none"}}
                          data-id="B"
                          onClick={handleClickAnswer("B")}
                          id="ansBtn"
                        >
                          {ReactHtmlParser(scqItem.optionB)}
                        </Button>
                      </p>
                      <p>
                        C.{" "}
                        <Button
                          variant="outlined"
                          style={{textTransform: "none"}}
                          data-id="C"
                          onClick={handleClickAnswer("C")}
                          id="ansBtn"
                        >
                          {ReactHtmlParser(scqItem.optionC)}
                        </Button>
                      </p>
                      <p>
                        D.{" "}
                        <Button
                          variant="outlined"
                          style={{textTransform: "none"}}
                          data-id="D"
                          onClick={handleClickAnswer("D")}
                          id="ansBtn"
                        >
                          {ReactHtmlParser(scqItem.optionD)}
                        </Button>
                      </p>
                      <input type="radio" value="radio" name="radio" />
                    </Grid>
                  </Paper>
                ) : null
              )} */}
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
                        <Button
                          variant="outlined"
                          style={{textTransform: "none"}}
                        >
                          True
                        </Button>

                        <Button
                          variant="outlined"
                          style={{textTransform: "none"}}
                        >
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
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
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
                {/* <Button variant="contained" size="large" color="success">
          Submit All Examination
        </Button> */}

                <Button
                  // onClick={handleClose}
                  type="submit"
                  // startIcon={<AddCircleOutlined />}
                  variant="contained"
                  size="lare"
                  color="success"
                  disabled={formik.isSubmitting}
                >
                  Submit All Examination
                </Button>
              </Grid>
            </Form>
          );
        }}
      </Formik>

      <Box sx={{maxWidth: 400, flexGrow: 1}}>
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "#cccccc",
          }}
        >
          <Typography>{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{height: 255, maxWidth: 400, width: "100%", p: 2}}>
          {steps[activeStep].description}
          <input type="radio" name="radio" value="radio" /> Radio
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
    </>
  );
};

export default QuizMainBody;
