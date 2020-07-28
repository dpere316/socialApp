import React, { Component } from "react";
import actions from "../../services/index";

class Home extends Component {
  state = {
    styles: {
      header: {
        backgroundColor: "red",
      },
      ul: {
        backgroundColor: "yellow",
      },
    },
  };
  async componentDidMount() {
    let res = await actions.getStyles()
    console.log(res)
    this.setState({
      styles:res.data.styles
    })
  }

 pickColor = (e) => {
  console.log(e.target.name)
  console.log(e.target.value)
 } 

 saveStyles = (e) => {
  console.log(e.target.name)
  console.log(e.target.value)
  this.setState({
    styles:JSON.parse(e.target.value)
  })
 }

  render() {
    let styles = this.state.styles;
    return (
      <div>
        <style>.practice</style>
        <header style={styles.header}>Hello World</header>
        <input type = 'color' onChange = {this.pickColor} placeholder='color'/> 
        <div className="practice">chacha</div>
        <ul style={styles.ul}>
          {" "}
          <li>Lebron</li>
          <li>Dwayne</li>
          <li>Jordan</li>
        </ul>
        <textarea onChange ={this.saveStyles}>{JSON.stringify(styles)}</textarea>
        <button onClick = {this.saveStyles}>Save</button>
      </div>
    );
  }
}

export default Home;
