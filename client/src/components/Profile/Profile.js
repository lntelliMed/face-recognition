import React from 'react';
import './Profile.css';

const profile =(props)=> {
  return (
    <div className="profile-modal">
      <button onClick={props.toggleModal} >Click</button>
    </div>
  );
}

export default profile;
