import React, { useContext, useEffect, useState } from "react";
import { myFirebaseAuth } from "../firebase"

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
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
    return  myFirebaseAuth.currentUser.updateEmail(newEmail)
    // return myFirebaseAuth.currentUser.updateProfile({
    //   email: newEmail,
    // });
  }

  function getUid() {
    return myFirebaseAuth.currentUser.uid;
  }

  function getUserIdToken() {
    return myFirebaseAuth.currentUser.getIdToken();
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
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscriber;
  }, []);

  const val = {
    currentUser,
    login,
    signUp,
    updatePassword,
    logout,
    updateProfileDisplayName,
    updateUserEmail,
    getUid,
    getUserIdToken,
  };

  return (
    <AuthContext.Provider value={val}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
