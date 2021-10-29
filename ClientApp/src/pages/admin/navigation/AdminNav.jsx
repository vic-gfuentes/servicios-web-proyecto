import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
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
    </Fragment>
  );
};

export default AdminNav;
