import React from 'react';
import { CurrencyEnum } from '../../../utils/types';
import Converter from '../Converter';
import { render, screen } from '@testing-library/react';
import * as converterHooks from '../currencyConverterHooks';
import { mockData } from '../utils';

describe('render Converter component', () => {
  test('null data should show loading spinner', async () => {
    jest.spyOn(converterHooks, 'useCurrencyConverter').mockReturnValue({
      data: null,
      isError: false,
      convertCurrency: jest.fn()
    });
    render(<Converter value='' from={CurrencyEnum.CAD} to={CurrencyEnum.USD} />);
    expect(await screen.findByTestId('converter-spinner')).toBeInTheDocument();
  });

  test('error flag set should show error message', async () => {
    jest.spyOn(converterHooks, 'useCurrencyConverter').mockReturnValue({
      data: null,
      isError: true,
      convertCurrency: jest.fn()
    });
    render(<Converter value='' from={CurrencyEnum.CAD} to={CurrencyEnum.USD} />);
    expect(await screen.findByText('An error has occurred. Please try back later.')).toBeInTheDocument();
  });
  
  test('valid payload should show main component', async () => {
    jest.spyOn(converterHooks, 'useCurrencyConverter').mockReturnValue({
      data: {
        query: {
          base_currency: 'CAD',
          timestamp: Date.now()
        },
        data: mockData
      },
      isError: false,
      convertCurrency: jest.fn()
    });
    render(<Converter value='' from={CurrencyEnum.CAD} to={CurrencyEnum.USD} />);
    expect(await screen.findByTestId('converter-component')).toBeInTheDocument();
  });
});

describe('Converter', () => {
  test('valid value should be converted', async () => {
    jest.spyOn(converterHooks, 'useCurrencyConverter').mockReturnValue({
      data: {
        query: {
          base_currency: 'CAD',
          timestamp: Date.now()
        },
        data: mockData
      },
      isError: false,
      convertCurrency: jest.fn()
    });
    render(<Converter value='1' from={CurrencyEnum.CAD} to={CurrencyEnum.USD} />);

    const element = await screen.findByTestId('converter-component');
    expect(element.textContent).toBe('0.803');
  });

  test('empty value should not be converted', async () => {
    jest.spyOn(converterHooks, 'useCurrencyConverter').mockReturnValue({
      data: {
        query: {
          base_currency: 'CAD',
          timestamp: Date.now()
        },
        data: mockData
      },
      isError: false,
      convertCurrency: jest.fn()
    });
    render(<Converter value='' from={CurrencyEnum.CAD} to={CurrencyEnum.USD} />);

    const element = await screen.findByTestId('converter-component');
    expect(element.textContent).toBe('-');
  });

  test('non-numeric value should return error message', async () => {
    jest.spyOn(converterHooks, 'useCurrencyConverter').mockReturnValue({
      data: {
        query: {
          base_currency: 'CAD',
          timestamp: Date.now()
        },
        data: mockData
      },
      isError: false,
      convertCurrency: jest.fn()
    });
    render(<Converter value='not valid' from={CurrencyEnum.CAD} to={CurrencyEnum.USD} />);

    expect(await screen.findByText('Please insert a valid number')).toBeInTheDocument();
  });
});
