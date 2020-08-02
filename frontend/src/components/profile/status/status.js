import React, { Component } from "react";
import actions from "../../../services";
import Axios from "axios";

class status extends Component {
  state = {
    theStatus: this.props.user?.status,
    status: this.props.user?.status,
  };
  handleChange = (e) => {
    this.setState({ status: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post(
      `http://localhost:5000/profile/status`,
      this.state.status,
      {
        withCredentials: true,
      }
    ).then((res) => {
      console.log(res);
    });
    console.log(this.state);
    let res = await actions.updateStatus(this.state);
    console.log(res);
    this.setState({
      theStatus: res.data.user.status,
    });
  };

  render() {
    return (
      <div>
        <h3>{this.state.theStatus}</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea
            onChange={this.handleChange}
            name="content"
            type="text"
            placeholder="Whats on your mind?"
          />
          <button>update</button>
        </form>
      </div>
    );
  }
}

export default status;
