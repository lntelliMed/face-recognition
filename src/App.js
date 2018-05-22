import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import Navigation from './components/Navigation/Navigation';
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
    imageUrl: 'http://pngimg.com/uploads/face/face_PNG5641.png'
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
      .then(
            function (response) {
              console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
            },
            function (err) {
              console.error(err);
            }
      );
  }

  render() {
    return (
      <div className="App">

        <Particles className="particles"
          params={particlesOptions}
        />

        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
