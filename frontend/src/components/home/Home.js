import React, { Component } from "react";
import Feed from "../feed/feed";
import SignUp from "../auth/SignUp";
import Login from "../auth/LogIn";

class Home extends Component {
  render() {
    console.log(this);
    return (
      <React.Fragment>
        <h2>HOME</h2>
        <br></br>
        <div>
          <h3>News Feed:</h3>
          {this.props?.user?.email ? (
            <Feed {...this.props} />
          ) : (
            <div>
              <Login />
              <SignUp />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
