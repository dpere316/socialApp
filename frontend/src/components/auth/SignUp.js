import React, { Component, Fragment } from "react";
import actions from "../../services/index";
import { Link } from "react-router-dom";

class SignUp extends Component {
  state = {};
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    let user = { ...this.state };
    user.name = user.firstname + " " + user.lastname;
    e.preventDefault();
    actions
      .signUp(user)
      .then((user) => {
        this.props.setUser({ ...user.data });
        this.props.history.push("/profile")
      })
      .catch(( response ) => console.error(response));
  };
  render() {
    return (
      <Fragment>
        <h2>Sign Up For Free!</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={this.handleChange}
          />
          <br></br>
          <input
            name="password"
            type="password"
            placeHolder="Password"
            onChange={this.handleChange}
          />
          <br></br>

          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            onChange={this.handleChange}
          />
          <br></br>
          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            onChange={this.handleChange}
          />
          <br></br>

          <input id="submit-btn" type="submit" value="Sign Up" />
        </form>
      </Fragment>
    );
  }
}

export default SignUp;
