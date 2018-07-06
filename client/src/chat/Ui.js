import React from 'react';

import Socket from './Socket';
import styled from 'styled-components';

import MessageBox from './MessageBox';
import MessageForm from './MessageForm';
import RegisterForm from './RegisterForm';

export const ChatUI = ({
  usernames,
  messages,
  setUser,
  sendMessage,
  isRegistered
}) => {
  return (
    <Container>
      <Title>
        Chat <span role="img">💬</span>
      </Title>
      <Users>
        Paikalla:
        {usernames.map((username, index) => (
          <User key={index}>
            {username}
            {index === usernames.length - 1 ? '' : ', '}
          </User>
        ))}
      </Users>
      {isRegistered ? (
        <React.Fragment>
          <MessageBox id="chat-messages" messages={messages} />
          <MessageForm sendMessage={sendMessage} />
        </React.Fragment>
      ) : (
        <RegisterForm setUser={setUser} />
      )}
    </Container>
  );
};

ChatUI.defaultProps = {
  usernames: [],
  messages: [],
  isRegistered: false
};

const Chat = () => (
  <Socket>
    {({ sendMessage, messages, setUser, usernames, isRegistered }) => (
      <ChatUI
        sendMessage={sendMessage}
        messages={messages}
        setUser={setUser}
        usernames={usernames}
        isRegistered={isRegistered}
      />
    )}
  </Socket>
);

export default Chat;

const Container = styled.div`
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
