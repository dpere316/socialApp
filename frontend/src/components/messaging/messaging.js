import React, { Component, Fragment } from "react";
import Talk from "talkjs";
import actions from "../../services";

class messaging extends Component {
    state = {
        currentUser:[],
        inbox: undefined
    }

  async componentDidMount() {

    let curr = await actions.isLoggedIn(this.state);

    Talk.ready
      .then(() => {
        const me = new Talk.User({
            ...curr.data,
            name: curr.data.firstname + " " + curr.data.lastname,
            id: curr.data._id,
          });

        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tpbeZF6h",
            me: me,
          });
        }
        // console.log(window.talkSession)
        this.state.inbox = window.talkSession.createInbox();
        this.state.inbox.mount(this.container);
      })
      .catch((e) => console.error(e));

      this.setState({
        currentUser: curr.data
    })
  }
  

  render() {
    return (
      <div>
        <Fragment>
          <div
            style={{ height: "500px" }}
            className="inbox-container"
            ref={(c) => (this.container = c)}
          >
            Loading...
          </div>
        </Fragment>
      </div>
    );
  }
}

export default messaging;
