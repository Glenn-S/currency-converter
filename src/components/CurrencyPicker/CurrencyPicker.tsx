import React, { ChangeEvent, FC } from 'react';
import { CurrencyEnum } from '../../utils/types';

export type CurrencyPickerProps = {
  label: string
  name: string
  value: CurrencyEnum
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

const CurrencyPicker : FC<CurrencyPickerProps> = ({ label, name, value, onChange }) => {

  return (
    <div className="">
      <label>{label}: </label>
      <select name={name} id={`${name}Id`} value={value} onChange={onChange}>
        {Object.values(CurrencyEnum).map(currency => <option key={currency} value={currency}>{currency}</option>)}
      </select>

    </div>
  );
};

export default CurrencyPicker;