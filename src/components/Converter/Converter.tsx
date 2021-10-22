import React, { FC, ReactElement, useEffect } from 'react';
import { CurrencyEnum } from '../../utils/types';
import { useCurrencyConverter } from './currencyConverterHooks';

export type ConverterProps = {
  value: string, 
  from: CurrencyEnum,
  to: CurrencyEnum
};

const Converter : FC<ConverterProps> = ({ value, from, to }) : ReactElement => {
  const { data, isError, convertCurrency } = useCurrencyConverter();
  
  useEffect(() => {
    convertCurrency(from);
  }, [from]);
  
  // present error screen if there is an api error
  if (isError)
    return (<p className="inline-block m-3 p-2">An error has occurred. Please try back later.</p>);

  // present warning if value was not a number
  const convertedValue = parseFloat(value);
  if (Number.isNaN(convertedValue) && value !== '')
    return (<p className="inline-block m-3 p-2 text-red-500">Please insert a valid number</p>);

  return data === null ? (
    <div 
      data-testid="converter-spinner"
      className="inline-block items-center px-3"
    >
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  ) : (
    <div
      data-testid="converter-component"
      className="m-3 py-2 px-4 bg-yellow-200 inline-block border-black border"
    >
      {value !== '' ? (data?.data[to] as number * convertedValue).toFixed(3).toString() : '-'}
    </div>
  );
};

export default Converter;