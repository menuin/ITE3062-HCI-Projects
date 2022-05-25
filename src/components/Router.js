import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Auth from "../routes/Auth";
import Main from "../routes/Main";
import Home from "../routes/Home";
import Upload from "../routes/Upload";

const Router = ({ isLoggedIn, userObj }) => {
  return (
    <HashRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route
              name="home"
              exact
              path="/"
              element={<Home userObj={userObj} />}
            />
            <Route
              name="upload"
              exact
              path="/upload"
              element={<Upload userObj={userObj} />}
            />
          </>
        ) : (
          <>
            <Route name="main" exact path="/" element={<Main />} />
            <Route name="auth" exact path="/auth/:type" element={<Auth />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
};

export default Router;
