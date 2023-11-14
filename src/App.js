import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [initials, setInitials] = useState('');

  const handleInputChange = (event) => {
    setInitials(event.target.value);
  };

  const storeInitials = () => {
    fetch('http://127.0.0.1:8000/insert_initials', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ initials }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  const getInitials = () => {
    fetch('http://127.0.0.1:8000/get_initials')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    // Fetch initials when the component mounts
    getInitials();
  }, []);
  
    
  return (
    <>
      <div className="diagonal-section">
        <img src="/book.png" alt="Book Icon" className="MenuIcon" />
        <p style={{
          color: '#FFF',
          textAlign: 'center',
          fontFamily: 'Roboto',
          fontSize: '64px',
          fontStyle: 'normal',
          fontWeight: 800,
          lineHeight: '135%', /* 86.4px */
          letterSpacing: '-1.28px',
        }} className="mb-3">
          Enter Initials
        </p>
        <input
          type="text"
          placeholder="Initials Here"
          value={initials}
          onChange={handleInputChange}
          className="form-control mb-3 custom-input"
        />
        <button onClick={storeInitials} className="btn btn-primary custom-button">
          Enter
        </button>
      </div>
      <div className='Footer'>
        <p>ARCANA</p>
      </div>
    </>
  );
}

export default App;
