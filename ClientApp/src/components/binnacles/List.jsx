import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const ListBinnacles = () => {
  const history = useHistory();
  const [binnacles, setBinnacles] = useState([]);

  useEffect(() => {
    fetch("/api/binnacles")
      .then((response) => response.json())
      .then((data) => setBinnacles(data));
  }, []);

  const refresh = () => {
    fetch("/api/binnacles")
      .then((response) => response.json())
      .then((data) => setBinnacles(data));
  };

  const onEditClick = (id) => (e) => {
    e.preventDefault();
    history.push(`/binnacles/edit/${id}`);
  };

  const onDeleteClick = (id) => (e) => {
    e.preventDefault();
    fetch(`/api/binnacles/${id}`, {
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
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>log</th>
            </tr>
          </thead>
          <tbody>
            {binnacles.map((item) => (
              <tr key={item.BinnacleId}>
                <td>{item.BinnacleId}</td>
                <td>{item.log}</td>
                <td>
                  <Button
                    className='mx-2'
                    variant='info'
                    onClick={onEditClick(item.BinnacleId)}
                  >
                    Editar
                  </Button>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={onDeleteClick(item.BinnacleId)}
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

export default ListBinnacles;