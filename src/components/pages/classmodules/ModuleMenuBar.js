import React, { useEffect, useState } from 'react'
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import {
    Alert,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography,
  } from "@mui/material";
  import {Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getClassDetailsInitiate } from '../../../redux/actions/classActions';

function ModuleMenuBar() {
    const [className, setClassName] = useState("");
    const [classLoading, setClassLoading] = useState(false);
    const [classLoadingInfo, setClassLoadingInfo] = useState(false);
    const [moduleLoading, setModuleLoading] = useState(false);
    const [ModuleLoadingError, setModuleLoadingError] = useState(false);
    const [moduleError, setModuleError] = useState("");
    const {classId} = useParams();
  
    const Item = styled(Paper)(({theme}) => ({
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: "center",
      color: "#f50057",
      textDecoration: "none",
    }));

    const dispatch = useDispatch();
    const {classDetails} = useSelector((state) => state.selectedClassDetails);

  useEffect(() => {
    // console.log("Class Name ", classDetails.name );
    dispatch(getClassDetailsInitiate(classId));
  }, []);
  
    return (
      <div>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            <Item component={Link} to={"#"}>
              Class Modules
            </Item>
            <Item component={Link} to={"#"}>
              Assignments
            </Item>
            <Item component={Link} to={"#"}>
              Upcoming Events
            </Item>
          </Stack>
        </Grid>
  
        <Grid item xs={12}>
          {classLoadingInfo ? (
            <Alert severity="error">
              Error! <strong>Invalid Class Selected!</strong>
            </Alert>
          ) : null}
          {moduleError && (
            <Alert severity="error">
              Error! <strong>{moduleError}</strong>
            </Alert>
          )}
          {moduleLoading ? (
            <Alert severity="info">
              Loading! <strong>Loading Modules for Selected Class!</strong>
            </Alert>
          ) : null}
          {ModuleLoadingError ? (
            <Alert severity="error">
              Error! <strong>No Module Available for the Selected Class!</strong>
            </Alert>
          ) : null}
          <Typography variant="subtitle1" color="primary" gutterBottom>
            <strong>
              {/* {classLoading
                ? `Select a Module from the Class - ${classDetails.name}`
                : null} */}
                Select a Module from the Class - {classDetails.name}
            </strong>
          </Typography>
        </Grid>
  
        <Grid
          item
          xs={12}
          //   component={Link}
          //   to={`/posts`}
          sx={{textDecoration: "none", color: "inherit"}}
        >
          <Divider />
          <List>
            <ListItem>
              {ModuleLoadingError ? null : (
                <ListItemText
                  primary={`View all Class Post for ${classDetails.name}`}
                  secondary="This will display all post in the order which they were posted"
                />
              )}
            </ListItem>
          </List>
          <Divider />
        </Grid>
      </div>
    );
}

export default ModuleMenuBar
