import {Grid, Stack, List, ListItem, ListItemText} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import React from "react";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";

function ModuleMenuItems() {
  const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#f50057",
    textDecoration: "none",
  }));

  const {classId} = useParams();


  return (
    <Grid item xs={12} sx={{ mb:2 }}>
      <Stack direction="row" spacing={2}>
        <Item component={Link} to={`/modules/${classId}`}>
          Class Modules
        </Item>
        <Item component={Link} to={"dfgdfg"}>
          Assignments
        </Item>
        <Item component={Link} to={"fdgfd"}>
          Upcoming Events
        </Item>
      </Stack>
    </Grid>
  );
}

export default ModuleMenuItems;
