import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";

export const SecurityNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/'>
        SecurityNav
      </Link>
    </Fragment>
  );
};

export const SecurityRouter = () => {
  return <Fragment></Fragment>;
};
