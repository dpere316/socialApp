import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import Home from "./components/home/Home";
import NotFound from "./components/404/NotFound.js";
import SignUp from "./components/auth/SignUp";
import Music from "./components/Music";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/profile/Profile";
import actions from "./services/index";
import GoogleAuth from "./components/auth/GoogleAuth";
import GoogleAuthLogin from "./components/auth/GoogleAuthLogin";
import Status from "./components/profile/status/status";
import Users from "./components/profile/friends/users";
import Feed from "./components/feed/feed";
import Messaging from "./components/messaging/messaging";
import "./styles/app.css";
class App extends Component {
  state = { hello: "world" };

  async componentDidMount() {
    let user = await actions.isLoggedIn();
    this.setState({ ...user.data });
    // console.log("coolest");
  }

  setUser = (user) => this.setState(user);

  logOut = async () => {
    let res = await actions.logOut();
    this.setUser({ email: null, createdAt: null, updatedAt: null, _id: null }); //FIX
  };

  render() {
    return (
      <BrowserRouter>
        <nav>
          <div className="nav-email">{this.state.email}</div>
          <div className="nav-links">
            <NavLink to="/">|Home|</NavLink>

            {this.state.email ? (
              <Fragment>
                <NavLink onClick={this.logOut} to="/">
                  |Log Out |
                </NavLink>
                <NavLink to="/Music">|Music|</NavLink>
                <NavLink to="/profile">|Profile|</NavLink>
              </Fragment>
            ) : (
              <Fragment>
                <NavLink to="/sign-up">|Sign Up|</NavLink>
                <NavLink to="/log-in">|Log In|</NavLink>
              </Fragment>
            )}
          </div>
        </nav>
        <h1>Social Space</h1>
        <div className="googleSignUp">
          {!this.state.email && <GoogleAuth setUser={this.setUser} />}{" "}
          {!this.state.email && <GoogleAuthLogin setUser={this.setUser} />}
        </div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} user={this.state} />}
          />
          <Route
            exact
            path="/sign-up"
            render={(props) => <SignUp {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/log-in"
            render={(props) => <LogIn {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/Music"
            render={(props) => <Music {...props} setUser={this.setUser} />}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (
              <Profile {...props} user={this.state} setUser={this.setUser} />
            )}
          />
          <Route
            path="/profile/:id"
            render={(props) => (
              <Profile {...props} user={this.state} setUser={this.setUser} />
            )}
          />

          <Route
            exact
            path="/feed"
            render={(props) => <Feed {...props} user={this.state} hey="sup" />}
          />
          <Route
            exact
            path="/messaging"
            render={(props) => <Messaging {...props} user={this.state} />}
          />
          <Route
            exact
            path="/status"
            render={(props) => <Status {...props} user={this.state} />}
          />
          <Route
            exact
            path="/users"
            render={(props) => <Users {...props} user={this.state} />}
          />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default App;
