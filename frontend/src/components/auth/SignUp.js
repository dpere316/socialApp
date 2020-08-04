import React, { Component, Fragment } from 'react';
import actions from '../../services/index'
import { Link } from "react-router-dom";

class SignUp extends Component {
    state = {

    } 
    handleChange = e => this.setState({[e.target.name]: e.target.value})

    handleSubmit =  e => {
        let user = {...this.state}
        user.name = user.firstname + ' ' + user.lastname 
        e.preventDefault()
            actions.signUp(user).then(user=> {
                this.props.setUser({...user.data})  
            }).catch(({ response }) => console.error(response.data));
    }
    
    render() {
        return (
            <Fragment>
                <h2>SignUP</h2>
                <form onSubmit={this.handleSubmit}>
                    <input name="email" type="email" placeholder="Email" onChange={this.handleChange} />
                    <input name="password" type="password" placeHolder="Password" onChange={this.handleChange} />
                    <br/>
                    <input name="firstname" type="text" placeholder="First Name" onChange={this.handleChange} />
                    <input name="lastname" type="text" placeholder="Last Name" onChange={this.handleChange} />
                    <br/>
                  <input type="submit" value="Sign Up"/> 
                </form>
            </Fragment>
        );
    }
}

export default SignUp;