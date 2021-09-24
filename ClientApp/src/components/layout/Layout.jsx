import React from "react";
import background from "../assets/img/backgrounds/backgroundPlane.png";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div>
      <NavMenu />
      <main>
        <div
          className="position-absolute h-100 w-100"
          style={{
            zIndex: "-1",
            backgroundImage: `url(${background})`,
            opacity: "70%",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
