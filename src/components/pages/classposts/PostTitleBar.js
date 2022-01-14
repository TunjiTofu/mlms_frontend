import { Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getClassDetailsInitiate } from '../../../redux/actions/classActions';
import { getModuleDetailsInitiate, resetSelectedClassModuleInitiate } from "../../../redux/actions/moduleActions";

function PostTitleBar() {
    
    const dispatch = useDispatch();
    const {classId} = useParams();
    const {moduleId} = useParams();
    const {classDetails} = useSelector((state) => state.selectedClassDetails);
    const {selectedClassModuleDetails} = useSelector((state) => state.selectedClassModules);

  useEffect(() => {
    dispatch(getClassDetailsInitiate(classId));

    if(selectedClassModuleDetails && selectedClassModuleDetails !=="")
    dispatch(getModuleDetailsInitiate(moduleId));
    return()=>{
        dispatch(resetSelectedClassModuleInitiate())
    }
  }, []);

    return (
        <Grid
          item
          xs={12}
          sx={{backgroundColor: `${classDetails.color}`, color: "#ffffff", p: "8px"}}
        >
          <Typography variant="subtitle1" gutterBottom>
            <strong>Class:</strong> {classDetails.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <strong>Module:</strong> {selectedClassModuleDetails.moduleName}
          </Typography>
        </Grid>
    )
}

export default PostTitleBar
