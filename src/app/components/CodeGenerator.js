'use client'

import { useState, useEffect } from 'react';
import './styles.css'

export default function CodeGenerator({ code }) {

  return (
    <div className='container-fluid text-center'>
      <div className='row align-items-center'>
        <div className='col mx-auto'>
          <p className='page-text'>Share this code with the other players:</p>
          <p className="square">{code}</p>
          <input type="hidden" value={code} />
        </div>
      </div>
    </div>
  );
}