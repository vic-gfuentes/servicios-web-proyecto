import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";

export const MaintenanceNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/'>
        MaintenanceNav
      </Link>
    </Fragment>
  );
};

export const MaintenanceRouter = () => {
  return <Fragment></Fragment>;
};
