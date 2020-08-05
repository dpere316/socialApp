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
    // console.log(props);
  }
<<<<<<< HEAD
  // displayImages =() =>{
  //   return this.props.user.friends.map((eachUser) =>{
  //     console.log("1",eachUser.image)
  //     return <image src={eachUser.image}></image>
  //   })
    
  // }
=======

  displayImages = () => {
    return this.props.user.friends.map((eachUser) => {
      console.log(eachUser.image);
      return <image src={eachUser.image}></image>;
    });
  };

>>>>>>> f4618bed1418ab9c2b9f0cbc4413a9e98e5b7fd6
  displayStatuses = () => {
    console.log(this.props.user.friends[0].image);
    return this.state.feed.map((eachUser) => {
      console.log(eachUser)
      if (eachUser.content != null)
        return (
          <div className="feed-box">
<<<<<<< HEAD
            <img src={eachUser.image}></img>
=======
            <div> {this.displayImages()}</div>
>>>>>>> f4618bed1418ab9c2b9f0cbc4413a9e98e5b7fd6
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
