import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const ListAirlines = () => {
  const history = useHistory();
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    fetch("/api/airlines")
      .then((response) => response.json())
      .then((data) => setAirlines(data));
  }, []);

  const refresh = () => {
    fetch("/api/airlines")
      .then((response) => response.json())
      .then((data) => setAirlines(data));
  };

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/airlines/new");
  };

  const onEditClick = (id) => (e) => {
    e.preventDefault();
    history.push(`/airlines/edit/${id}`);
  };

  const onDeleteClick = (id) => (e) => {
    e.preventDefault();
    fetch(`/api/airlines/${id}`, {
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

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Button className='mb-4' variant='success' onClick={onAddClick}>
          Agregar Aereolinea
        </Button>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Pais</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {airlines.map((item) => (
              <tr key={item.airlineId}>
                <td>{item.airlineId}</td>
                <td>{item.name}</td>
                <td>{item.country.name || "---"}</td>
                <td>
                  <Button
                    className='mx-2'
                    variant='info'
                    onClick={onEditClick(item.airlineId)}
                  >
                    Editar
                  </Button>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={onDeleteClick(item.airlineId)}
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

export default ListAirlines;
