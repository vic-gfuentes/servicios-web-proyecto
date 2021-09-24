import React, { Fragment } from "react";
import { Route, Switch } from "react-router";

import Landing from "../pages/landing";
import LogIn from "../pages/auth/LogIn";
import Register from "../pages/auth/Register";

const Routes = () => {
  return (
    <Fragment>
      <Route exact path="/" component={Landing} />
      <Switch>
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
