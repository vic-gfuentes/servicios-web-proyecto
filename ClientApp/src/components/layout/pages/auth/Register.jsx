import React, { useState, useContext } from "react";
import AppContext from "../../../../context/AppContext";
import { useHistory } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

const Register = () => {
  const history = useHistory();
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = user;

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: 5,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const registerUser = async () => {
    try {
      const respose = await fetch("api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });
      const data = await respose.json();
      setCurrentUser(data);
      localStorage.setItem("loggedUser", JSON.stringify(data));
      history.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div>
      <Container className='d-flex flex-column justify-content-around py-5'>
        <div className='d-flex justify-content-center align-items-center mb-3'>
          <Card>
            <Card.Body>
              <div>
                <h3 className='text-center font-weight-bold text-primary'>
                  Registro
                </h3>
                <p className='text-center'>
                  Un gusto conocerte! Ingresa los datos de tu cuenta para
                  continuar.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Nombre
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='name'
                      value={register.name}
                      onChange={handleOnChange}
                      placeholder='John Doe'
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                      Email
                    </label>
                    <input
                      type='text'
                      className='form-control'
                      name='email'
                      value={register.email}
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
                      value={register.password}
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

export default Register;
