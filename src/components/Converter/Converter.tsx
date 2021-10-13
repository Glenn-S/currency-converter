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
  if (isError) {
    return (
      <div className="container m-3 p-2">
        <p className="text-red-500">An error has occurred. Please try back later.</p>
      </div>
    );
  }

  // present warning if value was not a number
  const convertedValue = parseFloat(value);
  if (Number.isNaN(convertedValue) && value !== '')
    return (
      <p className="">Please insert a valid number</p>
    );

  return data === null ? (
    <div 
      data-testid="converter-spinner"
      className=" flex justify-center items-center"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900" />
    </div>
  ) : (
    <div
      data-testid="converter-component"
      className="m-3 py-2 px-4 bg-yellow-200 inline-block border-black border-2"
    >
      {value !== '' ? (data?.data[to] as number * convertedValue).toFixed(3).toString() : '-'}
    </div>
  );
};

export default Converter;