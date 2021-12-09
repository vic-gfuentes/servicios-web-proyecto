import React, { Fragment } from "react";
import PrivateRoute from "../PrivateRoute";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
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
import {
  AddFlight,
  EditFlight,
  ListFlight,
} from "../../components/flights";
import {
  AddPort,
  EditPort,
  ListPort,
} from "../../components/ports";
import { ListBinnacle } from "../../components/binnacles";
import { ListError } from "../../components/errors";

export const MaintenanceNav = () => {
  return (
    <Fragment>
      <NavDropdown title="Mantenimiento">
        <Link className='dropdown-item' to='/countries'>
          Paises
        </Link>
        <Link className='dropdown-item' to='/airlines'>
          Aereolineas
        </Link>
        <Link className='dropdown-item' to='/flights'>
          Vuelos
        </Link>
        <Link className='dropdown-item' to='/ports'>
          Puertos
        </Link>
        <Link className='dropdown-item' to='/binnacles'>
          Bitacoras
        </Link>
        <Link className='dropdown-item' to='/errors'>
          Errores
        </Link>
      </NavDropdown>
    </Fragment>
  );
};

export const MaintenanceRouter = () => {
  return (
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

      <PrivateRoute exact path='/ports' component={ListPort} />
      <PrivateRoute path='/ports/edit/:id' component={EditPort} />
      <PrivateRoute exact path='/ports/new' component={AddPort} />

      <PrivateRoute exact path='/binnacles' component={ListBinnacle} />
      <PrivateRoute exact path='/errors' component={ListError} />
    </Fragment>
  );
};
