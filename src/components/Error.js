import React from 'react';
import error from '../components/images/error.jpg';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '1em',backgroundColor:"black", width:"100%",height:"100vh" }}>
      <img src={error} alt="Error" style={{ backgroundColor: 'black', maxWidth: '35%' }} />
      <h1>Please Login</h1>
      <button
        onClick={handleClick}
        style={{ padding: '10px', fontSize: '16px', marginTop: '10px', cursor: 'pointer' }}
      >
        SIGN IN
      </button>
    </div>
  );
}

export default Error;
