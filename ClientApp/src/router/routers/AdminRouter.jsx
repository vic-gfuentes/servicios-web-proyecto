import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
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
import { ListBinnacle } from "../../components/binnacles";
import { AddFlight, EditFlight, ListFlight } from "../../components/flights";
import {
  AddReservation,
  EditReservation,
  ListReservation,
} from "../../components/reservations";
import { AddPort, EditPort, ListPort } from "../../components/ports";

export const AdminNav = () => {
  return (
    <Fragment>
      <NavDropdown title='Administrador'>
        <Link className='dropdown-item' to='/users'>
          Usuarios
        </Link>
        <Link className='dropdown-item' to='/consecutives'>
          Consecutivos
        </Link>
        <Link className='dropdown-item' to='/reservations'>
          Reservaciones
        </Link>
      </NavDropdown>

      <NavDropdown title='Mantenimiento'>
        <Link className='dropdown-item' to='/countries'>
          Paises
        </Link>
        <Link className='dropdown-item' to='/airlines'>
          Aereolineas
        </Link>
        <Link className='dropdown-item' to='/binnacles'>
          Bitacoras
        </Link>
        <Link className='dropdown-item' to='/flights'>
          Vuelos
        </Link>
        <Link className='dropdown-item' to='/ports'>
          Puertos
        </Link>
      </NavDropdown>
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

      <PrivateRoute exact path='/binnacles' component={ListBinnacle} />

      <PrivateRoute exact path='/flights' component={ListFlight} />
      <PrivateRoute path='/flights/edit/:id' component={EditFlight} />
      <PrivateRoute exact path='/flights/new' component={AddFlight} />

      <PrivateRoute exact path='/reservations' component={ListReservation} />
      <PrivateRoute path='/reservations/edit/:id' component={EditReservation} />
      <PrivateRoute exact path='/reservations/new' component={AddReservation} />

      <PrivateRoute exact path='/ports' component={ListPort} />
      <PrivateRoute path='/ports/edit/:id' component={EditPort} />
      <PrivateRoute exact path='/ports/new' component={AddPort} />
    </Fragment>
  );
};
