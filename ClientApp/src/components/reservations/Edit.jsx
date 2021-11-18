import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const EditReservation = () => {
  const history = useHistory();
  const { id } = useParams();
  const [flights, setFlights] = useState([]);
  const [paymentsAccount, setPaymentsAccount] = useState([]);
  const [reservation, setReservation] = useState({
    tickets: "",
    status: "",
    flightId: "",
    paymentsAccountId: "",
  });

  useEffect(() => {
    fetch("/api/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data));
  }, []);

  useEffect(() => {
    fetch("/api/paymentsAccount")
      .then((response) => response.json())
      .then((data) => setPaymentsAccount(data));
  }, []);

  useEffect(() => {
    fetch(`/api/reservations/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setReservation({
          reservationId: data.reservationId,
          tickets: data.tickets,
          status: data.status,
          flightId: data.flightId,
          paymentsAccountId: data.paymentsAccountId,
        })
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setReservation({
      ...reservation,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setReservation({
      ...reservation,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/reservations/${id}`, {
      method: "PUT",
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

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Modificar reservacion:</h1>
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
              type='text'
              placeholder='Estado'
              name='status'
              value={reservation.status}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Vuelo</Form.Label>
            <Form.Control
              as='select'
              value={reservation.flightId}
              onChange={handleSelectChange}
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
              onChange={handleSelectChange}
              name='paymentsAccountId'
            >
              {paymentsAccount.map((item) => (
                <option key={item.paymentsAccountId} value={item.paymentsAccountId}>
                  {item.paymentsAccountId}
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

export default EditReservation;
