import React from "react";
import Logo from "../assets/Logo";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavMenu = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      variant="dark"
      className="sticky-top"
    >
      <Container>
        <Navbar.Brand>
          <Logo idth="30" height="30" /> VVuelos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
          </Nav>
          <Nav>
            <Link className="nav-link" to="/login">
              Ingresar
            </Link>
            <Link className="nav-link" to="/register">
              Registrarme
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
