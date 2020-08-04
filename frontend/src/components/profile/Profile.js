import React, { Component } from "react";
import Status from "./status/status";
import actions from "../../services/index";
import Axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  state = {
    styles: {
      header: {
        background: "white",
        fontSize: "",
      },

      body: {
        background: "white",
        color: "",
        fontSize: "",
      },
      section: {
        background: "",
        color: "",
        fontSize: "",
      },
    },

    show: false,
    image:
      "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    selectedFile: null,
    friends: [],
    song:''
  };

  async componentDidMount() {
    console.log(this);
     actions.getProfile(this.state).then(
    // Axios.get(`http://localhost:5000/profile`, { withCredentials: true }).then(
      (res) => {
        console.log(res.data.user.styles, res.data);
        let styles = [...res.data.user.styles];
        if (styles[styles.length]?.styles) {
          this.setState({
            styles: styles[styles.length]?.styles,
            
          });
        }
        this.setState({
          song:res.data.user.song
        })
      });

    let me = await actions.getFriends();
    // console.log(me)
    this.setState({
      friends: me.data.users.friends,
    });
    console.log("My Friends", this.state.friends);
  }

  pickColor = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };

  saveStyles = (e) => {
    console.log("save style");
    // console.log(e.target.name);
    // console.log(e.target.value);
    let styles = JSON.parse(e.target.value);
    this.setState({
      styles,
    });
  };

  submitStyles = () => {
    Axios.post(`http://localhost:5000/profile`, this.state.styles, {
      withCredentials: true,
    }).then((res) => {
      // console.log(res);
    });
  };
  uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("upload", files[0]);
    let response = await actions.changeProfilePic(data);
    // console.log(response);
    this.props.setUser(response.data);
  };

  displayFriends = () => {
    return this.state.friends.map((eachUser) => {
      return (
        <div className="friend">
          {eachUser.firstname} {eachUser.lastname}
          <Link to={`/profile/${eachUser._id}`}>
            <img src={eachUser.image} />
          </Link>
        </div>
      );
    });
  };

  render() {
    console.log(this)
    if (!this.props.user.email) {
      this.props.history.push("/log-in");
    }
    let styles = this.state.styles;
    console.log(styles, this);
    return (
      <body style={styles?.body}>
        <div className="profile">
          {this.state.show ? (
            <div>
              <style>.practice</style>
              <div className="practice">RGB Color Codes</div>
              <input
                type="color"
                onChange={this.pickColor}
                placeholder="color"
              />
              <div>
                <textarea className="styles-text" onChange={this.saveStyles}>
                  {JSON.stringify(styles)}
                </textarea>
                <br></br>
                <button className="styles-btn" onClick={this.submitStyles}>
                  Save
                </button>
                <br></br>
                <h4>Saved Themes:</h4>
                <div className="themes">
                  {this.props.user.styles?.map((theme) =>
                    theme.styles ? (
                      <textarea>{JSON.stringify(theme.styles)}</textarea>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          ) : null}
          <button
            className="showStyles"
            onClick={() => {
              this.setState({ show: !this.state.show });
            }}
          >
            {this.state.show ? "Hide" : "Show"} StylesBox
          </button>

          <header style={styles?.header}>
            <h1>Welcome {this.props.user.firstname} !!! </h1>
          </header>
          <section className="image-container" style={styles?.section}>
            <img src={this.props.user.image}></img>
            <input
              type="file"
              placeholder="Change Profile Pic"
              name="file"
              onChange={this.uploadImage}
            />

            <div className="status">
              <Status user={this.props.user} />
            </div>
          </section>
          <div className="song-div">
            <audio
              className="songs"
              src={this.state.song}
              controls
            ></audio>
          </div>
          <div className="profile-links">
            <Link to="/feed">Feed</Link>
            <Link to="/messaging">Inbox</Link>
            <Link to="/users">Users</Link>
          </div>
          <h1>My Friends</h1>
          <div className="friends-container">{this.displayFriends()}</div>
        </div>
      </body>
    );
  }
}

export default Profile;
