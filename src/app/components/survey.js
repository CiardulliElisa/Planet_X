'use client'

import customAlert from '../lib/customAlert';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import './styles.css';
import getClientId from '../lib/auth';

export default function Survey() {

  const [celestialBody, setCelestialBody] = useState("asteroid");
  const [startSector, setStartSector] = useState("");
  const [endSector, setEndSector] = useState("");

  const [startSectorError, setStartSectorError] = useState("");
  const [endSectorError, setEndSectorError] = useState("");

  const [validated, setValidated] = useState(false);

  const [room, setRoom] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParts = window.location.pathname.split('/');
      const roomFromUrl = urlParts[urlParts.indexOf('game') + 1];
      setRoom(roomFromUrl);
    }
  }, []);

  // Sends a POST request to the server
  const sendPostRequest = async () => {
    const submitData = ({ celestialBody: celestialBody, startSector: startSector, endSector: endSector, room: room, id: getClientId() })
    try {
      const res = await fetch('http://localhost:3000/api/actions/survey', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (res.ok) {
        const responseData = await res.json();
        customAlert(responseData.message);
        window.location.href = `/game/${room}/board`;
      } else {
        customAlert("Oops! Something is wrong.")
      }
    } catch (error) {
    }
  }

  // Validates the form
  const handleValidation = (event) => {
    event.preventDefault();

    let valid = true;

    if (startSector > 12 || startSector < 1) {
      setStartSectorError("You cannot survey this sector.");
      valid = false;
    }

    if (endSector > 12 || endSector < 1) {
      setEndSectorError("This sector does not exist.");
      valid = false;
    }

    if (startSector === endSector) {
      setStartSectorError("");
      setEndSectorError("Enter a different sector or target instead of surveying.");
      valid = false;
    }

    if (valid) {
      setStartSectorError("");
      setEndSectorError("");
      setValidated(true);
      sendPostRequest();
    }

  };

  return (
    <div style={{ backgroundImage: `url(${"/universe.jpg"})`, backgroundSize: 'cover' }} className='container-fluid text-center'>
      <div className='row align-items-center vh-100 black-box'>
        <div className='col-8 mx-auto'>
          <Container className="d-flex gap-3 justify-content-center align-items-center">
            <Form validated={validated} onSubmit={handleValidation}>

              <div className="margined">
                <Form.Group controlId="celestialBodySurvey">
                  <Form.Label className="page-text">What are you looking for?</Form.Label>
                  <Form.Select size='lg' className="select-medium mx-auto" value={celestialBody}
                    onChange={(e) => setCelestialBody(e.target.value)}>
                    <option value="asteroid">🪨 asteroid</option>
                    <option value="comet">☄️ comet</option>
                    <option value="gas cloud">☁️ gas cloud</option>
                    <option value="dwarf planet">🪐 dwarf planet</option>
                    <option value="void">🫙 void</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="margined">
                <Form.Group controlId="startSector margined">
                  <Form.Label className="page-text">From sector: </Form.Label>
                  <Form.Control
                    type="number" size='lg' name="startSector" className="mx-auto select-small" maxLength={2} min={1} max={12}
                    onChange={(e) => setStartSector(e.target.valueAsNumber)} required>
                  </Form.Control>
                  <Form.Text className="text-danger">{startSectorError}</Form.Text>
                </Form.Group>
              </div>

              <div className="margined">
                <Form.Group controlId="lastSector margined">
                  <Form.Label className="page-text">To sector: </Form.Label>
                  <Form.Control
                    type="number" size='lg' name="endSector" className="mx-auto select-small" maxLength={2} min={1} max={12}
                    onChange={(e) => setEndSector(e.target.valueAsNumber)} required>
                  </Form.Control>
                  <Form.Text className="text-danger">{endSectorError}</Form.Text>
                </Form.Group>
              </div>

              <Button className='btn-lg form-btn' type="submit">
                Survey
              </Button>

            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}