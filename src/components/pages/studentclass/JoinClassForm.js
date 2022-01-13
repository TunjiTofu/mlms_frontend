import React, { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
    AddCircleOutlined,
    CancelOutlined,
  } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import {useStylesPages} from "../../../Styles/PageStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormErrors from "../../FormErrors";
import {useTheme} from "@emotion/react";

function JoinClassForm() {
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

  return (
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
            Loading! <strong>Please wait while we process your request</strong>
          </Alert>
        )}

        {success && (
          <Alert severity="success">
            Success! <strong>{success}</strong>
          </Alert>
        )}

        <Formik
        // initialValues={initialVal}
        // validationSchema={validationSchema}
        // onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form>
                <DialogTitle>Join a Class</DialogTitle>
                <DialogContent>
                  <DialogContentText>Enter the Class Code</DialogContentText>
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
                      <ErrorMessage name="classCode" component={FormErrors} />
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
  );
}

export default JoinClassForm;
