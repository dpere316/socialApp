import React, { Component } from "react";
import Axios from 'axios'
import actions from '../../../services'
class status extends Component {

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    let res = await actions.updateStatus(this.state)
    console.log(res)
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            onChange={this.handleChange}
            name="status"
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
