import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('should render component', () => {
  render(<Header />);
  expect(screen.getByRole('list')).toBeInTheDocument();
});

describe('Header', () => {
  test('should render children in list', () => {
    render(<Header>
      <div>item 1</div>
      <div>item 2</div>
      <div>item 3</div>
    </Header>);

    expect(screen.getAllByRole('listitem').length).toBe(3);
  });
});