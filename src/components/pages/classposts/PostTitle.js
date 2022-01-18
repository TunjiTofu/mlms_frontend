import React, {useEffect, useState} from "react";
import {Card, CardContent, Divider, Grid, Typography} from "@mui/material";
import {format} from "date-fns";
import ReactHtmlParser from "react-html-parser";

import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  getModulePostsInitiate,
  resetSelectedModulePostInitiate,
} from "../../../redux/actions/modulePostsActions";

function PostTitle() {
  const [postDet, setPostDet] = useState("");
  const [classColor, setClassColor] = useState("");

  // const {classDetails} = useSelector((state) => state.selectedClassDetails);
  // console.log("Class Details", classDetails);

  const dispatch = useDispatch();
  const {classId} = useParams();
  const {moduleId} = useParams();
  const {allPosts} = useSelector((state) => state.selectedModulePosts);

  useEffect(() => {
    if (allPosts && allPosts !== "") dispatch(getModulePostsInitiate(moduleId));
    return () => {
      dispatch(resetSelectedModulePostInitiate());
    };
  }, []);

  return (
    <Grid item xs={12} sx={{mt: "5px"}}>
      {/* <Card sx={{border: `1px solid ${classColor}`}}> */}
      <Card>
        <CardContent>
          {/* {setpostId(commentParentItem.commentId)} */}
          {allPosts &&
            allPosts.map((postItem, index) => (
              <Grid
                key={index}
                component={Link}
                to={`/postcontent/${classId}/${moduleId}/${postItem.id}`}
                // to={`/postcontent/${postItem.id}`}
                sx={{textDecoration: "none", color: "inherit"}}
              >
                <Typography variant="subtitle1" sx={{color: `${classColor}`}}>
                  <strong>
                    {index + 1}. {postItem.postTitle}{" "}
                  </strong>
                </Typography>
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{color: `${classColor}`, mb: "20px"}}
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
              </Grid>
            ))}
        
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PostTitle;
