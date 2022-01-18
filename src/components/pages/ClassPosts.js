import {Grid} from "@mui/material";
import React from "react";
import ModuleMenuBar from "./classmodules/ModuleMenuBar";
import ModuleMenuItems from "./classmodules/ModuleMenuItems";
import PostTitle from "./classposts/PostTitle";
import PostTitleBar from "./classposts/PostTitleBar";

function ClassPosts() {
  return (
    <div>
      <Grid container>
        <ModuleMenuItems />

        {/* Title Bar */}
        <PostTitleBar />

        {/* Post Titles */}
        <PostTitle />
      </Grid>
    </div>
  );
}

export default ClassPosts;
