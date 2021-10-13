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
    <div data-testid="app-component" className="container m-4">
      <CurrencyPicker 
        label="From"
        name="fromValue" 
        value={fromValue} 
        onChange={onChangeFromValue}
      />
      <CurrencyPicker
        label="To"
        name="toValue"
        value={toValue}
        onChange={onChangeToValue}
      />
      <input
        className="border-black border-2"
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