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

      {/* <div className="white f3">
        { 'Joe, your current rank is...' }
      </div>

      <div className="white f1">
        {'#5'}
      </div> */}

    </div>
  );
};

export default rank;
