import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AddConsecutive = () => {
  const history = useHistory();
  const [consecutive, setConsecutive] = useState({
    name: "",
    prefix: "",
    value: 0,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setConsecutive({
      ...consecutive,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/consecutives/", {
      method: "POST",
      body: JSON.stringify(consecutive),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("SUCCESS", response);
        history.push("/consecutives");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/consecutives");
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Agregar Consecutivo:</h1>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre'
              name='name'
              value={consecutive.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Prefijo</Form.Label>
            <Form.Control
              type='text'
              placeholder='Prefijo'
              name='prefix'
              value={consecutive.prefix}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Valor</Form.Label>
            <Form.Control
              type='number'
              name='value'
              value={consecutive.value}
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

export default AddConsecutive;
