import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { format } from "date-fns";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useParams} from "react-router-dom";
import { getClassModulesInitiate, resetSelectedClassModuleInitiate } from "../../../redux/actions/moduleActions";
import {useStylesPages} from "../../../Styles/PageStyles";

function ModuleTitle() {
  const {classId} = useParams();
  // const modulesDet = useRef([]);
  const classes = useStylesPages();

  const dispatch = useDispatch();
  const {allModules} = useSelector((state) => state.selectedClassModules);

  useEffect(() => {
    // console.log("Allll Modulesss ", allModules );
    if(allModules && allModules !=="")
    dispatch(getClassModulesInitiate(classId));
    return()=>{
        dispatch(resetSelectedClassModuleInitiate())
    } 
  }, [classId]);


  return (
    <Grid container spacing={2}>
      {allModules && allModules.map((quizItem, index) => (
        <Grid
          key={index}
          item
          xs={12}
          component={Link}
          to={`/posts/${classId}/${quizItem.moduleId}`}
          sx={{textDecoration: "none", color: "inherit"}}
        >
          <Divider />

          <List className={classes.listItem}>
            <ListItem>
              {quizItem.updatedAt ? (
                <ListItemText
                  primary={quizItem.title}
                  secondary= {`Last Updated: ${format(new Date(quizItem.updatedAt.toDate()), 'E,dd/MMM/yyyy - h:m a')}`}
                 
                />
              ) : (
                <ListItemText
                  primary={quizItem.moduleName}
                  secondary= {`Created On: ${format(new Date(quizItem.createdAt.toDate()), 'E,dd/MMM/yyyy - h:m a')}`}
                />
              )}
            </ListItem>
          </List>
          <Divider />
        </Grid>
      ))}
    </Grid>
  );
}

export default ModuleTitle;
