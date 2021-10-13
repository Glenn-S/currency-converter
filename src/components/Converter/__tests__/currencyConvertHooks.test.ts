import { AxiosResponse } from 'axios';
import { CurrencyEnum, CurrencyPayload } from '../../../utils/types';
import * as request from '../currencyConverterApi';
import { renderHook } from '@testing-library/react-hooks';
import { useCurrencyConverter } from '../currencyConverterHooks';
import { act } from '@testing-library/react-hooks';

describe('useCurrencyConverter', () => {
  test('is not rendered on initialization', async () => {
    const mock = jest.spyOn(request, 'getConversion').mockResolvedValue({
      data: {
        query: {
          base_currency: 'CAD',
          timestamp: Date.now()
        },
        data: { ['USD']: 0.76 }
      },
      status: 200
    } as AxiosResponse<CurrencyPayload>);
    
    const { result } = renderHook(useCurrencyConverter);
    
    expect(mock).not.toHaveBeenCalled();
    expect(result.current.data).toBe(null);
    expect(result.current.isError).toBe(false);
  });

  test.each`
    base_value | expected
    ${CurrencyEnum.AED} | ${CurrencyEnum.AED}
    ${CurrencyEnum.CAD} | ${CurrencyEnum.CAD}
    ${CurrencyEnum.BDT} | ${CurrencyEnum.BDT}
  `('is called with base currency value', async ({ base_value, expected }) => {
    const mock = jest.spyOn(request, 'getConversion').mockImplementation((params) => {
      return Promise.resolve({
        data: {
          query: {
            base_currency: params.base_currency,
            timestamp: Date.now()
          },
          data: { ['USD']: 0.76 }
        },
        status: 200
      } as AxiosResponse<CurrencyPayload>);
    });

    const { result } = renderHook(useCurrencyConverter);
    
    await act(async () => {
      result.current?.convertCurrency(base_value);
    });

    expect(mock).toBeCalledTimes(1);
    expect(result.current).not.toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.data?.query.base_currency).toBe(expected);
    expect(result.current.data?.data['USD']).toBe(0.76);
  });

  test('no rerender should occur if base currency does not change', async () => {
    const mock = jest.spyOn(request, 'getConversion').mockImplementation((params) => {
      return Promise.resolve({
        data: {
          query: {
            base_currency: params.base_currency,
            timestamp: Date.now()
          },
          data: { ['USD']: 0.76 }
        },
        status: 200
      } as AxiosResponse<CurrencyPayload>);
    });

    const { result } = renderHook(useCurrencyConverter);
    
    await act(async () => {
      result.current?.convertCurrency(CurrencyEnum.USD);
    });

    expect(result.current.data?.query.base_currency).toBe(CurrencyEnum.USD);
    expect(mock).toBeCalledTimes(1);

    await act(async () => {
      result.current?.convertCurrency(CurrencyEnum.USD);
    });

    expect(result.current.data?.query.base_currency).toBe(CurrencyEnum.USD);
    expect(mock).not.toBeCalledTimes(2); // no rerender occured
  });

  test('base currency of USD returns 1', async () => {
    const mock = jest.spyOn(request, 'getConversion').mockResolvedValue({
      data: {
        query: {
          base_currency: CurrencyEnum.USD,
          timestamp: Date.now()
        },
        data: { ['CAD']: 1.34 } // The api does not return USD value if base currency is USD
      },
      status: 200
    } as AxiosResponse<CurrencyPayload>);

    const { result } = renderHook(useCurrencyConverter);
    
    await act(async () => {
      result.current?.convertCurrency(CurrencyEnum.USD);
    });

    expect(mock).toBeCalledTimes(1);
    expect(result.current).not.toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.data?.data['CAD']).toBe(1.34);
    expect(result.current.data?.query.base_currency).toBe(CurrencyEnum.USD);
    expect(result.current.data?.data['USD']).toBe(1);
  });

  test.each` status_code
  ${404}
  ${429}
  ${500}
  `('isError set on api error', async ({ status_code }) => {
    const mock = jest.spyOn(request, 'getConversion').mockImplementation((params) => {
      return Promise.resolve({ status: status_code } as AxiosResponse<CurrencyPayload>);
    });

    const { result } = renderHook(useCurrencyConverter);
    
    await act(async () => {
      result.current?.convertCurrency(CurrencyEnum.USD);
    });

    expect(mock).toBeCalledTimes(1);
    expect(result.current).not.toBeNull();
    expect(result.current.isError).toBe(true);
  });
});