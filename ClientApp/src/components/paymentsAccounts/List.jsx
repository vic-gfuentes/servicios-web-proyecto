import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";

const ListPaymentsAccounts = () => {
  const history = useHistory();
  const [paymentsAccounts, setPaymentsAccounts] = useState([]);

  useEffect(() => {
    fetch("/api/paymentsAccounts")
      .then((response) => response.json())
      .then((data) => setPaymentsAccounts(data));
  }, []);

  const refresh = () => {
    fetch("/api/paymentsAccounts")
      .then((response) => response.json())
      .then((data) => setPaymentsAccounts(data));
  };

  const onAddClick = (e) => {
    e.preventDefault();
    history.push("/paymentsAccounts/new");
  };

  const onEditClick = (id) => (e) => {
    e.preventDefault();
    history.push(`/paymentsAccounts/edit/${id}`);
  };

  const onDeleteClick = (id) => (e) => {
    e.preventDefault();
    fetch(`/api/paymentsAccounts/${id}`, {
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

  const serializeType = (Type) => {
    switch (Type) {
      case 1:
        return "EasyPay";
      case 2:
        return "Card";
      default:
        break;
    }
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Button className='mb-4' variant='success' onClick={onAddClick}>
          Agregar método de pago
        </Button>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Número de cuenta</th>
              <th>Tipo</th>
              <th>CVV</th>
              <th>Contraseña</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {paymentsAccounts.map((item) => (
              <tr key={item.paymentsAccountId}>
                <td>{item.accountNumber}</td>
                <td>{serializeType(item.type)}</td>
                <td>{item.cvv}</td>
                <td>{item.accountPassword}</td>
                <td>{item.user.name || "---"}</td>
                <td>
                  <Button
                    className='mx-2'
                    variant='info'
                    onClick={onEditClick(item.paymentsAccountId)}
                  >
                    Editar
                  </Button>
                  <Button
                    className='mx-2'
                    variant='danger'
                    onClick={onDeleteClick(item.paymentsAccountId)}
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

export default ListPaymentsAccounts;
