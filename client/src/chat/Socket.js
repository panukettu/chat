import React from 'react';
import io from 'socket.io-client';
var socket = io();

export default class Socket extends React.Component {
  state = {
    messages: [],
    usernames: [],
    isRegistered: false,
    nickName: ''
  };

  componentDidMount() {
    socket.on('chat message', msg => {
      const messages = [...this.state.messages];
      messages.push(msg);
      this.setState({ messages });
      updateScroll();
    });

    socket.on('usernames', usernames => {
      this.setState({ usernames });
    });

    socket.on('registered', result => this.setState({ isRegistered: result }));
  }

  sendMessage = value => {
    socket.emit('chat message', { value });
    const message = {
      timestamp: new Date(),
      sender: this.state.nickName,
      message: value
    };
    const messages = this.state.messages.concat(message);
    this.setState({ messages });
  };

  setUser = value => {
    const usernames = this.state.usernames.concat(value);
    this.setState({ usernames, nickName: value });
    socket.emit('new user', value);
  };

  render() {
    return this.props.children({
      sendMessage: this.sendMessage,
      messages: this.state.messages,
      setUser: this.setUser,
      usernames: this.state.usernames,
      isRegistered: this.state.isRegistered
    });
  }
}

function updateScroll() {
  var element = document.getElementById('chat-messages');
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}
