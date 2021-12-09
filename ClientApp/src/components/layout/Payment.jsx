import React, { useContext,useState, useEffect  } from "react";
import AppContext from "../../context/AppContext";
import { Form, Button, Container, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import swal from 'sweetalert';

const Payment = () => {
    const { user } = useContext(AppContext);
    const [currentUser, setCurrentUser] = user;
    const [paymentsAccounts, setPaymentsAccounts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        swal("Pago exitoso", "El pago se ha realizado con éxito", "success");
    };

    const handleCancel = (e) => {
        e.preventDefault();
        swal("Pago cancelado", "Su pago se ha cancelado", "error");
    };

    useEffect(() => {
        fetch("/api/paymentsAccounts")
            .then((response) => response.json())
            .then((data) => setPaymentsAccounts(data));
    }, []);

    const precioTickets = () => {
        return (Math.floor(Math.random() * (4000 - 500 + 1)) + 500);
    };

    return (
        <Container className='py-3'>
            <div className='bg-secondary p-5'>
                <Form onSubmit={handleSubmit} className='mt-4'>
                    <h1>Realizar pago:</h1>
                    <Form.Group>
                        <Form.Label>Tarjeta-habiente</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Tarjeta-habiente'
                            name='tarjetaHabiente'
                        />

                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Número de cuenta</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Número de cuenta'
                            name='accountNumber'
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Pago</Form.Label>
                        <Form.Control
                            as='select'
                            // value={reservation.paymentsAccountId}
                            // onChange={handleSelectChange}
                            name='paymentsAccountId'
                        >
                            {paymentsAccounts.map((item) => (
                                <option
                                    key={item.paymentsAccountId}
                                    value={item.paymentsAccountId}
                                >
                                    {item.paymentsAccountId}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='CVV'
                            name='cvv'
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de pago</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Tipo de pago'
                            name='type'
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Total a pagar</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Total a pagar'
                            name='total'
                            value={'$' + precioTickets()}
                            readOnly
                        />
                    </Form.Group>

                    <Button variant='success' type='submit' className='mt-3'>
                        Confirmar
                    </Button>
                    <Button variant='info' className='mt-3 mx-2' onClick={handleCancel}>
                        Cancelar
                    </Button>
                </Form>
            </div>
        </Container>
    );
};

export default Payment;