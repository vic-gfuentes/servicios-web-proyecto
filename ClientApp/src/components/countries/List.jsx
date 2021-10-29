import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const ListCountries = () => {
  const history = useHistory();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("/api/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const refresh = () => {
    fetch("/api/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  };

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/countries/new");
  };

  const onEditClick = (id) => (e) => {
    e.preventDefault();
    history.push(`/countries/edit/${id}`);
  };

  const onDeleteClick = (id) => (e) => {
    e.preventDefault();
    fetch(`/api/countries/${id}`, {
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
          Agregar Pais
        </Button>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>ISO</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((item) => (
              <tr key={item.countryId}>
                <td>{item.countryId}</td>
                <td>{item.name}</td>
                <td>{item.iso}</td>
                <td>
                  <Button
                    className='mx-2'
                    variant='info'
                    onClick={onEditClick(item.countryId)}
                  >
                    Editar
                  </Button>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={onDeleteClick(item.countryId)}
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

export default ListCountries;
