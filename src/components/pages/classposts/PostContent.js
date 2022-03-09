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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {db} from "../../../firebase";
import ReactHtmlParser from "react-html-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Box} from "@mui/system";
import {format} from "date-fns";
//   import PostTitleBar from "./classposts/PostTitleBar";
import {useAuth} from "../../../context/AuthContext";
import PostTitleBar from "./PostTitleBar";
import ContentBody from "./ContentBody";
import ContentCommentStream from "./ContentCommentStream";
import {useDispatch} from "react-redux";
import {sendParentReplyInitiate} from "../../../redux/actions/postReplyAction";
import ModuleMenuItems from "../classmodules/ModuleMenuItems";

function PostContent() {
  const {currentUser} = useAuth();
  const {classId, moduleId} = useParams();
  const postDet = useRef([]);
  const [forceUpdate, setForceUpdate] = useState(Date.now());
  const [replyError, setReplyError] = useState(false);
  const [replySuccess, setReplySuccess] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const [sendPostId, setSendPostId] = useState("");
  //   const [postDetails, setPostDetails] = useState([]);
  const [className, setClassName] = useState("");
  const [classColor, setClassColor] = useState("");
  const [classLoadingInfo, setClassLoadingInfo] = useState(false);
  const [classError, setClassError] = useState("");

  const [moduleName, setModuleName] = useState("");
  const [moduleLoadingInfo, setModuleLoadingInfo] = useState(false);
  const [moduleError, setModuleError] = useState("");

  const [commentLoadingInfo, setCommentLoadingInfo] = useState(false);
  const postCommentsParent = useRef([]);

  const [reply, setReply] = useState("");

  const dispatch = useDispatch();
  const {postId} = useParams();

  const modules = {
    toolbar: [
      // [{font: []}],
      // [{size: ["small", false, "large", "huge"]}],
      ["bold", "italic", "underline", "link"],
      // [{list: "ordered"}, {list: "bullet"}],
      // [{align: []}],
      // [{color: []}, {background: []}],
      // ["clean"],
    ],
  };

  // const rteChange = this.rteChange.bind(this);

  const submitPost = () => {
    if (reply.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      console.log("Empty Reply");
      setReplyError(true);
    } else {
      const replyData = {
        comment: reply,
        userId: currentUser.uid,
        createdAt: db.getCurrentTimeStamp,
        updatedAt: "",
        status: "active",
        isChildComment: false,
        isParentComment: true,
        postId: postId,
        parentId: null,
      };
      // console.log("Reply ttttttttttt", replyData);

      dispatch(sendParentReplyInitiate(replyData));
      setReplyError(false);
      setReplySuccess(true);
      setReplyLoading(false);
      setReply("");
    }
  };

  return (
    <div>
      <Grid container>

        <ModuleMenuItems/>
        
        {/* Title Bar */}
        <PostTitleBar />

        {/* Content Body */}
        <ContentBody />
      </Grid>
      <Grid container>
        <Grid item xs={12} sx={{mt: "10px"}}>
          <Typography
            variant="subtitle1"
            color="primary"
            gutterBottom
            sx={{color: "#f50057"}}
          >
            <strong>Comment Stream</strong>
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        {/* Comment Box */}
        <ContentCommentStream />

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          sx={{mt: {xs: "10px", sm: "10px", md: "0px", lg: "0px"}}}
        >
          {replyError ? (
            <Alert severity="warning">
              Error! <strong>Comment cannot be empty</strong>
            </Alert>
          ) : null}
          {replyLoading ? (
            <Alert severity="info">
              Loading! <strong>Updating comment stream</strong>
            </Alert>
          ) : null}
          {replySuccess ? (
            <Alert severity="success">
              Success! <strong>Comment stream updated!</strong>
            </Alert>
          ) : null}
          <ReactQuill
            theme="snow"
            modules={modules}
            // formats={formats}
            onChange={setReply}
            value={reply}
            placeholder="Reply Post..."
          />

          <Grid item xs={12} sx={{mt: "10px"}}>
            <Button
              variant="contained"
              size="small"
              endIcon={<SendIcon />}
              onClick={submitPost}
              style={{textTransform: "none"}}
            >
              Post Reply
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default PostContent;
