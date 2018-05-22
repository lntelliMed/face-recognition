import React from 'react';

const faceRecognition = (props) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={props.imageUrl} alt="Image provided" width="500px" height="auto" />
      </div>
    </div>
  );
};

export default faceRecognition;
