import React, { Component } from "react";
import Status from "./status/status";
import Friends from "../profile/friends/friends";
import actions from "../../services/index";
import Axios from "axios";

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
    },
    image:
      "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    selectedFile: null,
  };

  componentDidMount() {
    console.log(this);
    Axios.get(`http://localhost:5000/profile`, { withCredentials: true }).then(
      (res) => {
        console.log(res.data);
        this.setState({
          styles: res.data.user.styles.pop().styles,
        });
      }
    );
  }

  pickColor = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
  };

  saveStyles = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    let styles = JSON.parse(e.target.value);
    this.setState({
      styles,
    });
  };

  submitImage = () => {
    Axios.post(`/api/uploadfile`, this.state.image, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
  };

  submitStyles = () => {
    Axios.post(`http://localhost:5000/profile`, this.state.styles, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
  };
  uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("upload", files[0]);
    let response = await actions.changeProfilePic(data);
    console.log(response);
    this.setState({
      image: response.data.image,
    });
  };

  render() {
    console.log(this);
    if (!this.props.user.email) {
      this.props.history.push("/log-in");
    }
    let styles = this.state.styles;
    return (
      <body style={styles?.body}>
        <div className="profile">
          <style>.practice</style>
          <header style={styles?.header}>Hello World</header>
          <div className="practice">RGB Color Codes</div>
          <input type="color" onChange={this.pickColor} placeholder="color" />
          <div>
            <img src={this.state.image}></img>
            <input type="file" name="file" onChange={this.uploadImage} />
            <button onClick={this.submitImage}>Upload</button>
          </div>
          <textarea onChange={this.saveStyles}>
            {JSON.stringify(styles)}
          </textarea>
          <button onClick={this.submitStyles}>Save</button>
          <h1>Welcome {this.props.user.firstname} !!! </h1>
          <Status user={this.props.user} />
          <br />
          <section>Hello I am.....</section>
          <Friends />
        </div>
      </body>
    );
  }
}

export default Profile;
