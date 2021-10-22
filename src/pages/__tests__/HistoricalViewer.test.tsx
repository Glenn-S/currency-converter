import { render, screen } from '@testing-library/react';
import React from 'react';
import HistoricalViewer from '../HistoricalViewer';

test('should render component', () => {
  render(<HistoricalViewer/>);
  expect(screen.getByTestId('historical-view-component'));
});

// TODO add more tests