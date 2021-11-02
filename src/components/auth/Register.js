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
  Button,
} from "@mui/material";
import {Box} from "@mui/system";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import React, {useRef, useState} from "react";
// import {useHistory} from "react-router";
import axios from "axios";
// import {useAuth} from "../../context/AuthContext";
import {useStyles} from "../../Styles/AuthStyle";
import FormErrors from "../FormErrors";
import PreviewImage from "../PreviewImage";
import {styled} from "@mui/styles";

function Register({handleChange}) {
  const classes = useStyles();
  // const {login} = useAuth();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  // const [profilePicBase64, setProfilePicBase64] = useState("");

  const Input = styled("input")({
    display: "none",
  });

  const fileRef = useRef(null);

  const initialVal = {
    email: "",
    displayName: "",
    sname: "",
    oname: "",
    role:'',
    phoneNumber: "",
    password: "",
    conf_password: "",
    file: null,
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
    file: Yup.mixed()
      .required("Please upload a profile picture")
      .test(
        "FILE_SIZE",
        "Uploaded file is too large.",
        (value) => !value || (value && value.size <= 200 * 200)
      )
      .test(
        "FILE_FORMAT",
        "Uploaded file format unsupported,",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      ),
  });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = (val, onSubmitProps) => {
    // console.log(val);
    setLoading(true);
    setLoading2(true);

    //Conver image to Base64 by calling function
    convertToBase64(val.file)
      .then((file) => {
        // console.log("Base 64 ---- " + file);
        const newBase64EncodedPicture = file.substring(file.indexOf(",") + 1);
        // setProfilePicBase64(newBase64EncodedPicture);
        // console.log("New Base - " + newBase64EncodedPicture);

        // console.log("Type - " + val.file.type);

        //Gather form data based on the success of image conversion to Base64
        const formData = {
          email: val.email,
          password: val.password,
          displayName: val.displayName,
          phoneNumber: val.phoneNumber,
          role: val.role,
          status: "pending",
          sname: val.sname,
          oname: val.oname,
          profilePic: newBase64EncodedPicture,
          extension: val.file.type,
        };
        // console.log("All Dataa - " + JSON.stringify(formData));
        const apiUrl =
          "https://us-central1-mlms-ec62a.cloudfunctions.net/userReg";

        setTimeout(() => {
          axios({
            method: "post",
            url: apiUrl,
            data: formData,
          })
            .then((res) => {
              setSuccess(res.data.message);
              onSubmitProps.resetForm();
              // console.log("Resss - " + res.status);
              // console.log('Resss - ' + res.data.statusText);
            })
            .catch((e) => {
              setError("Error Registering, Please try again!");
              // console.log(e);
            });
          setLoading(false);
          setLoading2("");
        }, 5000);
      })
      //Catch Block for Image to Base 64 conversion
      .catch((e) => {
        console.log(e);
      });

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
            <Typography variant="h6">PWA MLMS</Typography>
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
            {({values, setFieldValue}) => {
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
                        color="secondary"
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
                        required
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
                        required
                        helperText={
                          <ErrorMessage
                            name="conf_password"
                            component={FormErrors}
                          />
                        }
                      />
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item sm={6} xs={12}>
                      <Input
                        hidden
                        ref={fileRef}
                        type="file"
                        name="file"
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        onChange={(event) => {
                          setFieldValue("file", event.target.files[0]);
                        }}
                      />
                      Profile Picture Preview
                      {values.file && <PreviewImage file={values.file} />}
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        onClick={() => {
                          fileRef.current.click();
                        }}
                      >
                        Click to Upload Profile Picture
                      </Button>
                    </Grid>

                    <FormHelperText>
                      <ErrorMessage name="file" component={FormErrors} />
                    </FormHelperText>
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
                      disabled={values.isSubmitting}
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
