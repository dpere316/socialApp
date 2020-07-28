import React from 'react';
import Status from './status/status'
import Friends from "../profile/friends/friends"

const Profile = (props) => {
    if(!props.user.email){ 
        props.history.push('/log-in') 
    }  
    console.log(props) 
    
    return (
        <div>
            <h1>Welcome {props.user.firstname} !!! </h1>
            <Status/>
            <br/>
            <section>Hello I am.....</section>
            <Friends/>
           
        </div>
    );
}

export default Profile;