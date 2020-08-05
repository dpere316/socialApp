import React, { Component } from "react";
import actions from "../../../services";
import Axios from "axios";

class status extends Component {
  state = {
    status: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    let res = await actions.userStatus(this.props.user._id);
    // console.log(res)
    this.setState({
      status: res.data.content,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    let res = await actions.updateStatus(this.state);
    // console.log(res);
    this.setState({
      status: res.data.status.content,
    });
    // console.log(this.state.status)
  };

  render() {
    // console.log(this.props)
    return (
      <div className="status-container">
        <h3>{this.state.status}</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea
            onChange={this.handleChange}
            name="content"
            type="text"
            placeholder="Whats on your mind?"
          />
          <button className="status-update">Update</button>
        </form>
      </div>
    );
  }
}

export default status;
