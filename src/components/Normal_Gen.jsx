import React, { useState } from 'react';
import './Normal_Gen.css';

function Normal_Gen({ setPassword, password, onSwitch }) {
  const [length, setLength] = useState("12");
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
    const numChars = '0123456789';
    const symChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let charset = '';
    if (upper) charset += upperChars;
    if (lower) charset += lowerChars;
    if (numbers) charset += numChars;
    if (symbols) charset += symChars;

    if (!charset) {
      alert("Select at least one character type.");
      return;
    }

    let actualLength = parseInt(length);
    if (isNaN(actualLength) || actualLength < 4) actualLength = 4;
    if (actualLength > 32) actualLength = 32;

    let result = '';
    for (let i = 0; i < actualLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }

    setPassword(result);
  };

  const getStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
  
    if (score <= 2) return { label: 'Weak', color: 'red' };
    if (score === 3 || score === 4) return { label: 'Moderate', color: 'orange' };
    return { label: 'Strong', color: 'green' };
  };

  return (
    <div className="normal-container">
      <label style={{ fontSize: '1.25rem' }}>
        Length:
        <input
            type="number"
            value={length}
            maxLength={2}
            onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,2}$/.test(value)) {
                    setLength(value);
                }
            }}
        />
      </label>

      <label style={{ fontSize: '1.25rem' }}><input type="checkbox" checked={upper} onChange={() => setUpper(!upper)} /> Uppercase</label>
      <label style={{ fontSize: '1.25rem' }}><input type="checkbox" checked={lower} onChange={() => setLower(!lower)} /> Lowercase</label>
      <label style={{ fontSize: '1.25rem' }}><input type="checkbox" checked={numbers} onChange={() => setNumbers(!numbers)} /> Numbers</label>
      <label style={{ fontSize: '1.25rem' }}><input type="checkbox" checked={symbols} onChange={() => setSymbols(!symbols)} /> Symbols</label>
    
      <div className="btn-container">
        <button onClick={generate}>Generate Password</button>

        <button className="toggle-button" onClick={onSwitch}>
            Or Use AI Custom Password
        </button>
      </div>

      {password && (
        <div className="password-box">
          <strong>{password}</strong>
          <br />
          <button
            onClick={() => {
                navigator.clipboard.writeText(password);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            }}
          >
            Copy
          </button>
          {copied && (
                <div style={{ marginTop: '20px', color: '#4caf50', fontWeight: 'bold', fontSize: '1rem' }}>
                    Password copied to clipboard!
                </div>
          )}

          <div style={{ marginTop: '15px', fontWeight: 'bold', fontSize: '1.5rem' }}>
            Password Strength:{' '}
            <span style={{ color: getStrength(password).color }}>
                {getStrength(password).label}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}

export default Normal_Gen;