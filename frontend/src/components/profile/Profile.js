import React from 'react';
import Status from './status/status'
import Friends from "../profile/friends/friends"
import {Link} from 'react-router-dom'

const Profile = (props) => {
    if(!props.user.email){ 
        props.history.push('/log-in') 
    }  
    console.log(props) 
    
    return (
        <div>
            <h1>Welcome {props.user.firstname} !!! </h1>
            <Link to='/feed'><h4>Feed</h4></Link>  
            <Status/>
            <br/>
            <section>Hello I am.....</section>
            <Link to='/messaging'><h4>Messages</h4></Link>
            <Friends/>
           
        </div>
    );
}

export default Profile;