import {
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
import { format } from 'date-fns'

function ClassModules() {
  const {classId} = useParams();
  const [users, setUsers] = useState([]);
  const modulesDet = useRef([]);
  const classes = useStylesPages();
  const [className, setClassName] = useState("");

  const getClass = () => {
    // setGetLoading(true);
    try {
      db.classes
        .doc(classId)
        .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
          if (!qSnapshot.empty) {
            setClassName(qSnapshot.data().name);
            console.log(qSnapshot.data().name);
          } else {
            // setClssInfo("No Module Available for the Selected Class!");
            console.log("Invalid Class Id!");
          }
        });
    } catch (err) {
      //   setError(err)
      console.log("Error getting Class Name", err);
    }
  };

  const getModules = () => {
    // setGetLoading(true);
    try {
      db.classModules
        .orderBy("sortNumber", "asc")
        .where("class", "==", classId)
        .where("status", "==", "active")
        .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
          const classModules = [];
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              classModules.push(doc.data());
            });
            modulesDet.current = classModules;
          } else {
            // setClssInfo("No Module Available for the Selected Class!");
            console.log("No Module Available for the Selected Class!");
          }
          setUsers(classModules);
          console.log(classModules);
          console.log("Users");
          console.log(users);
          console.log("Use Ref - ");
          console.log(modulesDet.current);
          // setGetLoading(false);
        });
    } catch (err) {
      //   setError(err)
      console.log("Error getting modules", err);
    }
  };

  useEffect(() => {
    getClass();
    getModules();
  }, []);

  return (
    <div>
      <Typography variant="subtitle1" color="primary">
        <strong>Select a Module from the Class - {className}</strong>
      </Typography>

      <Grid container spacing={2}>
        {modulesDet.current.map((moduleItem) => (
          <Grid
            key={moduleItem.id}
            item
            xs={12}
            component={Link}
            to={`/dashboard`}
            sx={{textDecoration: "none", color: "inherit"}}
          >
            <Divider />

            <List className={classes.listItem}>
              <ListItem>
                <ListItemText
                  primary={moduleItem.moduleName}
                //   secondary={moduleItem.updatedAt.toDate().toDateString()}
                // secondary= {format(new Date(moduleItem.updatedAt.seconds * 1000 + moduleItem.updatedAt.nanoseconds/1000000),'dd.MM.yyyy')}
                />
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
