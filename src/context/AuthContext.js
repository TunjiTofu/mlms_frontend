import React, {useContext, useEffect, useState} from "react";
import {myFirebaseAuth} from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState();
  const [idToken, setIdToken] = useState('');
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return myFirebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return myFirebaseAuth.signInWithEmailAndPassword(email, password);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateProfileDisplayName(newDisplayName) {
    return myFirebaseAuth.currentUser.updateProfile({
      displayName: newDisplayName,
    });
  }

  function updateUserEmail(newEmail) {
    return myFirebaseAuth.currentUser.updateEmail(newEmail);
    // return myFirebaseAuth.currentUser.updateProfile({
    //   email: newEmail,
    // });
  }

  function getUid() {
    return myFirebaseAuth.currentUser.uid;
  }

  function getUserIdToken() {
    myFirebaseAuth.currentUser
      .getIdToken()
      .then(function (idToken) {
        return idToken;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function getUserIdTokenResult() {
    myFirebaseAuth.currentUser
      .getIdTokenResult()
      .then((idTokenResult) => {
        return idTokenResult.claims.role;
        // if (idTokenResult.claims.role === "TEA") {
        //   console.log("Msgg - " + idTokenResult.claims.role);
        //   return true;
        // } else {
        //   return false;
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function logout() {
    return myFirebaseAuth.signOut();
  }

  // function reauthenticate(email, currentPword) {
  //   const cred = myFirebaseAuth.AuthProvider.credential(email, currentPword)
  //   return currentUser.reauthenticateAndRetrieveDataWithCredential(cred)
  // }

  useEffect(() => {
    const unsubscriber = myFirebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((idToken) => {
          setIdToken(idToken);
          return idToken;
        });
      }
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscriber;
  }, []);

  const val = {
    currentUser,
    idToken,
    login,
    signUp,
    updatePassword,
    logout,
    updateProfileDisplayName,
    updateUserEmail,
    getUid,
    getUserIdToken,
    getUserIdTokenResult,
  };

  return (
    <AuthContext.Provider value={val}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
