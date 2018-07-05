import React from "react";

import Socket from "./Socket";
import styled from "styled-components";

class ChatUI extends React.Component {
  state = {
    message: "",
    nickname: "",
    isRegistered: false
  };

  handleChange = e => {
    let change = {};
    change[e.target.name] = e.target.value;
    console.log(change);
    this.setState(change);
  };

  handleKeyPress = e => {
    if (e.key === "Enter" && this.state.message.trim() !== "") {
      e.preventDefault();
      this.props.submitMessage(this.state.message, this.state.nickname);
      this.setState({ message: "" });
    }
  };

  render() {
    const { userNames, messages, setUser, submitMessage } = this.props;
    if (!this.state.isRegistered) {
      return (
        <Form>
          <input
            name="nickname"
            type="text"
            value={this.state.nickName}
            onChange={this.handleChange}
          />
          <button
            type="button"
            onClick={() => {
              setUser(this.state.nickname);
              this.setState({ isRegistered: true });
            }}
          >
            Nimimerkki
          </button>
        </Form>
      );
    } else {
      return (
        <Form>
          <Title>
            Chat <span role="img">💬</span>
          </Title>
          <Users>
            Kaaleet:
            {userNames.map((name, index) => (
              <User>
                {" "}
                {name}
                {index === userNames.length - 1 ? "" : ", "}
              </User>
            ))}
          </Users>
          <Messages>
            {messages.map(msg => (
              <Comment>
                <CommentTimeStamp>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </CommentTimeStamp>
                <CommentSender>{msg.sender}</CommentSender>
                <CommentContent>{msg.message}</CommentContent>
              </Comment>
            ))}
          </Messages>
          <Submit>
            <FullWidthTextArea
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              name="message"
            />
            <button
              type="button"
              onClick={() => {
                submitMessage(this.state.message, this.state.nickname);
                this.setState({ value: "" });
              }}
            >
              Send
            </button>
          </Submit>
        </Form>
      );
    }
  }
}

const Chat = () => (
  <Socket>
    {({ submitMessage, messages, setUser, userNames }) => (
      <ChatUI
        submitMessage={submitMessage}
        messages={messages}
        setUser={setUser}
        userNames={userNames}
      />
    )}
  </Socket>
);

export default Chat;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Users = styled.div`
  margin: 15px;
  text-align: left;
  font-weight: italic;
`;

const User = styled.span`
  font-weight: bold;
`;

const Title = styled.h2`
  flex: 0.075;
  justify-content: center;
`;

const Messages = styled.section`
  height: 70vh;
  background-color: white;
  overflow-y: scroll;
`;

const Submit = styled.footer`
  flex: 0.075;
  margin: 10px;
`;

const Comment = styled.div`
  width: 100%;
  text-align: left;
  word-wrap: break-word;
`;

const CommentTimeStamp = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`;
const CommentContent = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`;
const CommentSender = styled.span`
  margin-left: 5px;
  margin-right: 5px;
  font-weight: bold;
  background: red;
  background: -webkit-linear-gradient(
    left,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  );
  background: -o-linear-gradient(
    right,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  );
  background: -moz-linear-gradient(
    right,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  );
  background: linear-gradient(
    to right,
    orange,
    yellow,
    green,
    cyan,
    blue,
    violet
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FullWidthTextArea = styled.textarea`
  width: 100%;
`;
