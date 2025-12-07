import React from "react";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { googleLoginFun } = useAuth();

  const handleGoogle = () => {
    googleLoginFun()
      .then(() => {
        alert("login successful");
      })
      .catch((er) => {
        console.log(er);
      });
  };
  return (
    <div>
      <h1>login page </h1>
      <button onClick={handleGoogle} className="btn btn-primary">
        google Login
      </button>
    </div>
  );
};

export default Login;
