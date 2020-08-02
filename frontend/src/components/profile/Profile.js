import React, { Component } from "react";
import Status from "./status/status";
import Friends from "../profile/friends/friends";
import actions from "../../services/index";
import Axios from "axios";
import {Link } from 'react-router-dom';

class Profile extends Component {
  state = {
    styles: {
      header: {
        background: "",
        fontSize: "",
      },

      body: {
        background: "",
        color: "",
        fontSize: "",
      },
      section: {
        background: "",
        color: "",
        fontSize: "",
      },
    },

    show: true,
    image:
      "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    selectedFile: null,
  };

  componentDidMount() {
    console.log(this);
    Axios.get(`http://localhost:5000/profile`, { withCredentials: true }).then(
      (res) => {
        console.log(res.data);
        if (res.data.user.styles.length) {
          this.setState({
            styles: res.data.user.styles.pop().styles,
          });
        }
      }
    );
  }

  pickColor = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };

  saveStyles = (e) => {
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

  render() {
    console.log(this.props.user.status);
    // console.log(this.props);
    if (!this.props.user.email) {
      this.props.history.push("/log-in");
    }
    let styles = this.state.styles;
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
                <textarea onChange={this.saveStyles}>
                  {JSON.stringify(styles)}
                </textarea>
                <button onClick={this.submitStyles}>Save</button>
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

          <section>Hello I am.....</section>
          <Friends />
          <Link to='/feed'>Feed</Link>
        </div>
      </body>
    );
  }
}

export default Profile;
