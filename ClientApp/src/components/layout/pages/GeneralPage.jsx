import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import Logo from "../../assets/Logo";

const AdminPage = () => {
  return (
    <div
      className='m-0 p-0'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "85vh",
      }}
    >
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className='mt-5 p-3 font-weight-bold'>
                  <h1>Bienvenido de vuelta</h1>
                  <br />
                  <p className='font-weight-normal'>
                    Para iniciar con el control de las operaciones del sitio web
                    puede utilizar las opciones de la barra de navegación.
                  </p>
                </div>
              </div>
            </Col>
            <Col>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Logo width={300} height={300} />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AdminPage;
