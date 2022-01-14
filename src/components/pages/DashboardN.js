import {Divider, Grid, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useStylesPages} from "../../Styles/PageStyles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import {useTheme} from "@emotion/react";
import {useDispatch, useSelector} from "react-redux";
import ClassPrev from "./studentclass/ClassPrev";
import JoinClassForm from "./studentclass/JoinClassForm";
import {getClassMembersListInitiate} from "../../redux/actions/classMembersActions";
import { resetSelectedClassInitiate } from "../../redux/actions/classActions";

function DashboardN() {
  const classes = useStylesPages();
  const {currentUser, idToken} = useAuth();
  // const [clssInfo, setClssInfo] = useState("");
  // const [loadingClasses, setLoadingClasses] = useState(false);

 

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Grid>
            <Typography variant="subtitle1">
              Welcome <strong>{currentUser.displayName}</strong>
            </Typography>
          </Grid>
          <Divider />

          {/* Join Class Form */}
          <JoinClassForm />

          {/* Class Listing */}
          <ClassPrev />
          
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary">
              Upcoming Activities
            </Typography>
            <Divider />
            <Typography variant="subtitle1">
              One <br />
              Two <br />
              Three
            </Typography>
          </Grid>

          <Grid item xs={12} className={classes.spacingTop4}>
            <Typography variant="subtitle1" color="primary">
              News
            </Typography>
            <Divider />
            <Typography variant="subtitle1">
              One <br />
              Two <br />
              Three
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default DashboardN;
