import React, { Component } from "react";
import actions from "../../services";
import { Link } from "react-router-dom";

class feed extends Component {
  state = {
    feed: [],
    image: [],
  };

  async componentDidMount() {
    let res = await actions.retriveStatus(this.state);
    console.log("Status", res);
    this.setState({
      feed: res.data,
    });
  }
  componentWillReceiveProps(props) {
    // console.log(props);
  }

  displayImages = () => {
    return this.props.user.friends.map((eachUser) => {
      console.log(eachUser.image);
      return <image src={eachUser.image}></image>;
    });
  };

  displayStatuses = () => {
    return this.state.feed.map((eachUser) => {
      console.log(eachUser);
      if (eachUser.content != null)
        return (
          <div className="feed-box">
            <div> {this.displayImages()}</div>
            <br></br>
            <Link to={`/profile/${eachUser.user._id}`}>
              <img src={eachUser.user.image}></img>
            </Link>
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
    // console.log(this);
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
