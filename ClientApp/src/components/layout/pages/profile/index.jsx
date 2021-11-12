import React, { useEffect, useContext, useState } from "react";
import AppContext from "../../../../context/AppContext";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Profile() {
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = user;
  const history = useHistory();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setProfile({
      ...profile,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/users/${currentUser.userId}`, {
      method: "PUT",
      body: JSON.stringify(profile),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("SUCCESS", response);
        history.push("/profile");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/dashboard");
  };

  useEffect(() => {
    fetch(`/api/users/${currentUser.userId}`)
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, []);

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Perfil:</h1>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre'
              name='name'
              value={profile.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              name='email'
              value={profile.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={profile.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant='success' type='submit' className='mt-3'>
            Guardar Perfil
          </Button>
          <Button variant='info' className='mt-3 mx-2' onClick={handleCancel}>
            Volver al Dashboard
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default Profile;
