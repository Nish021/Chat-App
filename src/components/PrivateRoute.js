import React from "react";
import { Redirect, Route } from "react-router";
import { Container, Loader } from "rsuite";
import { useProfile } from "../context/profile.context";

const PrivateRoute = ({ children, ...routeprops }) => {
  const { isLoading, profile } = useProfile();

  //if our data is  loading and still we donot have any profile yet
  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" content="Loading" speed="slow" />
      </Container>
    );
  }

  // if our data is not loading and we donot have profile
  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeprops}>{children}</Route>;
};

export default PrivateRoute;
