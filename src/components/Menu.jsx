import React, { useState } from "react";
import { Navbar, Container, Col, Button } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "./Sidebar";
import Logo from "./Logo";
import "../styles/Menu.css";

const Menu = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar className="Menu" variant="dark">
        <Container>
          <Col className="d-flex Navbar">
            <div>
              <Button variant="outline-primary" onClick={handleShow}>
                <GiHamburgerMenu />
              </Button>
            </div>
            <div className="Logo__div">
              <Logo />
            </div>
          </Col>
          <Navbar.Toggle />
        </Container>
      </Navbar>
      <Sidebar show={show} onClose={handleClose} />
    </>
  );
};
export default Menu;
