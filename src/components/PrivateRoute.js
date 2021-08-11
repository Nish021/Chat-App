import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, ...routeprops }) => {
  const profile = true;

  if (profile === false) {
    //
    return <Redirect to="/signin" />;
  }

  return <Route {...routeprops}>{children}</Route>;
};

export default PrivateRoute;
