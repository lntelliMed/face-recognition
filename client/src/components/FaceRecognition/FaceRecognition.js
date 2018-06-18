import React from 'react';
import './FaceRecognition.css';

const faceRecognition = (props) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={props.imageUrl} alt="The provided URL" width="500px" height="auto" />
        {props.boxes.map(box =>
            <div className='bounding-box' key= {`box${box.topRow}${box.rightCol}`}
                style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
            </div>
         )}
      </div>
    </div>
  );
};

export default faceRecognition;
