import React, { Component } from "react";

import Navigation from "../components/Navigation/Navigation";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank/Rank";
import Particles from "react-particles-js";

import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import "./App.css";


const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    line_linked: {
      shadow: {
        enable: true,
        color: "rgb(254, 254, 255)",
        blur: 1
      }
    }
  }
};
const intialState = {
  input: "",
  imageUrl: "",
  bbBox: [],
  model: "",
  route: "signIn",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};
class App extends Component {
  constructor() {
    super();
    this.state = intialState;
  }

  resetState = onRouteChange => {
    this.setState(intialState);
    onRouteChange("signout");
  };

  loadUser = userdata => {
    this.setState({
      user: {
        id: userdata.id,
        name: userdata.name,
        email: userdata.email,
        entries: userdata.entries,
        joined: userdata.joined
      }
    });
  };

  calculateFaceBox = respdata => {
    const bbBoxCoords =
      respdata.outputs[0].data.regions[0].region_info.bounding_box;
    const currentImage = document.getElementById("inputImage");
    const imgWidth = Number(currentImage.width);
    const imgHeight = Number(currentImage.height);

    return {
      leftColmn: bbBoxCoords.left_col * imgWidth,
      rightColmn: imgWidth - bbBoxCoords.right_col * imgWidth,
      topRow: bbBoxCoords.top_row * imgHeight,
      bottomRow: imgHeight - bbBoxCoords.bottom_row * imgHeight
    };
  };

  displaybbBox = bbBox => {
    this.setState({ bbBox: bbBox });
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true, route: "home" });
    }
    route === "signout"
      ? this.setState({ route: "signIn" })
      : this.setState({ route: route });

    // console.log(route);
  };

  onInputChange = e => {
    this.setState({ input: e.target.value });
  };

  onSelectChange = e => {
    this.setState({ model: e.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // Setting up for multiple models
    let newmodel = this.state.model;
    console.log(newmodel);

    fetch("http://localhost:3000/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response=> response.json())
      .then(response => {
        if (response) {
          console.log(
            response,
            +" " + response.outputs[0].data.regions[0].region_info.bounding_box
          );

          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displaybbBox(this.calculateFaceBox(response));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { isSignedIn, imageUrl, route, bbBox } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation
          resetState={this.resetState}
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />

        {route === "home" ? (
          <div>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              onSelectChange={this.onSelectChange}
            />
            <FaceRecognition bbBox={bbBox} imageUrl={imageUrl} />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
          </div>
        ) : this.state.route === "signIn" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
