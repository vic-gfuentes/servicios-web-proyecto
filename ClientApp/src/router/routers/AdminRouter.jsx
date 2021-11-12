import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";
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
import {
  AddAirline,
  EditAirline,
  ListAirline,
} from "../../components/airlines";

export const AdminNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/users'>
        Usuarios
      </Link>
      <Link className='nav-link' to='/consecutives'>
        Consecutivos
      </Link>
      <Link className='nav-link' to='/countries'>
        Paises
      </Link>
      <Link className='nav-link' to='/airlines'>
        Aereolineas
      </Link>
    </Fragment>
  );
};

export const AdminRouter = () => {
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

      <PrivateRoute exact path='/airlines' component={ListAirline} />
      <PrivateRoute path='/airlines/edit/:id' component={EditAirline} />
      <PrivateRoute exact path='/airlines/new' component={AddAirline} />
    </Fragment>
  );
};
