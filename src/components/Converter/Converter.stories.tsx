import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Converter from './Converter';
import { CurrencyEnum } from '../../utils/types';

export default {
  title: 'Converter',
  component: Converter,
  argTypes: {
    value: { control: 'text' }, 
    from: { control: 'select' },
    to: { control: 'select' }
  }
} as ComponentMeta<typeof Converter>;

const Template: ComponentStory<typeof Converter> = (args) => <Converter {...args} />;

export const Valid = Template.bind({});
Valid.args = {
  value: '1.23',
  from: CurrencyEnum.CAD,
  to: CurrencyEnum.USD
};