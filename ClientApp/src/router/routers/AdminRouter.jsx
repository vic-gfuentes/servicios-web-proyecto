import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import {
  AddConsecutive,
  EditConsecutive,
  ListConsecutive,
} from "../../components/consecutives";
import { AddUser, EditUser, ListUser } from "../../components/users";
import {
  AddCountry,
  EditCountry,
  ListCountry,
} from "../../components/countries";

const AdminRouter = () => {
  return (
    <Fragment>
      <PrivateRoute exact path='/consecutives' component={ListConsecutive} />
      <PrivateRoute path='/consecutives/edit/:id' component={EditConsecutive} />
      <PrivateRoute exact path='/consecutives/new' component={AddConsecutive} />

      <PrivateRoute exact path='/users' component={ListUser} />
      <PrivateRoute path='/users/edit/:id' component={EditUser} />
      <PrivateRoute exact path='/users/new' component={AddUser} />

      <PrivateRoute exact path='/countries' component={ListCountry} />
      <PrivateRoute path='/countries/edit/:id' component={EditCountry} />
      <PrivateRoute exact path='/countries/new' component={AddCountry} />
    </Fragment>
  );
};

export default AdminRouter;
