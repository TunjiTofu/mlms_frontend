import {
  Alert,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {db} from "../../firebase";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Box} from "@mui/system";
import {format} from "date-fns";
import {useAuth} from "../../context/AuthContext";

function ClassPosts() {
  const {currentUser} = useAuth();
  const {classId, moduleId} = useParams();
  const postDet = useRef([]);
  const [forceUpdate, setForceUpdate] = useState(Date.now());
  const [reply, setReply] = useState("");
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
  const [commentLoadingError, setCommentLoadingError] = useState("");
  const postCommentsParent = useRef([]);
  const postCommentsChild = useRef([]);

  const getModule = () => {
    setModuleLoadingInfo(false);
    try {
      setTimeout(() => {
        db.classModules
          .doc(moduleId)
          .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
            if (qSnapshot.exists) {
              setModuleName(qSnapshot.data().moduleName);
            } else {
              setModuleLoadingInfo(true);
            }
          });
      }, 1000);
    } catch (err) {
      setModuleError("Error - " + err);
      console.log("Error getting Class Name", err);
    }
  };

  const getClass = () => {
    setClassLoadingInfo(false);
    try {
      setTimeout(() => {
        db.classes
          .doc(classId)
          .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
            if (qSnapshot.exists) {
              setClassName(qSnapshot.data().name);
              setClassColor(qSnapshot.data().color);
            } else {
              setClassLoadingInfo(true);
            }
          });
      }, 1000);
    } catch (err) {
      setClassError("Error - " + err);
      console.log("Error getting Class Name", err);
    }
  };

  // const getCommentsParent = () => {
  //   setCommentLoadingInfo(false);
  //   try {
  //     setTimeout(() => {
  //       db.postComments
  //         .orderBy("createdAt", "desc")
  //         .where("postId", "==", true)
  //         .where("isParentComment", "==", true)
  //         .where("status", "==", "active")
  //         .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
  //           console.log(qSnapshot);
  //           const allClassCommentsParent = [];
  //           if (qSnapshot.empty) {
  //             qSnapshot.forEach((doc) => {
  //               allClassCommentsParent.push({commentId: doc.id, ...doc.data()});
  //             });
  //             postCommentsParent.current = allClassCommentsParent;
  //             console.log("Parent Comment");
  //             console.log(postCommentsParent.current);
  //           } else {
  //             setCommentLoadingInfo(true);
  //           }
  //         });
  //     }, 2000);
  //   } catch (err) {
  //     setClassError("Error -  " + err);
  //     console.log("Error getting Class Name", err);
  //   }
  // };

  const getPosts = () => {
    // console.log("Module Id - " + moduleId);
    db.classPosts
      .orderBy("sortNumber", "asc")
      .where("module", "==", moduleId)
      .where("status", "==", "active")
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        const classPosts = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const postId = doc.id;
            setSendPostId(postId);
            classPosts.push({postId: doc.id, ...doc.data()});

            db.postComments
              .orderBy("createdAt", "desc")
              .orderBy("isParentComment", "desc")
              .orderBy("parentId", "desc")
              .where("postId", "==", postId)
              // .where("isParentComment", "==", true)
              .where("status", "==", "active")
              .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
                // console.log(qSnapshot);
                const allClassCommentsParent = [];
                if (!qSnapshot.empty) {
                  qSnapshot.forEach((doc) => {
                    allClassCommentsParent.push({
                      commentId: doc.id,
                      ...doc.data(),
                    });
                  });
                  postCommentsParent.current = allClassCommentsParent;
                  setForceUpdate();

                  // console.log("Parent Comment ");
                  // console.log(postCommentsParent.current);
                } else {
                  setCommentLoadingInfo(true);
                }
              });
          });
          postDet.current = classPosts;
          // console.log(postDet.current);
          // setQuillContent(postDet.current.postContent);
          //   setPostDetails(classPosts)
        } else {
          console.log(" No post found for selected Module");
          //   setModuleLoadingError(true)
          //   setModuleLoading(false)
        }
        // setUsers(classPosts)
        // console.log("Users");
        // console.log(users);
        setForceUpdate();
        // console.log("Post Use Ref-");
        // console.log(postDet.current);
        // console.log("Class Post Details Use State - ");
        // console.log(postDetails);
      });
  };

  useEffect(() => {
    getModule();
    getClass();
    // getPosts();
    // getCommentsParent()
  }, []);

  useEffect(() => {
    getPosts();
  }, [forceUpdate]);

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
      setReplyLoading(true);
      setReplySuccess(false);
      const replyData = {
        comment: reply,
        userId: currentUser.uid,
        createdAt: db.getCurrentTimeStamp,
        updatedAt: "",
        status: "active",
        isChildComment: false,
        isParentComment: true,
        postId: sendPostId,
        parentId: null,
      };

      setTimeout(() => {
        db.postComments
          .doc()
          .set(replyData)
          .catch((err) => {
            console.log("Error Posting Comment- " + err);
          });
        db.postComments.onSnapshot(
          {includeMetadataChanges: true},
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                // console.log("New Dataaaaaaaa: ", change);
                setReplyError(false);
                setReplySuccess(true);
                setReplyLoading(false);
                setForceUpdate();
              }
              // var source = snapshot.metadata.fromCache ? "local cache" : "server";
              // console.log("Data came from " + source);
            });
          }
        );
        setReply("");
      }, 2000);
      setReplyError(false);
      // console.log("rep ly-  " + reply);
      // console.log("ccc - " + classId);
      // console.log("mmm -" + moduleId);
      // console.log("postId -" + sendPostId);
      // console.log(replyData);
    }
  };

  // const getChild = (parentId) => {
  //   try {
  //     setTimeout(() => {
  //       db.postComments
  //         .orderBy("createdAt", "desc")
  //         .where("parentId", "==", parentId)
  //         .where("isParentComment", "==", false)
  //         .where("status", "==", "active")
  //         .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
  //           // console.log(qSnapshot);
  //           const allClassCommentsChild = [];
  //           if (!qSnapshot.empty) {
  //             qSnapshot.forEach((doc) => {
  //               allClassCommentsChild.push({
  //                 childCommentId: doc.id,
  //                 ...doc.data(),
  //               });
  //             });
  //             postCommentsChild.current = allClassCommentsChild;
  //             console.log("Child Comment ");
  //             console.log(postCommentsChild.current);
  //             return postCommentsChild.current;
  //           } else {
  //             setCommentLoadingInfo(true);
  //           }
  //         });
  //     }, 2000);
  //   } catch (err) {
  //     setClassError("Error - " + err);
  //     console.log("Error getting Child  Comment", err);
  //   }
  //   // return <div>Hello World! {parentId}</div>;
  // };

  return (
    <div>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{backgroundColor: `${classColor}`, color: "#ffffff", p: "8px"}}
        >
          <Typography variant="subtitle1" gutterBottom>
            <strong>Class:</strong> {className}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Module:</strong> {moduleName}
          </Typography>
        </Grid>
        {postDet.current.map((postItem) => (
          <Grid item xs={12} key={postItem.postId} sx={{mt: "5px"}}>
            <Card sx={{border: `1px solid ${classColor}`}}>
              <CardContent>
                {/* {setpostId(commentParentItem.commentId)} */}
                <Typography variant="subtitle1" sx={{color: `${classColor}`}}>
                  <strong>Post Title: </strong> {postItem.postTitle}
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{color: `${classColor}`}}
                >
                  {postItem.updatedAt
                    ? `Last Updated: ${format(
                        new Date(postItem.updatedAt.toDate()),
                        "E, dd/MMM/yyyy - h:m a"
                      )}`
                    : `Created On: ${format(
                        new Date(postItem.createdAt.toDate()),
                        "E, dd/MMM/yyyy - h:m a"
                      )}`}
                </Typography>
                <Divider />
                <Typography variant="body1" color="primary" gutterBottom>
                  {ReactHtmlParser(postItem.postContent)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
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
              mr: {xs: "0px", sm: "0px", md:"10px"},
            }}
          >
            <Grid item xs={12} sx={{mt: "10px"}}>
              <Card item xs={12}>
                {postCommentsParent.current.map((commentParentItem) => (
                  <div key={commentParentItem.commentId}>
                    <CardHeader
                      avatar={<Avatar sx={{width: 24, height: 24}}>C</Avatar>}
                      // title={ReactHtmlParser(commentParentItem.comment)}
                      subheader={
                        commentParentItem.createdAt
                          ? `Posted On: ${format(
                              new Date(commentParentItem.createdAt.toDate()),
                              "dd.MMM.yyyy - h:m a"
                            )}`
                          : "Posted now"
                      }
                      action={<Button aria-label="settings">Post Reply</Button>}
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {ReactHtmlParser(commentParentItem.comment)}
                      </Typography>
                      {
                        // getChild(commentParentItem.commentId)
                        // console.log("mmm - " +getChild(commentParentItem.commentId))
                        // .map((commentChildItem) => (
                        //   ReactHtmlParser(commentChildItem.comment)
                        // ))
                      }

                      {/* {postCommentsChild.current.map((commentChildItem) => (
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      {ReactHtmlParser(commentChildItem.comment)}
                    </Typography>
                  ))} */}
                    </CardContent>
                    <Divider />
                  </div>
                ))}
              </Card>
            </Grid>
          </Box>
        </Grid>

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
            >
              Reply
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ClassPosts;
