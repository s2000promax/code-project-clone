import React from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ModalWindow } from '..';
import { ThemeDecorator } from '@/shared/config/storybook/themeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/ModalWindow',
  component: ModalWindow,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ModalWindow>;

const Template: ComponentStory<typeof ModalWindow> = (args) => (
  <ModalWindow {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dicta laboriosam maiores maxime minima minus praesentium, quo similique tempora ullam?',
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children:
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dicta laboriosam maiores maxime minima minus praesentium, quo similique tempora ullam?',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
