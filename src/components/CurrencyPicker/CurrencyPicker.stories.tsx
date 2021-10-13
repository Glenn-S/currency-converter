import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import CurrencyPicker from './CurrencyPicker';
import { CurrencyEnum } from '../../utils/types';

export default {
  title: 'CurrencyPicker',
  component: CurrencyPicker,
  argTypes: {
    label: { control: '' },
    name: { control: '' },
    value: { control: '' }
  }
} as ComponentMeta<typeof CurrencyPicker>;

const Template: ComponentStory<typeof CurrencyPicker> = (args) => {
  
  return (<CurrencyPicker {...args} onChange={(e) => { e; }} />);
};

export const Valid = Template.bind({});
Valid.args = {
  label: 'To:',
  name: 'to',
  value: CurrencyEnum.CAD
};