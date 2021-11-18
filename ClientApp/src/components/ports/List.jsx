import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const ListPorts = () => {
  const history = useHistory();
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    fetch("/api/ports")
      .then((response) => response.json())
      .then((data) => setPorts(data));
  }, []);

  const refresh = () => {
    fetch("/api/ports")
      .then((response) => response.json())
      .then((data) => setPorts(data));
  };

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/ports/new");
  };

  const onEditClick = (id) => (e) => {
    e.preventDefault();
    history.push(`/ports/edit/${id}`);
  };

  const onDeleteClick = (id) => (e) => {
    e.preventDefault();
    fetch(`/api/ports/${id}`, {
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

  const serializeAvailable = (available) => {
    switch (available) {
      case false:
        return "No";
      case true:
        return "Si";
      default:
        break;
    }
  };

  const serializeType = (Type) => {
    switch (Type) {
      case 1:
        return "Entrada";
      case 2:
        return "Salida";
      default:
        break;
    }
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Button className='mb-4' variant='success' onClick={onAddClick}>
          Agregar puerto
        </Button>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Numero</th>
              <th>Disponible</th>
              <th>Tipo</th>
              <th>Aerolinea</th>
            </tr>
          </thead>
          <tbody>
            {ports.map((item) => (
              <tr key={item.portId}>
                <td>{item.portId}</td>
                <td>{item.number}</td>
                <td>{serializeAvailable(item.available)}</td>
                <td>{serializeType(item.type)}</td>
                <td>{item.airline.name}</td>
                <td>
                  <Button
                    className='mx-2'
                    variant='info'
                    onClick={onEditClick(item.portId)}
                  >
                    Editar
                  </Button>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={onDeleteClick(item.portId)}
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

export default ListPorts;
