import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AddFlight = () => {
  const history = useHistory();
  const [flight, setFlight] = useState({
    origin: "",
    destination: "",
    ticketPrice: "",
    date: "",
    status: "",
    portId: 0,
  });
  const [consec, setConsec] = useState({});
  const [consecutives, setConsecutives] = useState([]);
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    fetch("/api/consecutives")
      .then((response) => response.json())
      .then((data) => setConsecutives(data));
  }, []);

  useEffect(() => {
    fetch("/api/ports")
      .then((response) => response.json())
      .then((data) => setPorts(data));
  }, []);


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFlight({
      ...flight,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };


  const handleConsecutiveChange = (e) => {
    setConsec(e.target.value);
  };

  const handlePortChange = (e) => {
    const { name, value } = e.target;
    setFlight({
      ...flight,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/flights/${consec}`, {
      method: "POST",
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
          <h1>Agregar vuelo:</h1>
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
              type='text'
              placeholder='Estado'
              name='status'
              value={flight.status}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Puerto</Form.Label>
            <Form.Control
              as='select'
              name='portId'
              value={flight.portId}
              onChange={handlePortChange}
            >
              {ports.map((item) => (
                <option key={item.portId} value={item.portId}>
                  {item.number}
                </option>
              ))}
            </Form.Control>

          </Form.Group>

          <Form.Group>
            <Form.Label>Consecutivo</Form.Label>
            <Form.Control
              as='select'
              value={consec}
              onChange={handleConsecutiveChange}
              name='consec'
            >
              {consecutives.map((item) => (
                <option value={item.prefix} key={item.prefix}>
                  {item.name} - {item.prefix}
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

export default AddFlight;
