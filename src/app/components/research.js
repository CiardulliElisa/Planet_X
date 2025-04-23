'use client'

import customAlert from '../lib/customAlert';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import './styles.css'
import getClientId from '../lib/auth';

export default function Research() {

  const [letter, setLetter] = useState("");
  const [letterError, setLetterError] = useState("");
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
    const submitData = ({ letter: letter, room: room, id: getClientId() })
    try {
      const res = await fetch('http://localhost:3000/api/actions/research', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (res.ok) {
        const responseData = await res.json();
        customAlert(responseData.message);
        window.location.href = `/game/${code}/research`
      } else {
        customAlert("Oops! Something is wrong.")
      }
    } catch (error) {
    }
  }

  const handleValidation = (event) => {

    event.preventDefault();

    const regex = /[A-Fa-f]/

    if (!regex.test(letter)) {
      setLetterError("This is not a valid research.")
    }
    else {
      setLetterError("");
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
                <Form.Group controlId="beforePlanetX">
                  <Form.Label>What will you research?</Form.Label>
                  <Form.Control type="text" size='lg' name="researchLetter" className="mx-auto select-small" maxLength={1}
                    onChange={(e) => setLetter(e.target.value)} required>
                  </Form.Control>
                  <Form.Text className="text-danger">{letterError}</Form.Text>
                </Form.Group>
              </div>

              <Button className='form-btn btn-lg' type="submit">
                Submit
              </Button>

            </Form>
          </Container>
        </div>
      </div>
    </div>

  );
}