import {PersonAddOutlined, SendOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {
  Typography,
  Link,
  Card,
  CardContent,
  Grid,
  Avatar,
  Alert,
  TextField,
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import {Box} from "@mui/system";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React, {useState} from "react";
import {useHistory} from "react-router";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";
import {useStyles} from "../../Styles/AuthStyle";
import FormErrors from "../FormErrors";

function Register({handleChange}) {
  const classes = useStyles();
  const {login} = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const initialVal = {
    email: "",
    displayName: "",
    sname: "",
    oname: "",
    phoneNumber: "",
    password: "",
    conf_password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid Email Address")
      .required("This is a required field"),
    displayName: Yup.string()
      .min(4, "Username cannot be less than 4 characters")
      .max(8, "Username cannot be more than 8 characters"),
    sname: Yup.string()
      .trim()
      .required("This is a required field")
      .min(2, "Surname cannot be less than 2 characters")
      .max(255, "Username cannot be more than 255 characters"),
    oname: Yup.string()
      .trim()
      .required("This is a required field")
      .min(2, "Othernames cannot be less than 2 characters")
      .max(255, "Othernames cannot be more than 255 characters"),
    phoneNumber: Yup.number()
      .typeError("This field can only accept numbers")
      .min(1111111111)
      .max(99999999999)
      .required("This is a required field"),
    role: Yup.string()
      .oneOf(["STD", "TEA"], "Select a role")
      .required("This is a required field"),
    password: Yup.string()
      .min(6, "Password length should be a minimum, of 6 characters")
      .required("This is a required field"),
    conf_password: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password Mismatch")
      .min(6, "Your password must be at least 6 characters")
      .required("This Field is Required"),
  });

  const onSubmit = (val, onSubmitProps) => {
    setLoading(true);
    setLoading2(true);

    const formData = {
      email: val.email,
      password: val.password,
      displayName: val.displayName,
      phoneNumber: val.phoneNumber,
      role: val.role,
      status: "pending",
      sname: val.sname,
      oname: val.oname,
    };
    // console.log("All Dataa - " + JSON.stringify(formData));
    const apiUrl = "https://us-central1-mlms-ec62a.cloudfunctions.net/userReg";

    setTimeout(() => {
      axios({
        method: "post",
        url: apiUrl,
        data: formData,
      })
        .then((res) => {
          setSuccess(res.data.message);
          // console.log("Resss - " + res.status);
          // console.log('Resss - ' + res.data.statusText);
        })
        .catch((e) => {
          setError("Error Registering, Please try again!");
          // console.log(e);
        });
      setLoading(false);
      setLoading2("");
    }, 3000);

    onSubmitProps.resetForm();
    onSubmitProps.setSubmitting(false);
  };

  return (
    <div>
      <Card elevation={4} className={classes.login}>
        <CardContent>
          <Grid align="center">
            <Avatar sx={{bgcolor: "#039bef"}}>
              <PersonAddOutlined />
            </Avatar>
            <Typography variant="h6">SW MLMS</Typography>
            <Typography variant="subtitle1">Please Register!</Typography>
          </Grid>
          {error && (
            <Alert severity="warning">
              Error! <strong>{error}</strong>
            </Alert>
          )}
          {loading2 && (
            <Alert severity="info">
              Loading!{" "}
              <strong>Please wait while we process your registeration</strong>
            </Alert>
          )}

          {success && (
            <Alert severity="success">
              Success!{" "}
              <strong>
                {success} <span> </span>
                <Link href="#" onClick={() => handleChange("event", 0)}>
                  Click here to sign in
                </Link>
              </strong>
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
                  <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                      <Field
                        as={TextField}
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter Email Address"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        size="small"
                        helperText={
                          <ErrorMessage name="email" component={FormErrors} />
                        }
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <Field
                        as={TextField}
                        label="Username"
                        name="displayName"
                        // type="email"
                        placeholder="Enter Username"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        size="small"
                        helperText={
                          <ErrorMessage
                            name="displayName"
                            component={FormErrors}
                          />
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                      <Field
                        as={TextField}
                        label="Surname"
                        name="sname"
                        placeholder="Enter Surname"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        size="small"
                        helperText={
                          <ErrorMessage name="sname" component={FormErrors} />
                        }
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <Field
                        as={TextField}
                        label="Other Names"
                        name="oname"
                        placeholder="Enter Other Names"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        size="small"
                        helperText={
                          <ErrorMessage name="oname" component={FormErrors} />
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                      <Field
                        as={TextField}
                        label="Phone Number"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        size="small"
                        helperText={
                          <ErrorMessage
                            name="phoneNumber"
                            component={FormErrors}
                          />
                        }
                      />
                    </Grid>

                    <Grid item sm={6} xs={12}>
                      <FormControl
                        component="fieldset"
                        margin="dense"
                        fullWidth
                      >
                        <FormLabel component="legend">Register as</FormLabel>
                        <Field
                          as={RadioGroup}
                          aria-label="ender"
                          name="role"
                          style={{display: "initial"}}
                        >
                          <FormControlLabel
                            value="STD"
                            control={<Radio />}
                            label="Student"
                          />
                          <FormControlLabel
                            value="TEA"
                            control={<Radio />}
                            label="Teacher"
                          />
                        </Field>
                      </FormControl>
                      <FormHelperText>
                        <ErrorMessage name="role" component={FormErrors} />
                      </FormHelperText>
                    </Grid>
                  </Grid>

                  <Grid container spacing={1}>
                    <Grid item sm={6} xs={12}>
                      <Field
                        as={TextField}
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        size="small"
                        helperText={
                          <ErrorMessage
                            name="password"
                            component={FormErrors}
                          />
                        }
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Field
                        as={TextField}
                        label="Confirm Password"
                        name="conf_password"
                        type="password"
                        placeholder="Confirm Password"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        color="secondary"
                        size="small"
                        helperText={
                          <ErrorMessage
                            name="conf_password"
                            component={FormErrors}
                          />
                        }
                      />
                    </Grid>
                  </Grid>

                  <Box mt={2} mb={2}>
                    <LoadingButton
                      // onClick={handleClick}
                      type="submit"
                      endIcon={<SendOutlined />}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                      size="small"
                      fullWidth
                      className={classes.loginBtn}
                      disabled={formik.isSubmitting}
                    >
                      {/* {formik.isSubmitting ? setLoading(true) : "Login"} */}
                      Register
                    </LoadingButton>
                  </Box>
                </Form>
              );
            }}
          </Formik>

          <Typography>
            <Link href="#">Forgot Password?</Link>
          </Typography>
          <Typography>
            <Link href="#" onClick={() => handleChange("event", 0)}>
              Have an Account? Sign In
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
