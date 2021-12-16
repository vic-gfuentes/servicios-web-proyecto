import React, { Fragment, useContext, useEffect } from "react";
import { Route, Switch } from "react-router";
import AppContext from "../context/AppContext";
import Landing from "../components/layout/pages/landing";
import LogIn from "../components/layout/pages/auth/LogIn";
import Register from "../components/layout/pages/auth/Register";
import Dashboard from "../components/layout/Dashboard";
import Payment from "../components/layout/Payment";
import Profile from "../components/layout/pages/profile";
import {
  AdminRouter,
  MaintenanceRouter,
  SecurityRouter,
  ConsecutivesRouter,
  CustomerRouter,
} from "./routers";

const Routes = () => {
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = user;

  useEffect(() => {
    if (localStorage.loggedUser) {
      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      setCurrentUser(loggedUser);
    }
  }, []);

  const addRoutesBasedOnRole = () => {
    switch (currentUser.role) {
      case 1:
        return <AdminRouter />;
      case 2:
        return <MaintenanceRouter />;
      case 3:
        return <SecurityRouter />;
      case 4:
        return <ConsecutivesRouter />;
      case 5:
        return <CustomerRouter />;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Route exact path='/' component={Landing} />
      <Route path='/login' component={LogIn} />
      <Route path='/register' component={Register} />
      <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/payment' component={Payment} />
        <Route exact path='/profile' component={Profile} />
        {addRoutesBasedOnRole()}
      </Switch>
    </Fragment>
  );
};

export default Routes;
