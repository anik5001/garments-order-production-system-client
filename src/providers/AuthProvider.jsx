import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase.config";

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState("Anik");

  // google signin signUp
  const googleLoginFun = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const authInfo = {
    googleLoginFun,
    user,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
