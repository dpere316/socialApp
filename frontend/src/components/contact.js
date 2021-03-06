import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <br></br>
        <h2>Contact Us</h2>
        <br></br>
        <div className="ricky">
          <img alt="ricky" src={require("../images/ricky.jpg")}></img>
          <p>
            Location: Los Angeles, CA<br></br>
            <br></br>
            LinkedIn:{" "}
            <a target="_blank" href="https://linkedin.com/in/richard-toledo/">
              Richard Toledo/LinkedIn
            </a>
            <br></br>
            Github:{" "}
            <a target="_blank" href="https://github.com/Rickytoledo">
              Richard Toledo/Github
            </a>
          </p>
        </div>
        <div className="daniel">
          <p>
            Location: Miami, FL<br></br>
            <br></br>
            LinkedIn:{" "}
            <a target="_blank" href="https://linkedin.com/in/dperez316">
              Daniel Perez/LinkedIn
            </a>
            <br></br>
            Github:{" "}
            <a target="_blank" href="https://github.com/dpere316">
              Daniel Perez/Github
            </a>
          </p>
          <img alt="daniel" src={require("../images/daniel.jpeg")}></img>
        </div>
      </div>
    );
  }
}

export default Contact;
