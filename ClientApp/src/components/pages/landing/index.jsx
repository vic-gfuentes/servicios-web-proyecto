import React from "react";
import background from "../../assets/img/backgrounds/backgroundPlane.png";
import Hero from "./Hero";

const LandingPage = () => {
  return (
    <div>
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
      <Hero />
    </div>
  );
};

export default LandingPage;
