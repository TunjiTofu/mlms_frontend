import {
  Typography,
  Link,
  Grid,
  Avatar,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import React, {useState} from "react";
import {useStyles} from "../../Styles/AuthStyle";
import {Box} from "@mui/system";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";

function Login({handleChange}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const initialVal = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email("Enter a valid Email Address")
      .required("This is a required field"),
    password: Yup.string()
      .min(6, "Password length should be a minimu, of 6 characters")
      .required("This is a required field"),
  });

  const onSubmit = (val, onSubmitProps) => {
    setLoading(true);
    setTimeout(() => {
      console.log("Welcome");
      console.log(val);
      setLoading(false);
      onSubmitProps.setSubmitting(false);
    }, 1000);
  };

  return (
    <div>
      <Card elevation={4} className={classes.login}>
        <CardContent>
          <Grid align="center">
            <Avatar sx={{bgcolor: "#039bef"}}>
              <LockOpenOutlinedIcon />
            </Avatar>
            <Typography variant="h6">SW MLMS</Typography>
            <Typography variant="subtitle1">Please Login!</Typography>
          </Grid>

          <Formik
            initialValues={initialVal}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <Field
                    as={TextField}
                    label="Username"
                    name="username"
                    type="email"
                    placeholder="Enter Username"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="secondary"
                    size="small"
                    helperText={<ErrorMessage name="username" />}
                  />

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
                    helperText={<ErrorMessage name="password" />}
                  />

                  {/* <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? "Loading..." : "Login"}
                  </Button> */}

                  <Box mt={2} mb={2}>
                    <LoadingButton
                      // onClick={handleClick}
                      type="submit"
                      endIcon={<LoginOutlinedIcon />}
                      loading={loading}
                      loadingPosition="end"
                      variant="contained"
                      size="small"
                      fullWidth
                      className={classes.loginBtn}
                      disabled={formik.isSubmitting}
                    >
                      {/* {formik.isSubmitting ? setLoading(true) : "Login"} */}{" "}
                      Login
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
            <Link href="#" onClick={() => handleChange("event", 1)}>
              Don't Have an Account? Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
