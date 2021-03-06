import React from 'react';

import ProfileIcon from '../Profile/ProfileIcon';

const navigation = (props) => {
  if (props.isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
        <ProfileIcon onRouteChange={props.onRouteChange} toggleModal={props.toggleModal} />
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }} >
        <p onClick={() => props.onRouteChange('signin')} className="f3 link dim black underline pa3 pointer" >Sign In</p>
        <p onClick={() => props.onRouteChange('register')} className="f3 link dim black underline pa3 pointer" >Register</p>
      </nav>
    );
  }
};

export default navigation;
