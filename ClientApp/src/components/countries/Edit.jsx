import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const EditCountry = () => {
  const history = useHistory();
  const { id } = useParams();
  const [country, setCountry] = useState({
    name: "",
    iso: "",
  });

  useEffect(() => {
    fetch(`/api/countries/${id}`)
      .then((response) => response.json())
      .then((data) => setCountry(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setCountry({
      ...country,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/countries/${id}`, {
      method: "PUT",
      body: JSON.stringify(country),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("SUCCESS", response);
        history.push("/countries");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/countries");
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Modificar Pais:</h1>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre'
              name='name'
              value={country.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>ISO</Form.Label>
            <Form.Control
              type='text'
              placeholder='Email'
              name='iso'
              value={country.iso}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant='success' type='submit' className='mt-3'>
            Guardar
          </Button>
          <Button variant='info' className='mt-3 mx-2' onClick={handleCancel}>
            Cancelar
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default EditCountry;
