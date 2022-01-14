import {
  Grid,
} from "@mui/material";
import React from "react";
import PostTitle from "./classposts/PostTitle";
import PostTitleBar from "./classposts/PostTitleBar";


function ClassPosts() {

  return (
    <div>
      <Grid container>
        {/* Title Bar */}
        <PostTitleBar />

        {/* Post Titles */}
        <PostTitle />
      </Grid>
      
    </div>
  );
}

export default ClassPosts;
