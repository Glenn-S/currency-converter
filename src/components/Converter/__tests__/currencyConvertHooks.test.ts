import { AxiosResponse } from 'axios';
import { CurrencyEnum, CurrencyPayload } from '../../../utils/types';
import * as request from '../currencyConverterApi';
import { renderHook } from '@testing-library/react-hooks';
import { useCurrencyConverter } from '../currencyConverterHooks';
import { act } from '@testing-library/react-hooks';

const setupMock = (
  baseValue: CurrencyEnum = CurrencyEnum.CAD, 
  currency: CurrencyEnum = CurrencyEnum.USD, 
  value: number = 0.76) => 
{
  return jest.spyOn(request, 'getConversion').mockResolvedValue({
    data: {
      query: {
        base_currency: baseValue.toString(),
        timestamp: Date.now()
      },
      data: { [`${currency.toString()}`]: value }
    },
    status: 200
  } as AxiosResponse<CurrencyPayload>);
};

const setupMockInstance = (statusCode: number) => {
  return jest.spyOn(request, 'getConversion').mockImplementation((params) => {
    return Promise.resolve({
      data: {
        query: {
          base_currency: params.base_currency,
          timestamp: Date.now()
        },
        data: { ['USD']: 0.76 }
      },
      status: statusCode
    } as AxiosResponse<CurrencyPayload>);
  });
};

describe('useCurrencyConverter', () => {
  test('is not rendered on initialization', async () => {
    const mock = setupMock();

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
    const mock = setupMockInstance(200);

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
    const mock = setupMockInstance(200);

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
    const mock = setupMock(CurrencyEnum.USD, CurrencyEnum.CAD, 1.34);

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
    const mock = setupMockInstance(status_code)

    const { result } = renderHook(useCurrencyConverter);
    
    await act(async () => {
      result.current?.convertCurrency(CurrencyEnum.USD);
    });

    expect(mock).toBeCalledTimes(1);
    expect(result.current).not.toBeNull();
    expect(result.current.isError).toBe(true);
  });
});