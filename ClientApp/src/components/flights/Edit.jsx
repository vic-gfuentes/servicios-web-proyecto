import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const EditFlight = () => {
  const history = useHistory();
  const { id } = useParams();
  const [flight, setFlight] = useState({
    origin: "",
    destination: "",
    ticketPrice: "",
    imageUrl: "",
    date: "",
    status: "",
    port: "",
  });

  useEffect(() => {
    fetch(`/api/flights/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setFlight({
          flightId: data.flightId,
          origin: data.origin,
          destination: data.destination,
          ticketPrice: data.ticketPrice,
          imageUrl: data.imageUrl,
          date: data.date,
          status: data.status,
          port: data.port,
        })
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFlight({
      ...flight,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFlight({
      ...flight,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/flights/${id}`, {
      method: "PUT",
      body: JSON.stringify(flight),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("SUCCESS", response);
        history.push("/flights");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/flights");
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Modificar vuelo:</h1>
          <Form.Group>
            <Form.Label>Origen</Form.Label>
            <Form.Control
              type='text'
              placeholder='Origen'
              name='origin'
              value={flight.origin}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Destino</Form.Label>
            <Form.Control
              type='text'
              placeholder='Destino'
              name='destination'
              value={flight.destination}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type='text'
              placeholder='Precio'
              name='ticketPrice'
              value={flight.ticketPrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Imagen destino</Form.Label>
            <Form.Control
              type='text'
              placeholder='URL de la imagen de destino'
              name='imageUrl'
              value={flight.imageUrl}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type='date'
              placeholder='Fecha'
              name='date'
              value={flight.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as='select'
              value={flight.status}
              onChange={handleSelectChange}
              name='status'
            >
              <option value={0}>Cancelado</option>
              <option value={1}>Despegó</option>
              <option value={2}>Arrivó</option>
              <option value={3}>Tarde</option>
              <option value={4}>Agendado</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Puerto</Form.Label>
            <Form.Control
              type='text'
              placeholder='Puerto'
              name='port'
              value={flight.port.number}
              readOnly
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

export default EditFlight;
