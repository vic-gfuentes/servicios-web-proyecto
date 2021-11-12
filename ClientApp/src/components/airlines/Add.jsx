import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AddAirline = () => {
  const history = useHistory();
  const [airline, setAirline] = useState({
    name: "",
    countryId: "",
  });
  const [consec, setConsec] = useState({});
  const [consecutives, setConsecutives] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("/api/consecutives")
      .then((response) => response.json())
      .then((data) => setConsecutives(data));
  }, []);

  useEffect(() => {
    fetch("/api/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setAirline({
      ...airline,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleCountryChange = (e) => {
    const { name, value } = e.target;
    setAirline({
      ...airline,
      [name]: value,
    });
  };

  const handleConsecutiveChange = (e) => {
    setConsec(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/airlines/${consec}`, {
      method: "POST",
      body: JSON.stringify(airline),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("SUCCESS", response);
        history.push("/airlines");
      });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.push("/airlines");
  };

  return (
    <Container className='py-3'>
      <div className='bg-secondary p-5'>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <h1>Agregar Aereolinea:</h1>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nombre'
              name='name'
              value={airline.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Pais</Form.Label>
            <Form.Control
              as='select'
              value={airline.countryId}
              onChange={handleCountryChange}
              name='countryId'
            >
              {countries.map((item) => (
                <option key={item.countryId} value={item.countryId}>
                  {item.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Consecutivo</Form.Label>
            <Form.Control
              as='select'
              value={consec}
              onChange={handleConsecutiveChange}
              name='consec'
            >
              {consecutives.map((item) => (
                <option value={item.prefix} key={item.prefix}>
                  {item.name} - {item.prefix}
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

export default AddAirline;
