'use client'

import { Card } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import SpaIcon from '@mui/icons-material/Spa';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Spacelable from './spacelable';
import { CiCloud } from "react-icons/ci";
import { GiCometSpark, GiAsteroid } from "react-icons/gi";
import { FiTarget } from "react-icons/fi";
import { TbBrandPlanetscale } from "react-icons/tb";
import { MdCropFree } from "react-icons/md";

const checkTypeToIconAndColor = {
  planetX: { icon: FiTarget, color: 'blue' },
  void: { icon: MdCropFree, color: 'black' },
  cloud: { icon: CiCloud, color: 'gray' },
  dwarfplanet: { icon: TbBrandPlanetscale, color: 'brown' },
  asteroid: { icon: GiAsteroid, color: 'green' },
  comet: { icon: GiCometSpark, color: 'yellow' },
};


export default function Sector({ number, data, setData }) {

  const setChekced = (field, val) => {
    let dataCopy = data;
    dataCopy[number].checks[field] = val;
    setData(dataCopy);
  }

  const checks = data[number].checks

  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>{number + 1}</Card.Title>
        <ListGroup variant="list-group-flush">
          {data[number].players.length > 0 && (<ListGroup.Item>
            {data[number].players.map((player, index) => (
              player === 'spring' ? <SpaIcon key={player} style={{ color: 'pink' }} /> :
                player === 'fall' ? <ThunderstormIcon key={player} style={{ color: 'brown' }} /> :
                  player === 'winter' ? <AcUnitIcon key={player} style={{ color: 'white' }} /> :
                    player === 'summer' ? <Brightness7Icon key={player} style={{ color: 'yellow' }} /> :
                      null
            ))}
          </ListGroup.Item>)}
          <ListGroup.Item>
            {Object.entries(checks).map(([checkType, isChecked]) => {
                const IconComponent = checkTypeToIconAndColor[checkType].icon;
                const color = checkTypeToIconAndColor[checkType].color;
                return (
                  <Spacelable key={checkType} name={checkType} IconComponent={IconComponent} save={setChekced} />
                );
            })}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );

}