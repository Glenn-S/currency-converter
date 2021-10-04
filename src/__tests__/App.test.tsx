import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App component without error', () => {
  render(<App/>);
  expect(screen.getByText('App')).toBeInTheDocument();
});