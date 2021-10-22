import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyEnum } from '../../../utils/types';
import CurrencyPicker from '../CurrencyPicker';

describe('CurrencyPicker', () => {
  test('renders without error', async () => {
    render(<CurrencyPicker label='To:' name='toValue' value={CurrencyEnum.CAD} onChange={jest.fn()} />);
    
    expect(screen.getByTestId('currency-picker-component')).toBeInTheDocument();
    expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
  });

  test('displays label value', () => {
    render(<CurrencyPicker label='To:' name='toValue' value={CurrencyEnum.CAD} onChange={jest.fn()} />);

    expect(screen.getByText(/To\:/)).toBeInTheDocument();
  });

  test('options should contain currency names', () => {
    render(<CurrencyPicker label='To:' name='toValue' value={CurrencyEnum.CAD} onChange={jest.fn()} />);

    expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
  });

  test('value should be updated', () => {
    const spy = jest.fn((_: CurrencyEnum) => {});
    const CurrencyPickerWrapper = () => {
      const [value, setValue] = useState(CurrencyEnum.CAD);
  
      return (<CurrencyPicker label='' name='' value={value} onChange={(e) => {
        setValue(e.target.value as CurrencyEnum);
        spy(e.target.value as CurrencyEnum);
      }} />);
    };
  
    render(<CurrencyPickerWrapper />);
  
    fireEvent.change(screen.getByTestId('currency-picker-selector'), { target: { value: CurrencyEnum.USD }});
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(CurrencyEnum.USD);
    expect((screen.getByTestId('currency-picker-selector') as HTMLSelectElement).value).toBe(CurrencyEnum.USD);
  });  
});

