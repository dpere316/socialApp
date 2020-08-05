import React, { Component } from "react";
import actions from "../services/index";
import { Link } from "react-router-dom";
import Talk from "talkjs";

class OtherProfile extends Component {
  state = { user: {}, users: [], currentUser: [] };
  async componentDidMount() {
    actions.getOtherProfile(this.props.match.params.id).then((res) => {
      console.log(res);
      this.setState({
        user: res.data.user,
      });
    });
    let response = await actions.findUsers(this.state);
    let curr = await actions.isLoggedIn(this.state);
    // console.log("find friends",res)
    // console.log(curr)
    this.setState({
      users: response.data.users,
      currentUser: curr.data,
    });
  }
  displayFriends = () => {
    return this.state?.user?.friends?.map((eachUser) => {
      console.log(eachUser);
      return (
        <div className="friend">
          {eachUser.firstname} {eachUser.lastname}
          <Link to={`/profile/${eachUser._id}`}>
            <img src={eachUser.image} />
          </Link>
        </div>
      );
    });
  };

  removeFriend = async (friend) => {
    let res = await actions.removeFriend(friend);
    // console.log(res)
  };
  handleClick(userId) {
    /* Retrieve the two users that will participate in the conversation */
    const currentUser = this.state.currentUser;
    const user = this.state.users?.find((user) => user._id === userId);
    // console.log(currentUser);
    // console.log(user);
    // console.log(userId);

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

        // console.log("Me", me);
        // console.log("Other", other);
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

  render() {
    let styles = this.state?.user?.styles;
    console.log(styles, this);
    return (
      <body style={styles?.body}>
        <div className="profile">
          <header style={styles?.header}>
            <h1>
              Welcome to {this.state?.user?.firstname}{" "}
              {this.state?.user?.lastname}'s profile!!!{" "}
            </h1>
            <h1></h1>
          </header>
          <section className="image-container" style={styles?.section}>
            <img src={this.state?.user?.image}></img>
            <button onClick={(userId) => this.handleClick()}>Message</button>
            <button onClick={() => this.removeFriend()}>Remove Friend</button>
            <div className="status">{this.state?.user?.status}</div>
          </section>
          <div className="song-div">
            <audio
              className="songs"
              src={this.state?.user?.song}
              controls
            ></audio>
          </div>
          <h1>{this.state?.user?.firstname}'s Friends</h1>
          {<div className="friends-container">{this.displayFriends()}</div>}
        </div>
      </body>
    );
  }
}

export default OtherProfile;
