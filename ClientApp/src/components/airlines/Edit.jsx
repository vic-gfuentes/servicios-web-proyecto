import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const EditAirline = () => {
  const history = useHistory();
  const { id } = useParams();
  const [countries, setCountries] = useState([]);
  const [airline, setAirline] = useState({
    name: "",
    countryId: "",
  });

  useEffect(() => {
    fetch("/api/countries")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    fetch(`/api/airlines/${id}`)
      .then((response) => response.json())
      .then((data) =>
        setAirline({
          airlineId: data.airlineId,
          name: data.name,
          countryId: data.country.countryId,
        })
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setAirline({
      ...airline,
      [name]: type === "number" ? parseInt(value) : value,
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setAirline({
      ...airline,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/airlines/${id}`, {
      method: "PUT",
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
          <h1>Modificar Pais:</h1>
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
              onChange={handleSelectChange}
              name='countryId'
            >
              {countries.map((item) => (
                <option key={item.countryId} value={item.countryId}>
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

export default EditAirline;
