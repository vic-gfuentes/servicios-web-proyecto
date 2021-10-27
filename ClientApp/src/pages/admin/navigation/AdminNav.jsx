import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/'>
        AdminNav
      </Link>
    </Fragment>
  );
};

export default AdminNav;
