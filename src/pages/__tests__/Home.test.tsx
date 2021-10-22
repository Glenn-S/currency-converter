import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

test('should render component', () => {
  render(<Home />);
  expect(screen.getByTestId('home-component')).toBeInTheDocument();
});

// TODO add more tests