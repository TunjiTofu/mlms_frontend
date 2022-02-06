import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5jUA5z_OtbJ2ZNcsw0Z06cDNENz4BUCo",
  authDomain: "mlms-ec62a.firebaseapp.com",
//   databaseURL: "https://adminlte-24bc9-default-rtdb.firebaseio.com",
  projectId: "mlms-ec62a",
  storageBucket: "mlms-ec62a.appspot.com",
  messagingSenderId: "653205121532",
  appId: "1:653205121532:web:c43c92a96ff08ce1302a79",
  measurementId: "G-4X6C2KK1PD"
};
export const config = firebase.initializeApp(firebaseConfig)
export const dataB = firebase.firestore();

dataB.enablePersistence().catch((err) => {
  if (err.code === "failed-precondition") {
    //Probably multiple tabs open
    console.log("Persistence Failed");
  } else if (err.code === "unimplemented") {
    //Lack of Browser Support
    console.log("Persistence not available");
  }
});


export const db = {
  users: dataB.collection("users"),
  classes: dataB.collection("classes"),
  classesMembers: dataB.collection("classesMembers"),
  classModules: dataB.collection("modules"),
  classPosts: dataB.collection("posts"),
  postComments: dataB.collection("comments"),
  classQuizzes: dataB.collection("quizzes"),
  qestOBJ: dataB.collection("questionsObj"),
  qestBQ: dataB.collection("questionsBq"),
  qestTHEORY: dataB.collection("questionsTheory"),
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp(),
};

export const myFirebaseAuthReAuth = firebase.auth;
export const myFirebaseAuth = firebase.auth();

export default firebase;
