'use client'

import React, { useEffect, useState } from 'react';
import Sector from '@/app/components/sector';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useParams } from 'next/navigation';

function checkedIcons() {
  const icons = {
    planetX: false,
    void: false,
    cloud: false,
    dwarfplanet: false,
    asteroid: false,
    comet: false
  };
  return icons;
}

const getDefoultSectorData = () => {
  return Array.from({ length: 12 }, (_, i) => {
    return {
      players: [''],
      papers: [],
      checks: checkedIcons()
    };
  });
}

export default function Spacemap() {

  // Get the route parameters
  const params = useParams();

  // Extract the room parameter
  const room = params.room;

  const [items, setItems] = useState(1);
  const [selected, setSelected] = useState(0);
  const [players, setPlayers] = useState(null);
  const [sectorData, setSectorData] = useState(null);

  const updateItems = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 992) {
      setItems(4);
    } else if (screenWidth >= 768) {
      setItems(2);
    } else {
      setItems(1);
    }
  }



  useEffect(() => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 992) {
        setItems(4);
      } else if (screenWidth >= 768) {
        setItems(2);
      } else {
        setItems(1);
      }

      setSectorData(getDefoultSectorData());

      // Update items when the component mounts
      updateItems();

      // Add the event listener
      window.addEventListener('resize', updateItems);


      localStorage.setItem('sectorData', JSON.stringify(sectorData));


      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('resize', updateItems);
      };
    }
  }, [room, sectorData]);

  useEffect(() => {
    const fetchPlayers = async (room) => {
      const response = await fetch(`/api/game/getallplayers?room=${room}`);
      const data = await response.json();
      setPlayers(JSON.parse(data.players));
    }

    // Then set up the interval
    const intervalId = setInterval(fetchPlayers(room), 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  const next = () => {
    setSelected((selected + 1) % 12);
  }

  const prev = () => {
    setSelected((selected + 11) % 12);
  }

  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col className="d-flex justify-content-center">
          <Button>
            Spring: {players && players.spring.moves}
          </Button>
        </Col>
        {players && Object.keys(players.summer).length != 0 && <Col className="d-flex justify-content-center">
          <Button>
            Summer: {players && players.summer.moves}
          </Button>
        </Col>}
        {players && Object.keys(players.fall).length != 0 && <Col className="d-flex justify-content-center">
          <Button>
            fall: {players && players.fall.moves}
          </Button>
        </Col>}
        {players && Object.keys(players.winter).length != 0 && <Col className="d-flex justify-content-center">
          <Button>
            winter: {players && players.winter.moves}
          </Button>
        </Col>}
      </Row>
      <Row className="align-items-center">
        <Col xs="auto" className="d-flex justify-content-center">
          <Button className='btn btn-outline-light' onClick={prev}>&lt;</Button>{' '}
        </Col>
        {Array.from({ length: items }, (_, index) => (
          <Col key={index}>
            {sectorData && <Sector number={((selected + index) % 12)} data={sectorData} setData={(data) => { setSectorData(data) }} />}
          </Col>
        ))}
        <Col xs="auto" className="d-flex justify-content-center">
          <Button className='btn btn-outline-light' onClick={next}>&gt;</Button>{' '}
        </Col>
      </Row>
    </Container>
  );
};