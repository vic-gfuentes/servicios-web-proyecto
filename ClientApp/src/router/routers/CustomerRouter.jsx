import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";

export const CustomerNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/'>
        CustomerNav
      </Link>
    </Fragment>
  );
};

export const CustomerRouter = () => {
  return <Fragment></Fragment>;
};
