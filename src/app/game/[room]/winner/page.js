import { Col, Container, Row } from "react-bootstrap";

export default function Page() {

  const [players, setPlayers] = useState(null);

  const fetchPlayers = async (room) => {
    const response = await fetch(`/api/game/getallplayers?room=${room}`);
    const data = await response.json();
    setPlayers(JSON.parse(data.players));
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Winners</h1>
        </Col>
      </Row>
      <Row>
        {players && <Col>
          {players.spring && <h2>Spring: {players.spring.moves}</h2>}
          {players.summer && <h2>Summer: {players.summer.moves}</h2>}
          {players.fall && <h2>Fall: {players.fall.moves}</h2>}
          {players.winter && <h2>Winter: {players.winter.moves}</h2>}
        </Col>}
      </Row>
    </Container>
  )

}