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

  displayImages = () => {
    return this.props.user.friends.map((eachUser) => {
      console.log(eachUser.image);
      return <image src={eachUser.image}></image>;
    });
  };

  displayStatuses = () => {
    console.log(this.props.user.friends[0].image);
    return this.state.feed.map((eachUser) => {
      if (eachUser.content != null)
        return (
          <div className="feed-box">
            <div> {this.displayImages()}</div>
            <br></br>
            <p>
              {eachUser.firstname} {eachUser.lastname} : <br></br>
              <br></br>
              {eachUser.content}
            </p>
          </div>
        );
    });
  };

  render() {
    console.log(this);
    return (
      <div>
        <h3>News Feed:</h3>
        <div className="feed-container">
          {this.displayImages()}
          {this.displayStatuses()}
        </div>
      </div>
    );
  }
}

export default feed;
