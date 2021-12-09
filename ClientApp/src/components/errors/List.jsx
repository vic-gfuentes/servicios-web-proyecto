import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const ListErrors = () => {
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

  const serialize = (type) => {
    switch (type) {
      case 0:
        return "Error";
      case 1:
        return "Add";
      case 2:
        return "Update";
      case 3:
        return "Delete";
    }
  };

  return (
    <div className='position-absolute h-100 w-100'>
      <div className='bg-secondary p-5'>
        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Log</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {binnacles.map((item) => (
              item.type == 0 ?
              <tr key={item.recordId}>
                <td>{item.recordId}</td>
                <td>{serialize(item.type)}</td>
                <td>{item.log}</td>
                <td>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={onDeleteClick(item.BinnacleId)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr> : null

            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ListErrors;
