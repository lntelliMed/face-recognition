import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

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

const app = new Clarifai.App({
  apiKey: 'b699b8e6745e42a29e956df7b4a9115d'
});

// Ssmple images:
// http://pngimg.com/uploads/face/face_PNG5641.png
// http://bc01.rp-online.de/polopoly_fs/1.6564102.1485510288!image/3412529908.jpg_gen/derivatives/d950x950/3412529908.jpg

class App extends Component {
  state = {
    input: 'http://pngimg.com/uploads/face/face_PNG5641.png',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  }

  componentDidMount () {
    this.onButtonSubmit();
    // fetch('http://localhost:3000/')
    //   .then(response => response.json())
    //   .then(console.log);
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({
      box
    });
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onButtonSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.error(err));
  }

  onRouteChange = (route) => {
    let isSignedIn = this.state.isSignedIn;

    if (route === 'signout') {
      isSignedIn = false;
    } else if (route === 'home') {
      isSignedIn = true;
    }

    this.setState({
      route,
      isSignedIn
    });
  }

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
                ? <div>
                    <Logo />
                    <Rank />
                    <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                    <FaceRecognition box={box} imageUrl={imageUrl} />
                  </div>
                : (
                    this.state.route === 'signin'
                          ? < Signin onRouteChange={this.onRouteChange} />
                          : < Register onRouteChange={this.onRouteChange} />

                  )
        }
      </div>
    );
  }
}

export default App;
