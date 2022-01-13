import React, {useState, useEffect} from "react";
import {
  Alert,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import {ExitToAppOutlined} from "@mui/icons-material";
import {useStylesPages} from "../../../Styles/PageStyles";
import {Box} from "@mui/system";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {firestoreConnect} from "react-redux-firebase";

function ClassPrev() {
  const classes = useStylesPages();
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [errorClasses, setErrorClasses] = useState("");
  const [clssInfo, setClssInfo] = useState("");

  // const joinedClasses = useSelector((state) => state.allClasses.classes);
  const {classMemberDetails} = useSelector((state) => state.classMemberLists);

  const joinedClassList = classMemberDetails.map((item, index) => {
    const {docId, name, color, description} = item;
    return (
      <Grid key={docId} item xs={12} sm={6} md={4}>
        <Card
          className={classes.cardMaxHeight}
          sx={{border: `2px solid ${color}`}}
        >
          <CardActionArea component={Link} to={`/modules/${docId}`}>
            {/* <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                  /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" noWrap>
                {name}
              </Typography>
              <Box className={classes.cardContentWidth} component="div">
                <Typography variant="body2" align="justify">
                  {description}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              sx={{
                color: `${color}`,

                backgroundColor: "#f5f3f3",
              }}
              component={Link}
              to={`/modules/${docId}`}
              variant="outlined"
              startIcon={<ExitToAppOutlined />}
            >
              Go to Class
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  });

  //   const {classId, title, code, color, description} = joinedClasses[0];
  //   console.log(joinedClasses);

  return (
    <Grid container spacing={2} className={classes.spacingTop4}>
      <Grid item xs={12}>
        {errorClasses && (
          <Alert severity="warning">
            Error! <strong>{errorClasses}</strong>
          </Alert>
        )}
        {loadingClasses && (
          <Alert severity="info">
            Loading! <strong>Please wait while we load your classes</strong>
          </Alert>
        )}
        {clssInfo && (
          <Alert severity="info">
            Info! <strong>{clssInfo}</strong>
          </Alert>
        )}
      </Grid>

      {joinedClassList}

      {/* Card to Show Classes End */}
    </Grid>
  );
}

export default ClassPrev;
