import React, { Fragment } from "react";
import tickets from "../../assets/img/ilustrations/tickets.png";
import { Container } from "react-bootstrap";

const Hero = () => {
  return (
    <Fragment>
      <Container className="d-flex flex-column justify-content-around py-5">
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="col-sm-8 text-center">
            <h3 className="display-5 font-weight-bold">
              "El mundo es un libro y aquellos que no viajan leen sólo una
              página"
            </h3>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="col-sm-8 text-center">
            <h5 className="font-weight-normal">-Agustín de Hipona</h5>
          </div>
        </div>
      </Container>

      <Container className="py-5 bg-secondary">
        <div className="row h-100 justify-content-between align-items-center">
          <div className="col-lg-5 h-50">
            <div className="d-flex flex-column h-100 justify-content-between text-center text-lg-left">
              <h1 className="font-weight-bold">Preparate para tu viaje</h1>
              <h5 className="mt-2">Lleva el PURA VIDA a todas partes del mundo!</h5>
              <h5 className="text-muted font-weight-normal mt-2">
                Revisa todos los requisitos exigidos para tu viaje, sigue las
                recomendaciones y conoce nuestras políticas de flexibilidad.
              </h5>
              <div className="mt-4">
                <button className="btn btn btn-primary">
                  Buscar vuelos
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-5 mt-3 mt-lg-0">
            <img src={tickets} class="h-100 w-100" alt="tickets" />
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Hero;
