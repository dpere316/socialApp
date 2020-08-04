import React, { Component } from "react";
import actions from "../../services";

class feed extends Component {
  state = {
    feed: [],
    image: [],
  };

  async componentDidMount() {
    let res = await actions.retriveStatus(this.state);
    // console.log("Status",res)
    this.setState({
      feed: res.data,
    });
    console.log(this.state.feed);
  }
  componentWillReceiveProps(props) {
    console.log(props);
  }

  displayStatuses = () => {
    return this.state.feed.map((eachUser) => {
      if (eachUser.content != null)
        return (
          <div className="feed-box">
            {eachUser.firstname} {eachUser.lastname} : {eachUser.content}
          </div>
        );
    });
  };
  render() {
    console.log(this);
    return (
      <div>
        <h3>News Feed:</h3>
        <div className="feed-container">{this.displayStatuses()}</div>
      </div>
    );
  }
}

export default feed;
