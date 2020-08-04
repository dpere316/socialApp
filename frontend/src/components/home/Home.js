import React, { Component } from "react";
import Feed from "../feed/feed";
import SignUp from "../auth/SignUp";
import Login from "../auth/LogIn";

class Home extends Component {
  render() {
    console.log(this);
    return (
      <React.Fragment>
        <br></br>
        <div>
          {this.props?.user?.email ? (
            <Feed {...this.props} />
          ) : (
            <div className="home-container">
              <div className="login">
                <Login />
              </div>
              <div className="signup">
                <SignUp />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
