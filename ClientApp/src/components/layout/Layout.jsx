import React from "react";
import NavMenu from "./NavMenu";

const Layout = (props) => {
  return (
    <div>
      <NavMenu />
      <section>{props.children}</section>
    </div>
  );
};

export default Layout;
