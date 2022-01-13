import {Divider, Grid, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import {useStylesPages} from "../../Styles/PageStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@emotion/react";
import {useDispatch, useSelector} from "react-redux";
import ClassPrev from "./studentclass/ClassPrev";
import JoinClassForm from "./studentclass/JoinClassForm";
import {db} from "../../firebase";
import {fetchClasses, setClasses} from "../../redux/actions/classActions";
import {getClassMembersListInitiate} from "../../redux/actions/classMembersActions";

function DashboardN() {
  const classes = useStylesPages();
  const {currentUser, idToken} = useAuth();
  const [clssInfo, setClssInfo] = useState("");
  const [loadingClasses, setLoadingClasses] = useState(false);

  // const joinedClasses = useSelector((state) => state.allClasses.classes);
  //   const currentUsern = useSelector((state) => state.currUser.usern.email);
  //   console.log(currentUsern);

  const dispatch = useDispatch();
  const items = [];

  //   const fetchStudentClasses = () => {
  //     db.classesMembers
  //       .where("userId", "==", currentUser.uid)
  //       .get()
  //       .then((snapshot) => {
  //         if (!snapshot.empty) {
  //           snapshot.forEach((doc) => {
  //             const docId = doc.data().classId;
  //             db.classes
  //               .doc(docId)
  //               .get()
  //               .then((document) => {
  //                 items.push({docId, ...document.data()});
  //                 console.log("Snapp Doc Itemssssss", items);
  //                 dispatch(setClasses(items));
  //               });
  //           });
  //         } else {
  //           setClssInfo("You have not joined any class!");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Err", err);
  //       });
  //   };

  useEffect(() => {
    // fetchStudentClasses();
    // dispatch(fetchClasses);
    // console.log("User Id", currentUser.uid);
    setLoadingClasses(true);
    dispatch(getClassMembersListInitiate(currentUser.uid));
    setLoadingClasses(false);
  }, []);

  //   console.log("Classes: ", joinedClasses);

  //   const getClasses = () => {
  //     // console.log("Current User - " + currentUser.uid);
  //     setLoadingClasses(true);
  //     setClssInfo("");
  //     setTimeout(() => {
  //       setErrorClasses("");

  //       db.classesMembers
  //         .where("userId", "==", currentUser.uid)
  //         .get()
  //         .then((snapshot) => {
  //           if (!snapshot.empty) {
  //             snapshot.forEach((doc) => {
  //               // console.log(doc.data().classId);

  //               const docId = doc.data().classId;
  //               db.classes
  //                 .doc(docId)
  //                 .get()
  //                 .then((document) => {
  //                   items.push({docId, ...document.data()});
  //                 });

  //               // db.classes
  //               //   .doc(docId)
  //               //   .onSnapshot({includeMetadataChanges: false}, (document) => {
  //               //     items.push({docId, ...document.data()});
  //               //     setClassDetails([...items]);
  //               //   });
  //             });
  //             // setForceUpdate();
  //             // classDetailRef.current = items;
  //             // console.log(classDetailRef.current);
  //           } else {
  //             setClssInfo("You have not joined any class!");
  //           }
  //         });
  //       setLoadingClasses(false);
  //     }, 2000);
  //   };

  //   useEffect(() => {
  //     getClasses();
  //   }, []);

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
