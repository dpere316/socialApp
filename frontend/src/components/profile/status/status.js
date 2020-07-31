import React, { Component } from "react";
import actions from '../../../services'

class status extends Component {
  state = {
    theStatus: this.props.user?.status,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
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
