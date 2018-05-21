import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const logo = (props) => {
  return (
    <div className="ma4 m0t">
      <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa3">
          <img style={{paddingTop: '5px'}} src={brain} alt="Brain logo" />
        </div>
      </Tilt>
    </div>
  );
};

export default logo;
