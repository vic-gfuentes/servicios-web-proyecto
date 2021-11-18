import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const EditPort = () => {
  const history = useHistory();
  const { id } = useParams();
  const [airlines, setAirlines] = useState([]);
  const [port, setPort] = useState({
    number: "",
    available: false,
    type: 1,
    airlineId: "",
  });

  useEffect(() => {
    fetch("/api/airlines")
      .then((response) => response.json())
      .then((data) => setAirlines(data));
  }, []);

  useEffect(() => {
    fetch(`/api/ports/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setPort({
          portId: data.portId,
          number: data.number,
          available: data.available,
          type: data.type,
          airlineId: data.airline.airlineId,
        })
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setPort({
      ...port,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleAvailableToggle = (e) => {
    const { id, checked } = e.target;

    setPort({
      ...port,
      [id]: checked,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPort({
      ...port,
      [name]: parseInt(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/ports/${id}`, {
      method: "PUT",
      body: JSON.stringify(port),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("SUCCESS", response);
        history.push("/ports");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/ports");
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Modificar puerto:</h1>
          <Form.Group>
            <Form.Label>Numero</Form.Label>
            <Form.Control
              type='text'
              placeholder='Numero'
              name='number'
              value={port.number}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3 mt-3' controlId='available'>
            <Form.Check
              type='checkbox'
              label='Disponible'
              id='available'
              checked={port.available}
              onChange={handleAvailableToggle}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              as='select'
              value={port.type}
              onChange={handleSelectChange}
              name='type'
            >
              <option value={1}>Entrada</option>
              <option value={2}>Salida</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Aerolinea</Form.Label>
            <Form.Control
              as='select'
              value={port.airlineId}
              onChange={handleSelectChange}
              name='airlineId'
            >
              {airlines.map((item) => (
                <option key={item.airlineId} value={item.airlineId}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
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

export default EditPort;
