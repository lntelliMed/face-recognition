import React, { Component } from 'react';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
import './App.css';

const SERVER = process.env.SERVER || 'http://localhost:3000';
const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const initialState = {
  input: 'http://pngimg.com/uploads/face/face_PNG5641.png',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  state = initialState;

  componentDidMount () {
    this.onPictureSubmit();
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  calculateFaceLocations = (data) => {
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return data.outputs[0].data.regions.map(face => {
            const clarifaiFace = face.region_info.bounding_box;
            return {
                    leftCol: clarifaiFace.left_col * width,
                    topRow: clarifaiFace.top_row * height,
                    rightCol: width - (clarifaiFace.right_col * width),
                    bottomRow: height - (clarifaiFace.bottom_row * height)
            };
     });
  }

  displayFaceBoxes = (boxes) => {
    this.setState({
      boxes
    });
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onPictureSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });

      fetch(SERVER + '/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(SERVER + '/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState({
              user: {
                ...this.state.user,
                entries: count
              }
            });
          })
          .catch(console.log);
        }
        this.displayFaceBoxes(this.calculateFaceLocations(response));
      })
      .catch(err => console.error(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState);
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }

    this.setState({
      route
    });
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  }

  render() {
    const { isSignedIn, route, boxes, imageUrl, isProfileOpen } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}
            toggleModal={this.toggleModal} />
        { isProfileOpen &&
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} />
          </Modal>
        }
        {route === 'home'
                ? <div>
                    <Logo />
                    <Rank name={this.state.user.name} entries={this.state.user.entries} />
                    <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
                    <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
                  </div>
                : (
                    this.state.route === 'signin'
                          ? < Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                          : < Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />

                  )
        }
      </div>
    );
  }
}

export default App;
