import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";
import {
  AddConsecutive,
  EditConsecutive,
  ListConsecutive,
} from "../../components/consecutives";
import {
  AddCountry,
  EditCountry,
  ListCountry,
} from "../../components/countries";

export const MaintenanceNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/consecutives'>
        Consecutivos
      </Link>
      <Link className='nav-link' to='/countries'>
        Paises
      </Link>
    </Fragment>
  );
};

export const MaintenanceRouter = () => {
  return (
    <Fragment>
      <PrivateRoute exact path='/consecutives' component={ListConsecutive} />
      <PrivateRoute path='/consecutives/edit/:id' component={EditConsecutive} />
      <PrivateRoute exact path='/consecutives/new' component={AddConsecutive} />

      <PrivateRoute exact path='/countries' component={ListCountry} />
      <PrivateRoute path='/countries/edit/:id' component={EditCountry} />
      <PrivateRoute exact path='/countries/new' component={AddCountry} />
    </Fragment>
  );
};
