import React from 'react';
import { CurrencyEnum } from '../../../utils/types';
import Converter from '../Converter';
import { render, screen } from '@testing-library/react';
import * as converterHooks from '../currencyConverterHooks';
import { mockData } from '../utils';

describe('renders component', () => {
  test('loading spinner', async () => {
    jest.spyOn(converterHooks, 'useCurrencyConverter').mockReturnValue({
      data: null,
      isError: false,
      convertCurrency: jest.fn()
    });
    render(<Converter value='' from={CurrencyEnum.CAD} to={CurrencyEnum.USD} />);
    expect(await screen.findByTestId('converter-spinner')).toBeInTheDocument();
  });

  test('error message', async () => {
    jest.spyOn(converterHooks, 'useCurrencyConverter').mockReturnValue({
      data: null,
      isError: true,
      convertCurrency: jest.fn()
    });
    render(<Converter value='' from={CurrencyEnum.CAD} to={CurrencyEnum.USD} />);
    expect(await screen.findByText('An error has occurred. Please try back later.')).toBeInTheDocument();
  });
  
  test('main component', async () => {
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

describe('valid value supplied', () => {
  test('should convert value', async () => {
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

  test('value is empty', async () => {
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
});

describe('invalid input value', () => {
  test('value is not a number', async () => {
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
