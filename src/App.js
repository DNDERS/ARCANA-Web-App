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

  
  const backgroundStyle = {
    backgroundColor: 'rgba(25, 25, 25, 1)',
    width: '100vw',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '5vmin',
    fontFamily: 'Roboto, sans-serif',
  };

  return (
    <div>
    <div className="App" style={backgroundStyle}>
      <div className="ContentWrapper">
        <img src="/book.png" alt="Book Icon" className="MenuIcon" />
        <p className="mb-3">Enter Initials</p>
        <input
          type="text"
          placeholder="Your Initials"
          value={initials}
          onChange={handleInputChange}
          className="form-control mb-3 custom-input"  // Add a custom class
        />
        <button onClick={storeInitials} className="btn btn-primary">
          Submit
        </button>
      </div>
      <div className='Footer'>
        <p>ARCANA</p>
      </div>
    </div>
    </div>
  );
}

export default App;
