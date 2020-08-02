import React, { Component } from "react";
import actions from '../../../services'

class status extends Component {
  state ={
    status: this.props.user?.status,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    let res = await actions.updateStatus(this.state);
    console.log(res);
    this.setState({
      status:res.data.status.content
    })
    console.log(this.state.status)
  };
  
  render() {
    return (
      <div>
         <h3>{this.state.status}</h3>
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
