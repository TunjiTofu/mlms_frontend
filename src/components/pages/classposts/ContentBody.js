import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";
// import {format} from "date-fns";
import React, {useEffect, useState} from "react";
import ReactHtmlParser from "react-html-parser";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
  getPostDetailsInitiate,
  resetSelectedPostDetailsInitiate,
} from "../../../redux/actions/modulePostsActions";

function ContentBody() {
  // const [postDet, setPostDet] = useState("");
  const [classColor, setClassColor] = useState("");

  const dispatch = useDispatch();
  const {postId} = useParams();
  const {selectedPostDetails} = useSelector(
    (state) => state.selectedModulePosts
  );

  useEffect(() => {
    // console.log("postId ID ", postId);

    if (selectedPostDetails && selectedPostDetails !== "")
      dispatch(getPostDetailsInitiate(postId));
    return () => {
      dispatch(resetSelectedPostDetailsInitiate());
    };
  }, []);

  return (
    <Grid item xs={12} sx={{mt: "5px"}}>
      <Card sx={{border: `1px solid ${classColor}`}}>
        <CardContent>
          {/* {setpostId(commentParentItem.commentId)} */}
          <Typography variant="subtitle1" sx={{color: `${classColor}`}}>
            <strong>{selectedPostDetails.postTitle}  </strong>
          </Typography>
          <Divider />
          <Typography variant="body1" color="primary" gutterBottom>
            {ReactHtmlParser(selectedPostDetails.postContent)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default ContentBody;
