import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AddReservation = () => {
  const history = useHistory();
  const [reservation, setReservation] = useState({
    tickets: "",
    status: "",
    flightId: "",
    paymentsAccountId: "",
  });
  const [consec, setConsec] = useState({});
  const [consecutives, setConsecutives] = useState([]);
  const [flights, setFlights] = useState([]);
  const [paymentsAccounts, setPaymentsAccounts] = useState([]);

  useEffect(() => {
    fetch("/api/consecutives")
      .then((response) => response.json())
      .then((data) => setConsecutives(data));
  }, []);

  useEffect(() => {
    fetch("/api/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data));
  }, []);

  useEffect(() => {
    fetch("/api/paymentsAccounts")
      .then((response) => response.json())
      .then((data) => setPaymentsAccounts(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setReservation({
      ...reservation,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleFlightChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  const handlePaymentsAccountChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  const handleConsecutiveChange = (e) => {
    setConsec(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/reservations/${consec}`, {
      method: "POST",
      body: JSON.stringify(reservation),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("SUCCESS", response);
        history.push("/reservations");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/reservations");
  };

  const serializeType = (type) => {
    switch (type) {
      case 1:
        return "EasyPay";
      case 2:
        return "Card";
      default:
        break;
    }
  };

  const serializeStatus = (Status) => {
    switch (Status) {
      case 1:
        return "Pagado";
      case 2:
        return "Pendiente";
      case 3:
        return "Cancelado";
      default:
        break;
    }
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Agregar reservacion:</h1>

          <Form.Group>
            <Form.Label>Tickets</Form.Label>
            <Form.Control
              type='text'
              placeholder='Tickets'
              name='tickets'
              value={reservation.tickets}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as='select'
              value={reservation.status}
              onChange={handleChange}
              name='status'
            >
              {flights.map((item) => (
                <option key={item.status} value={item.status}>
                  {item.status}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Vuelo</Form.Label>
            <Form.Control
              as='select'
              value={reservation.flightId}
              onChange={handleChange}
              name='flightId'
            >
              {flights.map((item) => (
                <option key={item.flightId} value={item.flightId}>
                  {item.flightId}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Pago</Form.Label>
            <Form.Control
              as='select'
              value={reservation.paymentsAccountId}
              onChange={handleChange}
              name='paymentsAccountId'
            >
              {paymentsAccounts.map((item) => (
                <option key={item.paymentsAccountId} value={item.paymentsAccountId}>
                  {item.paymentsAccountId}
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

export default AddReservation;
