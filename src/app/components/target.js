'use client'

import customAlert from '../lib/customAlert';
import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap'
import './styles.css'
import getClientId from '../lib/auth';

export default function Target() {

  const [targetedSector, setTargetedSector] = useState("1");
  const [room, setRoom] = useState("");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParts = window.location.pathname.split('/');
      const roomFromUrl = urlParts[urlParts.indexOf('game') + 1];
      setRoom(roomFromUrl);
    }
  }, []);

  // Sends a POST request to the server
  const sendPostRequest = async (event) => {
    event.preventDefault();
    const submitData = ({ targetedSector: targetedSector, room: room, id: getClientId() })
    try {
      const res = await fetch('http://localhost:3000/api/actions/target', {
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

  return (
    <div style={{ backgroundImage: `url(${"/universe.jpg"})`, backgroundSize: 'cover' }} className='container-fluid text-center'>
      <div className='row align-items-center vh-100 black-box'>
        <div className='col-8 mx-auto'>
          <Container className="d-flex gap-3 justify-content-center align-items-center">
            <Form onSubmit={sendPostRequest}>

              <div className='margined'>
                <Form.Group controlId="targetedSector">
                  <Form.Label className="page-text">Which sector whould you like to investigate?</Form.Label>
                  <Form.Select size='lg' className="select-small mx-auto" required
                    onChange={(e) => setTargetedSector(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </Form.Select>
                </Form.Group>
              </div>


              <Button className='btn-lg form-btn' type="submit">
                Target
              </Button>

            </Form>
          </Container>
        </div>
      </div>
    </div>

  );
}