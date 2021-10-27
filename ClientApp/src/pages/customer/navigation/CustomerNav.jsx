import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const CustomerNav = () => {
  return (
    <Fragment>
      <Link className='nav-link' to='/'>
        CustomerNav
      </Link>
    </Fragment>
  );
};

export default CustomerNav;
