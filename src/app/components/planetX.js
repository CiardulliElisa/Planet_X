'use client'

import customAlert from '../lib/customAlert';
import { Form, Button, Container } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import './styles.css'
import getClientId from '../lib/auth';

export default function PlanetX() {

  const [planetSector, setplanetSector] = useState('1');
  const [sectorX, setSectorX] = useState('12');
  const [sectorY, setSectorY] = useState('2');
  const [xObj, setXObj] = useState('asteroid');
  const [yObj, setYObj] = useState('asteroid');

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
    const submitData = ({ planetSector: planetSector, sectorX: sectorX, sectorY: sectorY, Xobj: xObj, Yobj: yObj, room: room, id: getClientId() })
    try {
      const res = await fetch('http://localhost:3000/api/actions/planetX', {
        method: 'POST',
        body: JSON.stringify(submitData),
        headers: {
          'content-type': 'application/json'
        }
      })
      if (res.ok) {
        const responseData = await res.json();
        customAlert(responseData.message);

        if (responseData.message === 'You found Planet X!') {
          setTimeout(() => {
            window.location.href = `/game/${room}/winner`;
          }, 2000);
        }

        window.location.href = `/game/${room}/board`;
      } else {
        customAlert("Oops! Something is wrong.")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const planetSelection = (e) => {
    const newPlanetSector = parseInt(e.target.value);
    setplanetSector(newPlanetSector);
    setSectorX(newPlanetSector === 1 ? '12' : ((newPlanetSector - 1) % 12).toString());
    setSectorY(newPlanetSector === 12 ? '1' : ((newPlanetSector + 1) % 12).toString());
  }


  return (
    <div style={{ backgroundImage: `url(${"/universe.jpg"})`, backgroundSize: 'cover' }} className='container-fluid text-center'>
      <div className='row align-items-center vh-100 black-box'>
        <div className='col-8 mx-auto'>
          <Container className="d-flex gap-3 justify-content-center align-items-center">
            <Form onSubmit={sendPostRequest}>

              <div className="margined">
                <Form.Group controlId="targetedSector">
                  <Form.Label>Where is Planet X?</Form.Label>
                  <Form.Select size='lg' className="select-small mx-auto" onChange={planetSelection} required>
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

              <div className="margined">
                <Form.Group controlId="beforePlanetX">
                  <Form.Label>What is in Sector {sectorX}?</Form.Label>
                  <Form.Select size='lg' className="select-medium mx-auto" required onChange={(e) => setXObj(e.target.value)}>
                    <option value="asteroid">🪨 asteroid</option>
                    <option value="comet">☄️ comet</option>
                    <option value="gas cloud">☁️ gas cloud</option>
                    <option value="dwarf planet">🪐 dwarf planet</option>
                    <option value="void">🫙 void</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="margined">
                <Form.Group controlId="afterPlanetX">
                  <Form.Label>What is in Sector {sectorY}?</Form.Label>
                  <Form.Select size='lg' className="select-medium mx-auto" required onChange={(e) => setYObj(e.target.value)}>
                    <option value="asteroid">🪨 asteroid</option>
                    <option value="comet">☄️ comet</option>
                    <option value="gas cloud">☁️ gas cloud</option>
                    <option value="dwarf planet">🪐 dwarf planet</option>
                    <option value="void">🫙 void</option>
                  </Form.Select>
                </Form.Group>
              </div>

              <Button className='btn-lg form-btn' type="submit">
                Submit
              </Button>

            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}