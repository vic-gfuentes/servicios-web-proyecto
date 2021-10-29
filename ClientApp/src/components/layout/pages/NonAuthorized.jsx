import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const NonAuthorized = () => {
  const history = useHistory();

  const onLoginClick = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const onRegisterClick = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  return (
    <Container className='d-flex flex-column justify-content-around py-5'>
      <div className='d-flex justify-content-center align-items-center mb-3'>
        <Card>
          <Card.Body>
            <div>
              <h3 className='text-center font-weight-bold text-primary'>
                Ooops!
              </h3>
              <p className='text-center'>
                Parece que la ruta especificada no esta disponible para ti aun.
                <br />
                <span className='text-info'>
                  Inicia Sesion o Registrate para poder acceder a la aplicacion!
                </span>
              </p>
              <h5 className='text-center font-weight-bold text-primary'>
                Es gratis!
              </h5>
              <div className='d-flex justify-content-center align-items-center'>
                <Button
                  variant='success'
                  type='submit'
                  size='sm'
                  onClick={onLoginClick}
                >
                  Ingresar
                </Button>
                <Button
                  className='mx-3'
                  variant='info'
                  type='submit'
                  size='sm'
                  onClick={onRegisterClick}
                >
                  Registrarme
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default NonAuthorized;
