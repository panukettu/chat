import React from 'react';
import App from './App';

import { render } from 'react-testing-library';

it('app renders without crashing', () => {
  render(<App />);
});
