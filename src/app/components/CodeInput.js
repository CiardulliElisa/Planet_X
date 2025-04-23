'use client'

import React, { useRef } from 'react';
import './styles.css'

export default function CodeInput({ onCodeChange }) {

  const inputs = useRef([]);

  const handleInput = (e) => {
    e.target.value = e.target.value.toUpperCase();
    onCodeChange(inputs.current.map(input => input.value).join(''));
  }

  const handleKeyDown = (e, index) => {

    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputs.current[index - 1].focus();
    }
    else if (/^[a-zA-Z0-9]$/.test(e.key) && e.target.value !== '' && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row align-items-center'>
        <div className='col mx-auto'>
          <p className='page-text'>
            Please enter the code to join the game:
          </p>
          <div className="form-row">
            {Array(4).fill(0).map((_, index) => (
              <input
                key={index}
                type="text"
                className="form-control d-inline-block input-cell"
                placeholder='X'
                maxLength={1}
                required
                onKeyDown={(e) => handleKeyDown(e, index)}
                onInput={(e) => handleInput(e)}
                ref={el => inputs.current[index] = el}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}