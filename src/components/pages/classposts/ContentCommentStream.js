import React, {useEffect, useState} from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
} from "@mui/material";
import {AddCircleOutlined, CancelOutlined} from "@mui/icons-material";
import {Box} from "@mui/system";
import ReactHtmlParser from "react-html-parser";
import {format} from "date-fns";
import {
  getChildrenCommentsInitiate,
  getParentCommentsInitiate,
  resetParentCommentsInitiate,
} from "../../../redux/actions/PostCommentsActions";
import {useDispatch, useSelector} from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@emotion/react";
import {useParams} from "react-router-dom";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormErrors from "../../FormErrors";
import SendIcon from "@mui/icons-material/Send";
import * as Yup from "yup";
import { useAuth } from "../../../context/AuthContext";

function ContentCommentStream() {
  const {currentUser, idToken} = useAuth();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [postCommentsParent, setPostCommentsParent] = useState("");
  const [classColor, setClassColor] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const {classId} = useParams();
  const {moduleId} = useParams();
  const {postId} = useParams();
  const {parentComments} = useSelector((state) => state.contentComments);
  const {childrenComments} = useSelector((state) => state.contentComments);
  // const {id} = parentComments;

  // const callChildComment= (parentId)=>{
  //   console.log('Parent Iddddddddddddd', parentId);
  //   // dispatch(getChildrenCommentsInitiate(parentId));
  // };

  //Initial Val
  const initialVal = {
    childComment: "",
  };

  //Validation Schema
  const validationSchema = Yup.object().shape({
    childComment: Yup.string().trim().required("This is a required field"),
  });

   //Onsubmit Function
   const onSubmit = (val, onSubmitProps) => {
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = {
      childComment: val.childComment,
      userId: currentUser.uid,
      //Get the POST ID
      //Add others from below
    };
    console.log(formData);


    // createdAt: db.getCurrentTimeStamp,
    //     updatedAt: "",
    //     status: "active",
    //     isChildComment: false,
    //     isParentComment: true,
    //     postId: postId,
    //     parentId: null,
  }

  useEffect(() => {
    // console.log("Class Name ", classDetails );
    // console.log("Class ID ", classId );
    // console.log("Parent ID ", id);
    // dispatch(getChildrenCommentsInitiate(commentParentItem.id))
    // console.log("Childreeeennnn Commmmmmmmmm", callChildComment());
    // dispatch(getChildrenCommentsInitiate(parentId));
    // dispatch(getChildrenCommentsInitiate('7T3T8wag2tSXAraYX9Kz'));
    // callChildComment('7T3T8wag2tSXAraYX9Kz')
    // callChildComment();

    if (parentComments && parentComments !== "")
      dispatch(getParentCommentsInitiate(postId));
    return () => {
      dispatch(resetParentCommentsInitiate());
    };
  }, []);

  return (
    <Grid item xs={12} sm={12} md={8}>
      <Box
        // mr={2}
        display="flex"
        flexDirection="column"
        // justifyContent="flex-end" # DO NOT USE THIS WITH 'scroll'
        height="300px" // fixed the height
        sx={{
          border: `2px solid ${classColor}`,
          borderRadius: "5px",
          overflow: "hidden",
          overflowY: "scroll", // added scroll
          mr: {xs: "0px", sm: "0px", md: "10px"},
        }}
      >
        <Grid item xs={12} sx={{mt: "10px"}}>
          <Card item xs={12}>
            {parentComments &&
              parentComments.map((commentParentItem, index) => (
                <div key={index}>
                  <CardHeader
                    avatar={<Avatar sx={{width: 24, height: 24}}>C</Avatar>}
                    title={`Adetunji oooo`}
                    // subheader={ReactHtmlParser(commentParentItem.comment)}
                    // action={<Button aria-label="settings">Post Reply</Button>}
                  />
                  {/* <CardContent sx={{paddingLeft: 5, paddingRight: 5}}> */}
                  <Typography
                    gutterBottom
                    // variant="body2"
                    component="div"
                    sx={{
                      paddingLeft: 5,
                      paddingRight: 5,
                      fontSize: 12,
                      textAlign: "justify",
                    }}
                  >
                    {ReactHtmlParser(commentParentItem.comment)}
                    {commentParentItem.createdAt
                      ? `- ${format(
                          new Date(commentParentItem.createdAt.toDate()),
                          "dd.MMM.yyyy - h:m a"
                        )}`
                      : "Posted now"}
                    <Button aria-label="settings" onClick={handleOpen}>
                      Post Reply
                    </Button>
                  </Typography>
                  {childrenComments &&
                    childrenComments.map((commentChildItem, index) => (
                      <Typography
                        gutterBottom
                        // variant="subtitle2"
                        component="div"
                        sx={{
                          marginLeft: 10,
                          fontSize: 11,
                          textAlign: "justify",
                        }}
                      >
                        {commentParentItem.id === commentChildItem.parentId &&
                          ReactHtmlParser(commentChildItem.comment)}
                        {commentParentItem.id === commentChildItem.parentId &&
                          `By- ${commentChildItem.userId}`}
                      </Typography>
                    ))}
                  {/* </CardContent> */}
                  <Divider />
                </div>
              ))}
          </Card>
        </Grid>
      </Box>

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
        {/* {loading && (
          <Alert severity="info">
            Loading! <strong>Please wait while we process your request</strong>
          </Alert>
        )} */}

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
                <DialogTitle>Post a Reply to Selected Comment</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>Enter the Class Code</DialogContentText> */}
                  <Field
                    as={TextField}
                    autoFocus
                    name="childComment"
                    label="Comment"
                    type="text"
                    placeholder="Enter Reply ..."
                    variant="standard"
                    fullWidth
                    margin="normal"
                    color="primary"
                    size="small"
                    required
                    autoComplete="off"
                    helperText={
                      <ErrorMessage
                        name="childComment"
                        component={FormErrors}
                      />
                    }
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    // onClick={handleClose}
                    type="submit"
                    startIcon={<SendIcon />}
                    variant="outlined"
                    size="small"
                    disabled={formik.isSubmitting}
                  >
                    Reply Comment
                  </Button>
                  <Button
                    onClick={handleClose}
                    startIcon={<CancelOutlined />}
                    variant="outlined"
                    size="small"
                  >
                    Cancel
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

export default ContentCommentStream;
