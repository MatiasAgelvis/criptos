import React, { useEffect } from "react";
import { Offcanvas, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { dispatchInterval, dispatchDataSlice } from "../redux/interval";

import "../styles/Sidebar.css";

const Sidebar = (props) => {
  const { show, onClose } = props;

  const dispatch = useDispatch();
  const interval = useSelector((store) => store.interval.interval);
  const slice = useSelector((store) => store.interval.slice);

  // useEffect(() => {
  //   console.log(interval, slice);
  // }, [interval, slice]);

  let intervalOptions = [
    { value: "m1", label: "One Minute" },
    { value: "m5", label: "Five Minutes" },
    { value: "m15", label: "Fifteen Minutes" },
    { value: "m30", label: "Thirteen Minutes" },
    { value: "h1", label: "One Hour" },
    { value: "h2", label: "Two Hours" },
    { value: "h6", label: "Six Hours" },
    { value: "h12", label: "Twelve Hours" },
    { value: "d1", label: "One Day" },
  ];

  return (
    <>
      <Offcanvas className="Sidebar" show={show} onHide={onClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTime">
              <Form.Label>Time Interval</Form.Label>
              <Form.Select
                aria-label="Select chart time interval"
                onChange={(e) => dispatch(dispatchInterval(e.target.value))}
                value={interval}
              >
                {intervalOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </Form.Select>
              <br />
              <Form.Label>Data Points : {slice}</Form.Label>
              <Form.Range
                min="1"
                max="1000"
                onChange={(e) => dispatch(dispatchDataSlice(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
