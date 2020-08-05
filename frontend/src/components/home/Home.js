import React, { Component } from "react";
import Feed from "../feed/feed";
import SignUp from "../auth/SignUp";
import Login from "../auth/LogIn";
import GoogleAuth from "../auth/GoogleAuth";
import GoogleAuthLogin from "../auth/GoogleAuthLogin";

class Home extends Component {
  state = {};
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
              <div className="googleSignUp">
                {!this.state.email && (
                  <GoogleAuth setUser={this.props.setUser} />
                )}{" "}
                {!this.state.email && (
                  <GoogleAuthLogin setUser={this.props.setUser} />
                )}
              </div>
              <div className="login">
                <Login {...this.props} />
              </div>
              <div className="signup">
                <SignUp {...this.props} />
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
