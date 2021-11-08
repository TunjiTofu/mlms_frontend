import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import {useStylesPages} from "../../Styles/PageStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@emotion/react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormErrors from "../FormErrors";
import {
  AddCircleOutlined,
  CancelOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import * as Yup from "yup";
import axios from "axios";
import {db} from "../../firebase";
import {Box} from "@mui/system";
import { Link } from "react-router-dom";

function Dashboard() {
  const {currentUser, idToken} = useAuth();
  const classes = useStylesPages();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [errorClasses, setErrorClasses] = useState("");
  const [clssInfo, setClssInfo] = useState("");
  const classDetailRef = useRef([]);
  const [forceUpdate, setForceUpdate] = useState(Date.now());
  const items = [];

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const getClasses = () => {
    // console.log("Current User - " + currentUser.uid);
    setLoadingClasses(true);
    setClssInfo("");
    setTimeout(() => {
      setErrorClasses("");

      db.classesMembers
        .where("userId", "==", currentUser.uid)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              // console.log(doc.data().classId);

              const docId = doc.data().classId;
              db.classes
                .doc(docId)
                .get()
                .then((document) => {
                  items.push({docId, ...document.data()});
                });

              // db.classes
              //   .doc(docId)
              //   .onSnapshot({includeMetadataChanges: false}, (document) => {
              //     items.push({docId, ...document.data()});
              //     setClassDetails([...items]);
              //   });
            });
            setForceUpdate();
            classDetailRef.current = items;
            // console.log(classDetailRef.current);
          } else {
            setClssInfo("You have not joined any class!");
          }
        });
      setLoadingClasses(false);
    }, 5000);
  };

  useEffect(() => {
    getClasses();
  }, [forceUpdate]);

  //Initial Val
  const initialVal = {
    classCode: "",
  };

  //Validation Schema
  const validationSchema = Yup.object().shape({
    classCode: Yup.string().trim().required("This is a required field"),
  });

  //Onsubmit Function
  const onSubmit = (val, onSubmitProps) => {
    setLoading(true);
    setError("");
    setSuccess("");
    // console.log(val);

    const formData = {
      classCode: val.classCode,
      userId: currentUser.uid,
    };

    //////////////////**********KEEP FOR API CLOUD FUNCTIONS ********************//////////////////////////////////
    // console.log("All Dataa - " + JSON.stringify(formData));
    // console.log("Id Token- " + idToken);

    // const apiUrl =
    //   "https://us-central1-mlms-ec62a.cloudfunctions.net/userRegClasses";
    // setTimeout(() => {
    //   axios({
    //     method: "post",
    //     url: apiUrl,
    //     data: formData,
    //     headers: {
    //       "Authorization": `Bearer ${idToken}`,
    //       "Content-Type": "application/json",
    //     //   "Content-Type": "application/x-www-form-urlencoded",
    //       "Accept": "*/*",
    //       "Access-Control-Allow-Origin": "*",
    //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    //     },
    //   })
    //////////////////**********KEEP FOR API CLOUD FUNCTIONS ********************//////////////////////////////////

    setTimeout(() => {
      db.classes
        .where("classCode", "==", formData.classCode)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              const classIdentity = doc.id;
              const data = {
                classId: classIdentity,
                // classRef: db.classesRefDoc.doc('classes/' + classIdentity),
                userId: formData.userId,
                joinedAt: db.getCurrentTimeStamp(),
              };
              const uniqueId = classIdentity + "-" + data.userId;
              //Set Data to firestore table
              db.classesMembers
                .doc(uniqueId)
                .set(data)
                .catch((e) => {
                  setError("Unable to join class. Try again - " + e);
                });

              //check for changes in snapshot
              db.classesMembers.onSnapshot(
                {includeMetadataChanges: true},
                (snapshot) => {
                  snapshot.docChanges().forEach((change) => {
                    // console.log("Update Dataaaaaaaa: ", change);
                    if (change.type === "modified") {
                      setError("");
                      setSuccess("You have successfully joined the class");
                      setForceUpdate(); //force to trigger Usestate
                      window.location.reload(true); //Force a page reload
                    }
                  });
                }
              );
            });
          } else {
            setError("Class Not Found! Please try again!");
          }
        })
        .catch((e) => {
          setError("Error Joining Class, Please try again!");
          console.log(e);
        });
      setLoading(false);
      onSubmitProps.resetForm();
      onSubmitProps.setSubmitting(false);
    }, 2000);
    //Timeout to handle Modal Close
    setTimeout(() => {
      handleClose();
    }, 5000);
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Grid>
            <Typography variant="subtitle1">
              Welcome <strong>{currentUser.displayName}</strong>
            </Typography>
          </Grid>
          <Divider />

          <Grid container spacing={1} className={classes.spacingTop4}>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="subtitle1" color="primary">
                <strong>Current Classes</strong>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                onClick={handleOpen}
                title="Join a Class"
              >
                <AddIcon />
              </Fab>
            </Grid>

            <Dialog
              open={open}
              onClose={handleClose}
              fullScreen={fullScreen}
              fullWidth
            >
              {error && (
                <Alert severity="warning">
                  Error! <strong>{error}</strong>
                </Alert>
              )}
              {loading && (
                <Alert severity="info">
                  Loading!{" "}
                  <strong>Please wait while we process your request</strong>
                </Alert>
              )}

              {success && (
                <Alert severity="success">
                  Success! <strong>{success}</strong>
                </Alert>
              )}

              <Formik
                initialValues={initialVal}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {(formik) => {
                  return (
                    <Form>
                      <DialogTitle>Join a Class</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Enter the Class Code
                        </DialogContentText>
                        <Field
                          as={TextField}
                          autoFocus
                          name="classCode"
                          label="Class Code"
                          type="text"
                          placeholder="Enter Class Code"
                          variant="standard"
                          fullWidth
                          margin="normal"
                          color="secondary"
                          size="small"
                          required
                          autoComplete="off"
                          helperText={
                            <ErrorMessage
                              name="classCode"
                              component={FormErrors}
                            />
                          }
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={handleClose}
                          startIcon={<CancelOutlined />}
                          variant="outlined"
                          size="small"
                        >
                          Cancel
                        </Button>
                        <Button
                          // onClick={handleClose}
                          type="submit"
                          startIcon={<AddCircleOutlined />}
                          variant="outlined"
                          size="small"
                          disabled={formik.isSubmitting}
                        >
                          Join Class
                        </Button>
                      </DialogActions>
                    </Form>
                  );
                }}
              </Formik>
            </Dialog>
          </Grid>

          <Grid container spacing={2} className={classes.spacingTop4}>
            <Grid item xs={12}>
              {errorClasses && (
                <Alert severity="warning">
                  Error! <strong>{errorClasses}</strong>
                </Alert>
              )}
              {loadingClasses && (
                <Alert severity="info">
                  Loading!{" "}
                  <strong>Please wait while we load your classes</strong>
                </Alert>
              )}
              {clssInfo && (
                <Alert severity="info">
                  Info! <strong>{clssInfo}</strong>
                </Alert>
              )}
            </Grid>
            {classDetailRef.current.map((classItem) => (
              <Grid key={classItem.docId} item xs={12} sm={6} md={4}>
                {/* Card to Show Classes Start */}
                <Card
                  className={classes.cardMaxHeight}
                  sx={{border: `2px solid ${classItem.color}`}}
                >
                  <CardActionArea component={Link} to={`/class/${classItem.docId}`}>
                    {/* <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="green iguana"
                    /> */}
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        noWrap
                      >
                        {classItem.name}
                      </Typography>
                      <Box className={classes.cardContentWidth} component="div">
                        <Typography variant="body2" align="justify">
                          {classItem.description}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{
                        color: `${classItem.color}`,

                        backgroundColor: "#f5f3f3",
                      }}
                      component={Link}
                      to={`/class/${classItem.docId}`}
                      variant="outlined"
                      startIcon={<ExitToAppOutlined />}
                    >
                      Go to Class
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}

            {/* Card to Show Classes End */}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary">
              Upcoming Activities
            </Typography>
            <Divider />
            <Typography variant="subtitle1">
              One <br />
              Two <br />
              Three
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.spacingTop4}>
            <Typography variant="subtitle1" color="primary">
              News
            </Typography>
            <Divider />
            <Typography variant="subtitle1">
              One <br />
              Two <br />
              Three
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
