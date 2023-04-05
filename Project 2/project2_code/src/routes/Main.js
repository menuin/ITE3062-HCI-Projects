import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      Login Page
      
      <Link to="auth/signup">Sign Up</Link>
      <Link to="/auth/login">Login</Link>
    </>
  );
};

export default Main;
