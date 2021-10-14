import React, { ChangeEvent, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CurrencyPicker from './CurrencyPicker';
import { CurrencyEnum } from '../../utils/types';

export default {
  title: 'CurrencyPicker',
  component: CurrencyPicker,
  argTypes: {
    label: { control: 'text' },
    value: { table: { disable: true } },
    name: { table: { disable: true } },
    onChange: { table: { disable: true } }
  }
} as ComponentMeta<typeof CurrencyPicker>;

const Template: ComponentStory<typeof CurrencyPicker> = (args) => {
  const [value, setValue] = useState(CurrencyEnum.USD);

  const onChangeValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value as CurrencyEnum);
  };

  return (<CurrencyPicker {...args} value={value} name="test" onChange={onChangeValue} />);
};

export const Normal = Template.bind({});
Normal.args = {
  label: 'To:'
};