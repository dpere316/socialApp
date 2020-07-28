import React, { Component } from 'react';
import actions from '../../../services'

class friends extends Component {
    state={
        users:[]
    }
    async componentDidMount() {
    let res = await actions.findFriends(this.state)
    console.log(res)
    }

    displayUsers = () =>{
        return this.state.users.map((eachUser) => {
            return <div>
                <li>
                    {eachUser.firstname}
                </li>
            </div>
        })
    }

    render() {
        return (
            <div>
                {this.displayUsers()}
            </div>
        );
    }
}

export default friends;