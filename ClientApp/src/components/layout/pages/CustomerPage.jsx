import React, { useState, useEffect } from "react";
import FlightItem from "../../flights/Items";
import { Row, Col, Form, Button } from "react-bootstrap";

const CustomerPage = () => {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
  });

  useEffect(() => {
    fetch("/api/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data));
  }, []);

  const refresh = () => {
    fetch("/api/flights")
      .then((response) => response.json())
      .then((data) => setFlights(data));
  };

  const filter = () => {
    fetch(
      `/api/filters/flights?origen=${filters.origin}&destino=${filters.destination}`
    )
      .then((response) => response.json())
      .then((data) => setFlights(data));
  };

  const removeFilter = () => {
    setFilters({
      origin: "",
      destination: "",
    });
    refresh()
  };

  const filterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <section className='bg-white h-100'>
      <div className='container py-5'>
        <div className='container d-flex flex-column justify-content-around py-5'>
          <div className='d-flex justify-content-center align-items-center mb-3'>
            <div className='col-sm-8 text-center'>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Control
                      placeholder='Escribe el origen del vuelo'
                      name='origin'
                      value={filters.origin}
                      onChange={filterChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Control
                      placeholder='Escribe el destino del vuelo'
                      name='destination'
                      value={filters.destination}
                      onChange={filterChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Button variant='primary' onClick={filter}>
                    Buscar
                  </Button>
                  <Button variant='danger' onClick={removeFilter}>
                    X
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        <ul className='list-group list-group-flush'>
          {flights.map((item) => (
            <li key={item.flightId} className='list-group-item py-4'>
              <FlightItem flight={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CustomerPage;
