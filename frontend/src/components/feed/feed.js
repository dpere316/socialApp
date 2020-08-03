import React, { Component } from "react";
import actions from "../../services";

class feed extends Component {
  state = {
    feed: [],
  };

  async componentDidMount() {
    let res = await actions.retriveStatus(this.state);
    // console.log("Status",res)
    this.setState({
      feed: res.data,
    });
    console.log(this.state.feed);
  }

  displayStatuses = () => {
    return this.state.feed.map((eachUser) => {
      if (eachUser.content != null)
        return (
          <div>
            {eachUser.firstname} : {eachUser.content}
          </div>
        );
    });
  };
  render() {
    return <div>{this.displayStatuses()}</div>;
  }
}

export default feed;
