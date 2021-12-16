import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const EditPaymentsAccount = () => {
  const history = useHistory();
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [paymentsAccount, setPaymentsAccount] = useState({
    accountNumber: "",
    type: "",
    cvv: "",
    accountPassword: "",
    userId: "",
  });

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    fetch(`/api/paymentsAccounts/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setPaymentsAccount({
          paymentsAccountId: data.paymentsAccountId,
          accountNumber: data.accountNumber,
          type: data.type,
          cvv: data.cvv,
          accountPassword: data.accountPassword,
          userId: data.user.userId,
        })
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setPaymentsAccount({
      ...paymentsAccount,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setPaymentsAccount({
      ...paymentsAccount,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/paymentsAccounts/${id}`, {
      method: "PUT",
      body: JSON.stringify(paymentsAccount),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("SUCCESS", response);
        history.push("/paymentsAccounts");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/paymentsAccounts");
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Modificar método de pago:</h1>
          <Form.Group>
            <Form.Label>Número de cuenta</Form.Label>
            <Form.Control
              type='text'
              placeholder='Número de cuenta'
              name='accountNumber'
              value={paymentsAccount.accountNumber}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Control
              type='text'
              placeholder='Tipo'
              name='type'
              value={paymentsAccount.type}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type='text'
              placeholder='CVV'
              name='cvv'
              value={paymentsAccount.cvv}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>AccountPassword</Form.Label>
            <Form.Control
              type='text'
              placeholder='AccountPassword'
              name='accountPassword'
              value={paymentsAccount.accountPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              as='select'
              value={paymentsAccount.userId}
              onChange={handleChange}
              name='userId'
            >
              {users.map((item) => (
                <option key={item.userId} value={item.userId}>
                  {item.name}
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

export default EditPaymentsAccount;
