import {Divider, Paper, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {db} from "../../firebase";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

function ClassPosts() {
  const {moduleId} = useParams();
  const postDet = useRef([]);
  const [forceUpdate, setForceUpdate] = useState(Date.now());
  //   const [postDetails, setPostDetails] = useState([]);

  const getPosts = () => {
    console.log("Module Id - " + moduleId);
    db.classPosts
      .orderBy("sortNumber", "asc")
      .where("module", "==", moduleId)
      .where("status", "==", "active")
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        const classPosts = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            classPosts.push({postId: doc.id, ...doc.data()});
          });
          postDet.current = classPosts;
          //   setPostDetails(classPosts)
        } else {
          console.log(" No post found for selected Module");
          //   setModuleLoadingError(true)
          //   setModuleLoading(false)
        }
        // setUsers(classPosts)
        // console.log("Users");
        // console.log(users);
        setForceUpdate()
        console.log("Post Use Ref - ");
        console.log(postDet.current);
        // console.log("Class Post Details Use State - ");
        // console.log(postDetails);
      });
  };

  useEffect(() => {
    getPosts();
  }, [forceUpdate]);
  return (
    <div>
      {moduleId}
      {postDet.current.map((moduleItem) => (
        <Paper
          sx={{
            p: 2,
          }}
        >
          <Typography variant="subtitle1" color="primary" gutterBottom>
            <strong>{moduleItem.postTitle}</strong>
          </Typography>
          <Divider />
          <Typography variant="body1" color="primary" gutterBottom>
            {/* <strong>{moduleItem.postContent}</strong> */}
            {/* {<div dangerouslySetInnerHTML={{__html: moduleItem.postContent}} />} */}
            {/* <div
              dangerouslySetInnerHTML={{
                __html: moduleItem.postContent,
              }}
            ></div> */}
            { ReactHtmlParser(moduleItem.postContent) }
          </Typography>
        </Paper>
      ))}
    </div>
  );
}

export default ClassPosts;
