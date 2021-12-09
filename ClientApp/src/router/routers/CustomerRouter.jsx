import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import {
  AddReservation,
  EditReservation,
  ListReservation,
} from "../../components/reservations";
import {
  AddPaymentsAccount,
  EditPaymentsAccount,
  ListPaymentsAccount,
} from "../../components/paymentsAccounts";
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
import { AddFlight, EditFlight, ListFlight } from "../../components/flights";

export const CustomerNav = () => {
  return (
    <Fragment>
      <NavDropdown title='Opciones'>
        <Link className='dropdown-item' to='/reservations'>
          Reservaciones
        </Link>
        <Link className='dropdown-item' to='/paymentsAccounts'>
          Métodos de pago
        </Link>
        <Link className='dropdown-item' to='/countries'>
          Paises
        </Link>
        <Link className='dropdown-item' to='/airlines'>
          Aereolineas
        </Link>
        <Link className='dropdown-item' to='/flights'>
          Vuelos
        </Link>
      </NavDropdown>
    </Fragment>
  );
};

export const CustomerRouter = () => {
  return(
  <Fragment>
    <PrivateRoute exact path='/countries' component={ListCountry} />
    <PrivateRoute path='/countries/edit/:id' component={EditCountry} />
    <PrivateRoute exact path='/countries/new' component={AddCountry} />

    <PrivateRoute exact path='/airlines' component={ListAirline} />
    <PrivateRoute path='/airlines/edit/:id' component={EditAirline} />
    <PrivateRoute exact path='/airlines/new' component={AddAirline} />

    <PrivateRoute exact path='/flights' component={ListFlight} />
    <PrivateRoute path='/flights/edit/:id' component={EditFlight} />
    <PrivateRoute exact path='/flights/new' component={AddFlight} />

    <PrivateRoute exact path='/reservations' component={ListReservation} />
    <PrivateRoute path='/reservations/edit/:id' component={EditReservation} />
    <PrivateRoute exact path='/reservations/new' component={AddReservation} />

    <PrivateRoute exact path='/paymentsAccounts' component={ListPaymentsAccount} />
    <PrivateRoute path='/paymentsAccounts/edit/:id' component={EditPaymentsAccount} />
    <PrivateRoute exact path='/paymentsAccounts/new' component={AddPaymentsAccount} />
  </Fragment>
  );
};
