import React from "react";
import io from "socket.io-client";
var socket = io();

export default class Socket extends React.Component {
  state = {
    messages: [],
    userNames: []
  };

  componentDidMount() {
    socket.on("chat message", msg => {
      const messages = [...this.state.messages];
      messages.push(msg);
      this.setState({ messages });
    });
    socket.on("new connection", msg => {
      const messages = [...this.state.messages];
      messages.push(msg);
      this.setState({ messages });
    });
    socket.on("usernames", userNames => {
      this.setState({ userNames });
    });
  }

  sendMessage = (value, nickName) => {
    socket.emit("chat message", { value, nickName });
  };

  setUser = value => {
    console.log("Creating new user:" + value);
    socket.emit("new user", value);
  };

  render() {
    return this.props.children({
      submitMessage: this.sendMessage,
      messages: this.state.messages,
      setUser: this.setUser,
      userNames: this.state.userNames
    });
  }
}
