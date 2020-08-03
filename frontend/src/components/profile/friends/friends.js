import React, { Component } from "react";
import actions from "../../../services";
import Talk from "talkjs";

class friends extends Component {
  state = {
    users: [],
    currentUser: [],
  };

  async componentDidMount() {
    // console.log("line12",this.state)
    let res = await actions.findUsers(this.state);
    let curr = await actions.isLoggedIn(this.state);
    // console.log("find friends",res)
    // console.log(curr)
    this.setState({
      users: res.data.users,
      currentUser: curr.data,
    });
  }

  displayUsers = () => {
    return this.state.users.map((eachUser) => {
      // console.log(eachUser)
      return (
        <div>
          <li>
            {eachUser.firstname}
            <button onClick={() => this.addFriend(eachUser)}>Add Friend</button>
            <button onClick={() => this.removeFriend(eachUser)}>
              Remove Friend
            </button>
            <button onClick={(userId) => this.handleClick(eachUser._id)}>
              Message
            </button>
          </li>
        </div>
      );
    });
  };

  handleClick(userId) {
    /* Retrieve the two users that will participate in the conversation */
    const currentUser = this.state.currentUser;
    const user = this.state.users.find((user) => user._id === userId);
    console.log(currentUser);
    console.log(user);
    console.log(userId);

    /* Session initialization code */
    Talk.ready
      .then(() => {
        /* Create the two users that will participate in the conversation */
        const me = new Talk.User({
          ...currentUser,
          name: currentUser.firstname + " " + currentUser.lastname,
          id: currentUser._id,
        });
        const other = new Talk.User({
          ...user,
          name: user.firstname + " " + user.lastname,
          id: user._id,
        });

        console.log("Me", me);
        console.log("Other", other);
        /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
        if (!window.talkSession) {
          window.talkSession = new Talk.Session({
            appId: "tpbeZF6h",
            me: me,
          });
        }

        /* Get a conversation ID or create one */
        const conversationId = Talk.oneOnOneId(me, other);
        const conversation = window.talkSession.getOrCreateConversation(
          conversationId
        );

        /* Set participants of the conversations */
        conversation.setParticipant(me);
        conversation.setParticipant(other);

        /* Create and mount chatbox in container */
        this.chatbox = window.talkSession.createChatbox(conversation);
        this.chatbox.mount(this.container);
      })
      .catch((e) => console.error(e));
  }

  addFriend = async (friend) => {
    let res = await actions.addFriend(friend);
    // console.log(res)
  };

  removeFriend = async (friend) => {
    let res = await actions.removeFriend(friend);
    // console.log(res)
  };

  render() {
    return (
      <div>
        {this.displayUsers()}
        <div className="chatbox-container" ref={(c) => (this.container = c)}>
          <div id="talkjs-container" style={{ height: "600px" }}>
            <i></i>
          </div>
        </div>
      </div>
    );
  }
}
export default friends;
