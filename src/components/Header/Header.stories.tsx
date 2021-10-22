import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './Header';

export default {
  title: 'Header',
  component: Header,
  argTypes: {}
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => 
  (<Header {...args}>
    <div>Home</div>
    <div>Currency Converter</div>
    <div>Historical Data</div>
  </Header>);

export const Valid = Template.bind({});