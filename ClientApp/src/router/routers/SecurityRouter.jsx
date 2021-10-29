import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";
import { AddUser, EditUser, ListUser } from "../../components/users";

export const SecurityNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/users'>
        Usuarios
      </Link>
    </Fragment>
  );
};

export const SecurityRouter = () => {
  return (
    <Fragment>
      <PrivateRoute exact path='/users' component={ListUser} />
      <PrivateRoute path='/users/edit/:id' component={EditUser} />
      <PrivateRoute exact path='/users/new' component={AddUser} />
    </Fragment>
  );
};
