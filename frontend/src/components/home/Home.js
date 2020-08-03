import React, { Component } from "react";
import Feed from "../feed/feed";
class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <h2>HOME</h2>
        <br></br>
        <div>
          <h3>News Feed:</h3>
          <Feed />
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
