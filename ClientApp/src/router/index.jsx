import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

import Landing from "../pages/landing";
import LogIn from "../pages/auth/LogIn";
import Register from "../pages/auth/Register";
import Dashboard from "../components/layout/Dashboard";

const Routes = () => {
  return (
    <Fragment>
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
