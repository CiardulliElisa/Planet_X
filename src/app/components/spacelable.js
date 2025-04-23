'use client'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useEffect, useState } from 'react';

function Spacelable({ check, name, IconComponent, save }) {
  const [checked, setChecked] = useState('primary');

  useEffect(() => {
    setChecked(check ? 'outline-primary' : 'primary');
    save(name, checked == 'primary'? false : true);
  }, [check, checked, name, save]);


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {name}
    </Tooltip>
  );save(name, checked == 'primary'? false : true)

  return (
    <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button variant={checked} onClick={() => {setChecked(checked == 'primary'? 'outline-primary' : 'primary')}}>
        <IconComponent/>
      </Button>
    </OverlayTrigger>
  );
}

export default Spacelable;