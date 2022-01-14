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
import React, {useEffect, useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {db} from "../../firebase";
import {useStylesPages} from "../../Styles/PageStyles";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import ModuleMenuBar from "./classmodules/ModuleMenuBar";
import ModuleTitle from "./classmodules/ModuleTitle";
import { useDispatch } from "react-redux";
import { getClassDetailsInitiate } from "../../redux/actions/classActions";

function ClassModules() {
  const {classId} = useParams();
  const modulesDet = useRef([]);
  const classes = useStylesPages();
  const [className, setClassName] = useState("");
  const [classLoading, setClassLoading] = useState(false);
  const [classLoadingInfo, setClassLoadingInfo] = useState(false);
  const [moduleLoading, setModuleLoading] = useState(false);
  const [ModuleLoadingError, setModuleLoadingError] = useState(false);
  const [moduleError, setModuleError] = useState("");
  const [forceUpdate, setForceUpdate] = useState(Date.now());

//   console.log("Class ID", classId);




  // const getClass = () => {
  //   // setClassLoading(true);
  //   setClassLoadingInfo(false);
  //   try {
  //     setTimeout(() => {
  //       db.classes
  //         .doc(classId)
  //         .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
  //           if (qSnapshot.exists) {
  //             setClassLoading(true);
  //             setClassName(qSnapshot.data().name);
  //             //   console.log(qSnapshot.data().name);
  //           } else {
  //             setClassLoadingInfo(true);
  //             setClassLoading(false);
  //             //   console.log("Invalid Class Id!");
  //           }
  //         });
  //       setClassLoading(false);
  //     }, 1000);
  //   } catch (err) {
  //     setModuleError("Error - " + err);
  //     console.log("Error getting Class Name", err);
  //   }
  // };

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
    // getClass();
    getModules();
  }, [forceUpdate]);

  const Item = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: "#f50057",
    textDecoration: "none",
  }));

  return (
    <div>
      <ModuleMenuBar />

      <ModuleTitle/>
    </div>
  );
}

export default ClassModules;
