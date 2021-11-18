import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const ListFlights = () => {
  const history = useHistory();
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("/api/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data));
  }, []);

  const refresh = () => {
    fetch("/api/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data));
  };

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/flights/new");
  };

  const onEditClick = (id) => (e) => {
    e.preventDefault();
    history.push(`/flights/edit/${id}`);
  };

  const onDeleteClick = (id) => (e) => {
    e.preventDefault();
    fetch(`/api/flights/${id}`, {
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
      case 0:
        return 'Cancelado';
      case 1:
        return 'Salida';
      case 2:
        return 'Llegada';
      case 3:
        return 'Tarde';
      case 5:
      default: break;
    }

  }


  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Button className='mb-4' variant='success' onClick={onAddClick}>
          Agregar vuelo
        </Button>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Precio</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Puerto</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((item) => (
              <tr key={item.flightId}>
                <td>{item.flightId}</td>
                    <td>{item.origin}</td>
                    <td>{item.destination}</td>
                    <td>{item.ticketPrice}</td>
                    <td>{item.date}</td>
                    <td>{serialize(item.status)}</td>
                    <td>{item.port.number}</td>
                <td>
                  <Button
                    className='mx-2'
                    variant='info'
                    onClick={onEditClick(item.flightId)}
                  >
                    Editar
                  </Button>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={onDeleteClick(item.flightId)}
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

export default ListFlights;
