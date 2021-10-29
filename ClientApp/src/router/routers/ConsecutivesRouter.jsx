import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";
import {
  AddConsecutive,
  EditConsecutive,
  ListConsecutive,
} from "../../components/consecutives";

export const ConsecutiveNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/consecutives'>
        Consecutivos
      </Link>
    </Fragment>
  );
};

export const ConsecutivesRouter = () => {
  return (
    <Fragment>
      <PrivateRoute exact path='/consecutives' component={ListConsecutive} />
      <PrivateRoute path='/consecutives/edit/:id' component={EditConsecutive} />
      <PrivateRoute exact path='/consecutives/new' component={AddConsecutive} />
    </Fragment>
  );
};
