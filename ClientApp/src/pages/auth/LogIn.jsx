import React, { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import { useHistory } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const LogIn = () => {
  const history = useHistory();

  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = user;

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const logInUser = async () => {
    try {
      const respose = await fetch("api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
      const data = await respose.json();
      setCurrentUser(data);

      history.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logInUser();
  };

  return (
    <div>
      <Container className='d-flex flex-column justify-content-around py-5'>
        <div className='d-flex justify-content-center align-items-center mb-3'>
          <Card>
            <Card.Body>
              <div>
                <h3 className='text-center font-weight-bold text-primary'>
                  Sign In
                </h3>
                <p className='text-center'>
                  Hola de nuevo! Ingresa a tu cuenta para continuar.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='email'
                      value={login.email}
                      onChange={handleOnChange}
                      placeholder='johndoe@example.com'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                      Contraseña
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      name='password'
                      value={login.password}
                      onChange={handleOnChange}
                      autoComplete='true'
                    />
                  </div>
                  <div className='d-flex justify-content-center align-items-center'>
                    <Button variant='primary' type='submit'>
                      Ingresar
                    </Button>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default LogIn;
