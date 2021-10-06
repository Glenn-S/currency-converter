import React, { FC, ReactElement } from 'react';
import { CurrencyEnum } from '../../utils/types';
import { useCurrencyConverter } from './currencyConverterHooks';

export type ConverterProps = {
  value: string, 
  from: CurrencyEnum,
  to: CurrencyEnum
};

const Converter : FC<ConverterProps> = ({ value, from, to }) : ReactElement => {
  const converter = useCurrencyConverter(from);

  // console.log(converter?.data[to], value);


  return converter?.data === undefined ? (
    <div className=" flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <div className="m-3 py-2 px-4 bg-yellow-200 inline-block border-black border-2">
      {value !== '' ? parseFloat((converter?.data[to] as number * parseFloat(value)).toFixed(3)) : '-'}
    </div>
  );
};

export default Converter;