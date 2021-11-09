import {
  Alert,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {db} from "../../firebase";
import {useStylesPages} from "../../Styles/PageStyles";
import {format} from "date-fns";

function ClassModules() {
  const {classId} = useParams();
  const [users, setUsers] = useState([]);
  const modulesDet = useRef([]);
  const classes = useStylesPages();
  const [className, setClassName] = useState("");
  const [classLoading, setClassLoading] = useState(false);
  const [classLoadingInfo, setClassLoadingInfo] = useState(false);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [ModuleLoadingError, setModuleLoadingError] = useState(false);
  const [moduleError, setModuleError] = useState("");
  const [forceUpdate, setForceUpdate] = useState(Date.now());

  const getClass = () => {
    // setClassLoading(true);
    setClassLoadingInfo(false);
    try {
      setTimeout(() => {
        db.classes
          .doc(classId)
          .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
            if (qSnapshot.exists) {
              setClassLoading(true);
              setClassName(qSnapshot.data().name);
              //   console.log(qSnapshot.data().name);
            } else {
              setClassLoadingInfo(true);
              setClassLoading(false);
              //   console.log("Invalid Class Id!");
            }
          });
        setClassLoading(false);
      }, 1000);
    } catch (err) {
      setModuleError("Error - " + err);
      console.log("Error getting Class Name", err);
    }
  };

  const getModules = () => {
    setModuleLoading(true);
    setModuleLoadingError(false);
    // setGetLoading(true);
    try {
      setTimeout(() => {
        db.classModules
          .orderBy("sortNumber", "asc")
          .where("class", "==", classId)
          .where("status", "==", "active")
          .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
            const classModules = [];
            if (!querySnapshot.empty) {
              querySnapshot.forEach((doc) => {
                classModules.push({moduleId: doc.id, ...doc.data()});
              });
              modulesDet.current = classModules;
            } else {
              setModuleLoadingError(true);
              setModuleLoading(false);
            }
            // setUsers(classModules)
            // console.log("Users");
            // console.log(users);
              setForceUpdate();
            // console.log("Use Ref - ");
            // console.log(modulesDet.current);
          });
        setModuleLoading(false);
      }, 3000);
    } catch (err) {
      setModuleError("Error - " + err);
      console.log("Error getting modules", err);
    }
  };

  useEffect(() => {
    getClass();
    getModules();
  }, [forceUpdate]);

  return (
    <div>
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
          {classLoading
            ? `Select a Module from the Class - ${className}`
            : null}
        </strong>
      </Typography>

      <Grid container spacing={2}>
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
                  primary={`View all Class Post for ${className}`}
                  secondary="This will display all post in the order which they were posted"
                />
              )}
            </ListItem>
          </List>
          <Divider />
        </Grid>
        {modulesDet.current.map((moduleItem) => (
          <Grid
            key={moduleItem.id}
            item
            xs={12}
            component={Link}
            to={`/posts/${moduleItem.moduleId}`}
            sx={{textDecoration: "none", color: "inherit"}}
          >
            <Divider />

            <List className={classes.listItem}>
              <ListItem>
                {moduleItem.updatedAt ? (
                  <ListItemText
                    primary={moduleItem.moduleName}
                    // secondary= {`Last Updated: ${format(new Date(moduleItem.updatedAt.toDate()), 'E,dd/MMM/yyyy - h:m a')}`}
                  />
                ) : (
                  <ListItemText
                    primary={moduleItem.moduleName}
                    // secondary= {`Created On: ${format(new Date(moduleItem.createdAt.toDate()), 'E,dd/MMM/yyyy - h:m a')}`}
                  />
                )}
              </ListItem>
            </List>
            <Divider />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ClassModules;
