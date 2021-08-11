import React from "react";
import { Redirect, Route } from "react-router";

const PublicRoute = ({ children, ...routeprops }) => {
  const profile = true;

  if (profile === false) {
    //
    return <Redirect to="/signin" />;
  }

  return <Route {...routeprops}>{children}</Route>;
};

export default PublicRoute;
