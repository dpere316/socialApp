import React, { Component } from "react";

class Contact extends Component {
  render() {
    return (
      <div>
        <h2>Contact Us</h2>
        <br></br>
        <div className="ricky">
          <img alt="ricky" src={require("../images/ricky.jpg")}></img>
          <p>
            Location: Los Angeles, CA<br></br>
            LinkedIn:{" "}
            <a href="linkedin.com/in/richard-toledo/">
              Richard Toledo/LinkedIn
            </a>
            <br></br>
            Github:{" "}
            <a href="https://github.com/Rickytoledo">Richard Toledo/Github</a>
          </p>
        </div>
        <div className="daniel">
          <p>
            Location: Miami, FL<br></br>
            LinkedIn:{" "}
            <a href="www.linkedin.com/in/dperez316">Daniel Perez/LinkedIn</a>
            <br></br>
            Github:{" "}
            <a href="https://github.com/dpere316">Daniel Perez/Github</a>
          </p>
          <img alt="daniel" src={require("../images/daniel.jpeg")}></img>
        </div>
      </div>
    );
  }
}

export default Contact;
