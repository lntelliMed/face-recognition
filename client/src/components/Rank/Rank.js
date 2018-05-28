import React from 'react';

const rank = (props) => {
  return (
    <div >
      <div className="white f3">
        {`${props.name} , your current entry count is...`}
      </div>

      <div className='white f1 '>
        {props.entries}
      </div>
    </div>
  );
};

export default rank;
