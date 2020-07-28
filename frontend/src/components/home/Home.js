import React, { Component } from "react";
import actions from "../../services/index";
import Axios from "axios";
class Home extends Component {
  state = {
    styles: {
      header: {
        backgroundColor: "",
      },
      ul: {
        backgroundColor: "",
      },
    },
  };

  componentDidMount() {
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
  submitStyles = () => {
    Axios.post(`http://localhost:5000/profile`, this.state.styles, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
    });
  };
  render() {
    let styles = this.state.styles;
    return (
      <div>
        <style>.practice</style>
        <header style={styles?.header}>Hello World</header>
        <input type="color" onChange={this.pickColor} placeholder="color" />
        <div className="practice">chacha</div>
        <ul style={styles?.ul}>
          {" "}
          <li>Lebron</li>
          <li>Dwayne</li>
          <li>Jordan</li>
        </ul>
        <textarea onChange={this.saveStyles}>{JSON.stringify(styles)}</textarea>
        <button onClick={this.submitStyles}>Save</button>
      </div>
    );
  }
}

export default Home;
