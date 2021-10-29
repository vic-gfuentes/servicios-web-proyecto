import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";

export const ConsecutiveNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/'>
        ConsecutiveNav
      </Link>
    </Fragment>
  );
};

export const ConsecutivesRouter = () => {
  return <Fragment></Fragment>;
};
