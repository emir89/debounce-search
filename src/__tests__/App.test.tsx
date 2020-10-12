import React from 'react';
import { render } from '@testing-library/react';
import App from '../containers/App';

test('renders Loading when page loads', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});