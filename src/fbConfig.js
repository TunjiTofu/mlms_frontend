import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

var config = {
  apiKey: "AIzaSyB5jUA5z_OtbJ2ZNcsw0Z06cDNENz4BUCo",
  authDomain: "mlms-ec62a.firebaseapp.com",
//   databaseURL: "https://adminlte-24bc9-default-rtdb.firebaseio.com",
  projectId: "mlms-ec62a",
  storageBucket: "mlms-ec62a.appspot.com",
  messagingSenderId: "653205121532",
  appId: "1:653205121532:web:c43c92a96ff08ce1302a79",
  measurementId: "G-4X6C2KK1PD"
};

firebase.initializeApp(config);

export default firebase;
