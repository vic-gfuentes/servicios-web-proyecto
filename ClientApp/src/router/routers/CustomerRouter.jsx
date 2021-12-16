import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { AddReservation, ListReservation } from "../../components/reservations";
import {
  AddPaymentsAccount,
  EditPaymentsAccount,
  ListPaymentsAccount,
} from "../../components/paymentsAccounts";

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
      </NavDropdown>
    </Fragment>
  );
};

export const CustomerRouter = () => {
  return (
    <Fragment>
      <PrivateRoute exact path='/reservations' component={ListReservation} />
      <PrivateRoute
        exact
        path='/reservations/:flightId/new'
        component={AddReservation}
      />

      <PrivateRoute
        exact
        path='/paymentsAccounts'
        component={ListPaymentsAccount}
      />
      <PrivateRoute
        path='/paymentsAccounts/edit/:id'
        component={EditPaymentsAccount}
      />
      <PrivateRoute
        exact
        path='/paymentsAccounts/new'
        component={AddPaymentsAccount}
      />
    </Fragment>
  );
};
