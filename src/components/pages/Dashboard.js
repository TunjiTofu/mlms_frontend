import {
  Alert,
  Button,
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
import React, {useState} from "react";
import {useAuth} from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import {useStylesPages} from "../../Styles/PageStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@emotion/react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormErrors from "../FormErrors";
import {AddCircleOutlined, CancelOutlined} from "@mui/icons-material";
import * as Yup from "yup";
import axios from "axios";

function Dashboard() {
  const {currentUser, idToken} = useAuth();
  const classes = useStylesPages();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
    console.log(val);

    const formData = {
      classCode: val.classCode,
      userId: currentUser.uid,
    };
    console.log("All Dataa - " + JSON.stringify(formData));
    console.log("Id Token- " + idToken);

    const apiUrl =
      "https://us-central1-mlms-ec62a.cloudfunctions.net/userRegClasses";
    setTimeout(() => {
      axios({
        method: "post",
        url: apiUrl,
        data: formData,
        headers: {"Authorization": `Bearer ${idToken}`},
      })
        .then((res) => {
          setSuccess(res.data.message);
          onSubmitProps.resetForm();
          // console.log("Resss - " + res.status);
          // console.log('Resss - ' + res.data.statusText);
        })
        .catch((e) => {
          setError("Error Joining Class, Please try again!");
          // console.log(e);
        });
      setLoading(false);
    }, 2000);

    onSubmitProps.setSubmitting(false);
    // handleClose()
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={8}>
          <Grid>
            <Typography variant="subtitle1">
              Welcome <strong>{currentUser.displayName}</strong>
            </Typography>
          </Grid>
          <Divider />

          <Grid container spacing={1} className={classes.spacingTop4}>
            <Grid item xs={12} sm={12} md={8}>
              <Typography variant="h5" color="primary">
                Your Class
              </Typography>
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <Fab
                color="primary"
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
          <Grid>
            <Typography variant="h6">
              Welcome <strong>{currentUser.email}</strong>
              <br />
              User Id <strong>{currentUser.uid}</strong>
              <br />
              Email Verified <strong>{currentUser.emailVerified}</strong>
              User Id <strong>{currentUser.uid}</strong>
              <br />
              {/* ID Token <strong>{idToken}</strong> */}
              {/* <br />
            Display Name <strong>{currentUser.displayName}</strong>
            <br />
            Email Verified <strong>{currentUser.emailVerified}</strong> */}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          B
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
