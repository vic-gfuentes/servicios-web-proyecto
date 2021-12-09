import React, { useContext } from "react";
import Logo from "../assets/Logo";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import {
  AdminNav,
  MaintenanceNav,
  SecurityNav,
  ConsecutiveNav,
  CustomerNav,
} from "../../router/routers";

const NavMenu = () => {
  const { user } = useContext(AppContext);
  const [currentUser, setCurrentUser] = user;
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    setCurrentUser({});
    localStorage.removeItem("loggedUser");
    history.push("/");
  };

  const renderNavLinks = () => {
    switch (currentUser.role) {
      case 1:
        return <AdminNav />;
      case 2:
        return <MaintenanceNav />;
      case 3:
        return <SecurityNav />;
      case 4:
        return <ConsecutiveNav />;
      case 5:
        return <CustomerNav />;
      default:
        break;
    }
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      bg='primary'
      variant='dark'
      className='sticky-top'
    >
      <Container>
        <Navbar.Brand>
          <Logo width='30' height='30' /> VVuelos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {currentUser.email ? (
              <Link className='nav-link' to='/dashboard'>
                {currentUser.role == 5 ? "Inicio" : "Dashboard"}
              </Link>
            ) : (
              <Link className='nav-link' to='/'>
                Inicio
              </Link>
            )}
            {renderNavLinks()}
          </Nav>
          <Nav>
            {currentUser.email && (
              <Link className='nav-link' to='/profile'>
                Perfil
              </Link>
            )}
            {currentUser.email ? (
              <Nav.Link onClick={handleLogout}>Salir</Nav.Link>
            ) : (
              <React.Fragment>
                <Link className='nav-link' to='/login'>
                  Ingresar
                </Link>
                <Link className='nav-link' to='/register'>
                  Registrarme
                </Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;
