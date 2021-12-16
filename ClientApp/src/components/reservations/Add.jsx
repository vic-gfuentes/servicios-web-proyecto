import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AddReservation = () => {
  const history = useHistory();
  const { flightId } = useParams();
  const [reservation, setReservation] = useState({
    tickets: "",
    status: "",
    flightId: flightId,
    paymentsAccountId: 1,
  });
  const [flight, setFlight] = useState({});
  const [paymentsAccounts, setPaymentsAccounts] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(1);

  useEffect(() => {
    fetch(`/api/flights/${flightId}`)
      .then((response) => response.json())
      .then((data) => setFlight(data));
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

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(parseInt(e.target.value));
  };

  const handleSubmit = (type) => {
    var reserv = reservation;
    reserv.status = type;

    fetch(`/api/reservations/CT`, {
      method: "POST",
      body: JSON.stringify(reserv),
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
    history.push("/dashboard");
  };

  const renderPaymentMethod = () => {
    if (paymentMethod == 1) {
      return (
        <Form.Group>
          <Form.Label>Cuenta de Pago</Form.Label>
          <Form.Control
            as='select'
            value={reservation.paymentsAccountId}
            onChange={handleChange}
            name='paymentsAccountId'
          >
            {paymentsAccounts.map((item) => (
              <option
                key={item.paymentsAccountId}
                value={item.paymentsAccountId}
              >
                {item.accountNumber}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );
    }

    if (paymentMethod == 2) {
      return (
        <div>
          <Form.Group>
            <Form.Label>Numero de tarjeta</Form.Label>
            <Form.Control type='number' placeholder='Numero de tarjeta' />
          </Form.Group>
          <Form.Group>
            <Form.Label>CVV</Form.Label>
            <Form.Control type='number' placeholder='CVV' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de vencimiento</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
        </div>
      );
    }

    return <div></div>;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    handleSubmit(1);
  };
  const handleReservation = (e) => {
    e.preventDefault();
    handleSubmit(2);
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form className='mt-4'>
          <h1>Agregar reservacion:</h1>

          <Form.Group>
            <Form.Label>Cantidad de Tickets</Form.Label>
            <Form.Control
              type='number'
              placeholder='Tickets'
              name='tickets'
              value={reservation.tickets}
              onChange={handleChange}
              min={1}
            />
          </Form.Group>

          <Row>
            <Col>
              <Container className='my-3'>
                <Card>
                  <Card.Img variant='top' src={flight.imageUrl} />
                  <Card.Body>
                    <Card.Title>{flight.destination}</Card.Title>
                    <Card.Text>{formatDate(flight.date)}</Card.Text>
                  </Card.Body>
                </Card>
              </Container>
            </Col>
            <Col>
              <Card className='my-3'>
                <Card.Body>
                  <Card.Title>Seleccione el metodo de pago</Card.Title>
                  <div>
                    <Form.Group>
                      <Form.Control
                        as='select'
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <option value={1}>EasyPay</option>
                        <option value={2}>Tarjeta de Credito</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className='mt-2'>{renderPaymentMethod()}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Button variant='success' className='mt-3' onClick={handlePayment}>
            Realizar pago
          </Button>
          <Button
            variant='warning'
            className='mt-3 mx-3'
            onClick={handleReservation}
          >
            Reservar unicamente
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
