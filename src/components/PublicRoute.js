import React from "react";
import { Redirect, Route } from "react-router";
import { Container, Loader } from "rsuite";
import { useProfile } from "../context/profile.context";

const PublicRoute = ({ children, ...routeprops }) => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center verticl size="md" content="Loading" speed="slow" />
      </Container> 
    );
  }

  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }

  return <Route {...routeprops}>{children}</Route>;
};

export default PublicRoute;
