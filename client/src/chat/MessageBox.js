import React from 'react';
import styled from 'styled-components';

const Message = ({ message }) => (
  <MessageContainer data-testid="comment">
    <MessageTimeStamp>
      {new Date(message.timestamp).toLocaleTimeString()}
    </MessageTimeStamp>
    <MessageSender>{message.sender}</MessageSender>
    <MessageContent>{message.message}</MessageContent>
  </MessageContainer>
);

export default ({ messages }) => (
  <MessageBox>
    {messages.map((message, index) => (
      <Message key={index} message={message} />
    ))}
  </MessageBox>
);

const MessageBox = styled.section`
  height: 70vh;
  background-color: white;
  overflow-y: scroll;
`;

const MessageContainer = styled.div`
  width: 100%;
  text-align: left;
  word-wrap: break-word;
`;

const MessageTimeStamp = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`;
const MessageContent = styled.span`
  margin-left: 5px;
  margin-right: 5px;
`;
const MessageSender = styled.span`
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
