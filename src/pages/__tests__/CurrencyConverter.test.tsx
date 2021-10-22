import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockData } from '../../components/Converter/utils';
import CurrencyConverter from '../CurrencyConverter';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { CurrencyEnum } from '../../utils/types';

describe('CurrencyConverter valid request', () => {
  const server = setupServer(
    rest.get("*/latest", (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          query: {
            base_currency: CurrencyEnum.CAD,
            timestamp: Date.now()
          },
          data: mockData
        })
      )
    })
  );

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test('should render component', () => {
    render(<CurrencyConverter />);
    expect(screen.getByTestId('app-component')).toBeInTheDocument();
  });

  test('updating `from` currency should change currency value', async () => {
    render(<CurrencyConverter/>);

    const selectFromInput = screen.getAllByTestId('currency-picker-selector').find(x => x.id == 'fromValueId') as Element;
    fireEvent.change(selectFromInput, { target: { value: CurrencyEnum.CAD }});
    
    expect(await screen.findByTestId('converter-spinner')).toBeInTheDocument();

    const converterComponent = await screen.findByTestId('converter-component');
    expect(converterComponent).toBeInTheDocument();
    expect(converterComponent.textContent).not.toBeNull();
    expect(converterComponent.textContent).toBe("0.803");
  });

  test('updating `to` currency should change currency value', async () => {
    render(<CurrencyConverter/>);

    const selectToInput = screen.getAllByTestId('currency-picker-selector').find(x => x.id == 'toValueId') as Element;
    fireEvent.change(selectToInput, { target: { value: CurrencyEnum.AED }});

    expect(await screen.findByTestId('converter-spinner')).toBeInTheDocument();

    const converterComponent = await screen.findByTestId('converter-component');
    expect(converterComponent).toBeInTheDocument();
    expect(converterComponent.textContent).not.toBeNull();
    expect(converterComponent.textContent).toBe("2.948");
  });

  test('updating `input` field should change currency value', async () => {
    render(<CurrencyConverter/>);

    const inputComponent = screen.getByTestId("currency-input");
    fireEvent.change(inputComponent, { target: { value: "2.89" }});

    expect(await screen.findByTestId('converter-spinner')).toBeInTheDocument();

    const converterComponent = await screen.findByTestId('converter-component');
    expect(converterComponent).toBeInTheDocument();
    expect(converterComponent.textContent).not.toBeNull();
    expect(converterComponent.textContent).toBe("2.320");
  });
});

describe('CurrencyConverter invalid request', () => {
  const server = setupServer(
    rest.get("*/latest", (req, res, ctx) => {
      return res(ctx.status(500))
    })
  );

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test('updating `input` with non-numeric value should render currency warning component', async () => {
    render(<CurrencyConverter/>);

    const inputComponent = screen.getByTestId("currency-input");
    fireEvent.change(inputComponent, { target: { value: "invalid" }});

    const errorComponent = await screen.findByText('Please insert a valid number');
    expect(errorComponent).toBeInTheDocument();
  });

  test('server error should render error component', async () => {
    render(<CurrencyConverter/>);

    const inputComponent = screen.getByTestId("currency-input");
    fireEvent.change(inputComponent, { target: { value: "1.43" }});

    expect(await screen.findByTestId('converter-spinner')).toBeInTheDocument();
    expect(await screen.findByText('An error has occurred. Please try back later.')).toBeInTheDocument();
  });
});