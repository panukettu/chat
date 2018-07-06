import { ChatUI } from './Ui';
import React from 'react';
import { render, fireEvent } from 'react-testing-library';

it('chat renders', () => {
  const { getByText } = render(<ChatUI />);
  expect(getByText('Chat')).toBeInTheDOM();
});

it('chat nickname shows up in list', () => {
  const usernames = ['Esa'];
  const { getByText } = render(<ChatUI usernames={usernames} />);
  expect(getByText('Esa')).toBeInTheDOM();
});

test('chat user cant see messages if not registered', () => {
  const message = 'hello';
  const messages = [
    {
      timestamp: new Date(),
      sender: 'Tester',
      message: message
    }
  ];

  const { queryByTestId } = render(
    <ChatUI messages={messages} isRegistered={false} />
  );

  expect(queryByTestId('comment')).toBeNull();
});

test('chat user sees messages if registered', () => {
  const message = 'hello';
  const messages = [
    {
      timestamp: new Date(),
      sender: 'Tester',
      message: message
    }
  ];

  const { getByText } = render(
    <ChatUI messages={messages} isRegistered={true} />
  );

  expect(getByText(message)).toBeInTheDOM();
});
