import React from "react";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div>
      <NavMenu />
      <main>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
