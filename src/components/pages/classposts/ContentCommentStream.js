import React, { useEffect, useState } from "react";
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
import {Box} from "@mui/system";
import ReactHtmlParser from "react-html-parser";
import { format } from "date-fns";
import { getParentCommentsInitiate, resetParentCommentsInitiate } from "../../../redux/actions/PostCommentsActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ContentCommentStream() {

    const [postCommentsParent, setPostCommentsParent] = useState("");
    const [classColor, setClassColor] = useState("");

    const dispatch = useDispatch();
    const {classId} = useParams();
    const {moduleId} = useParams();
    const {postId} = useParams();
    const {parentComments} = useSelector((state) => state.contentComments);
  
    useEffect(() => {
      // console.log("Class Name ", classDetails );
      // console.log("Class ID ", classId );
      console.log("postId ID ", postId);

      if (parentComments && parentComments !== "") dispatch(getParentCommentsInitiate(postId));
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
              {parentComments && parentComments.map((commentParentItem, index) => (
                <div key={index}>
                  
                  <CardHeader
                    avatar={<Avatar sx={{width: 24, height: 24}}>C</Avatar> }
                    title={`Posted By - Adetunji oooo`}
                    subheader= {ReactHtmlParser(commentParentItem.comment)}
                    // action={<Button aria-label="settings">Post Reply</Button>}
                  />
                  {/* <CardContent sx={{paddingLeft: 5, paddingRight: 5}}> */}
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{paddingLeft: 5, paddingRight: 5}}
                    >
                     {
                      commentParentItem.createdAt
                        ? `- ${format(
                            new Date(commentParentItem.createdAt.toDate()),
                            "dd.MMM.yyyy - h:m a"
                          )}`
                        : "Posted now"
                    }
                     <Button aria-label="settings">Post Reply</Button>

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
                  {/* </CardContent> */}
                  <Divider />
                </div>
              ))}
            </Card>
          </Grid>
        </Box>
      </Grid>
  );
}

export default ContentCommentStream;
