import React, { Component } from 'react';
import actions from '../../services'

class feed extends Component {

    state={
        feed:[]
    }

    async componentDidMount() {
    let res = await actions.retriveStatus(this.state)
    console.log("Status",res)
    this.setState({
        feed:res.data.feed
    }) 
    console.log(this.state.feed) 
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default feed;