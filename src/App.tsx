import React, { ChangeEvent, ReactElement, useState } from 'react';
import Converter from './components/Converter/Converter';
import CurrencyPicker from './components/CurrencyPicker/CurrencyPicker';
import { CurrencyEnum } from './utils/types';

const App = () : ReactElement => {
  const [value, setValue] = useState('1');
  const [fromValue, setFromValue] = useState(CurrencyEnum.CAD);
  const [toValue, setToValue] = useState(CurrencyEnum.USD);

  const onChangeFromValue = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFromValue(event.target.value as CurrencyEnum);
  };

  const onChangeToValue = (event: ChangeEvent<HTMLSelectElement>): void => {
    setToValue(event.target.value as CurrencyEnum);
  };

  const onChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div 
      data-testid="app-component" 
      className="container my-4 mx-auto text-left"
    >
      <h1 className="text-3xl tracking-wide font-extralight pt-10">
        Currency Converter
      </h1>
      <p className="text-left py-4 leading-relaxed font-medium">
        This is a currency converter. To use please insert a currency that you would like to get a conversion for and the currency you would like to convert to.
      </p>
      <CurrencyPicker 
        label="From:"
        name="fromValue" 
        value={fromValue} 
        onChange={onChangeFromValue}
      />
      <CurrencyPicker
        label="To:"
        name="toValue"
        value={toValue}
        onChange={onChangeToValue}
      />
      <input
        className="border-black border-b p-2"
        type="text"
        name="currencyInput"
        id="currencyInput"
        value={value}
        onChange={onChangeValue}
      />
      <Converter 
        from={fromValue}
        to={toValue}
        value={value}
      />
    </div>
  );
};

export default App;