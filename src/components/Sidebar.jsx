import React from "react";
import { Offcanvas } from "react-bootstrap";
import "../styles/Sidebar.css";

const Sidebar = (props) => {
  const { show, onClose } = props;

  return (
    <>
      <Offcanvas className="Sidebar" show={show} onHide={onClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
