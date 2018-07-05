import React from "react";

import Socket from "./Socket";
import styled from "styled-components";

import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import RegisterForm from "./RegisterForm";

class ChatUI extends React.Component {
  render() {
    const {
      userNames,
      messages,
      setUser,
      submitMessage,
      isRegistered
    } = this.props;
    if (!isRegistered) {
      return (
        <Form>
          <RegisterForm setUser={setUser} />
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
          <MessageBox id="chat-messages" messages={messages} />
          <MessageForm
            submitMessage={submitMessage}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </Form>
      );
    }
  }
}

const Chat = () => (
  <Socket>
    {({ submitMessage, messages, setUser, userNames, isRegistered }) => (
      <ChatUI
        submitMessage={submitMessage}
        messages={messages}
        setUser={setUser}
        userNames={userNames}
        isRegistered={isRegistered}
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
