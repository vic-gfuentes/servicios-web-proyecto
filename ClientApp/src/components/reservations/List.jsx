import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const ListReservations = () => {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch("/api/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data));
  }, []);

  const refresh = () => {
    fetch("/api/reservations")
      .then((response) => response.json())
      .then((data) => setReservations(data));
  };

  const onDeleteClick = (id) => (e) => {
    e.preventDefault();
    fetch(`/api/reservations/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("DELETED", response);
        refresh();
      });
  };

  const serialize = (status) => {
    switch (status) {
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

  const flightData = (flight) => {
    if (flight) {
      return flight.destination;
    }

    return "";
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <h3>Tus reservaciones</h3>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tickets</th>
              <th>Status</th>
              <th>Flight</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((item) => (
              <tr key={item.reservationId}>
                <td>{item.reservationId}</td>
                <td>{item.tickets}</td>
                <td>{serialize(item.status)}</td>
                <td>{flightData(item.flight)}</td>
                <td>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={onDeleteClick(item.reservationId)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ListReservations;
