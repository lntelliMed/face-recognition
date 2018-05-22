import React from 'react';
import './FaceRecognition.css';

const faceRecognition = (props) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={props.imageUrl} alt="The provided URL" width="500px" height="auto" />
        <div className="bounding-box" style={{ top: props.box.topRow, right: props.box.rightCol, bottom: props.box.bottomRow, left: props.box.leftCol}} ></div>
      </div>
    </div>
  );
};

export default faceRecognition;
