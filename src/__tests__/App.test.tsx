import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App component without error', () => {
  render(<App/>);
  // expect(screen.getByTestId('app-component')).toBeInTheDocument();
});

// make a test to click on the header buttons and view the page changes
