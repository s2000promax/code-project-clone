import React from 'react';
import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/themeDecorator/ThemeDecorator';
import { Button, SizeButton, VariantButton } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const CLEAR = Template.bind({});
CLEAR.args = {
  children: 'Text',
  variant: VariantButton.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
  children: 'Text',
  variant: VariantButton.CLEAR_INVERTED,
};

export const OUTLINE = Template.bind({});
OUTLINE.args = {
  children: 'Text',
  variant: VariantButton.OUTLINE,
};
OUTLINE.decorators = [ThemeDecorator(Theme.DARK)];

export const Background = Template.bind({});
Background.args = {
  children: 'Text',
  variant: VariantButton.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  children: 'Text',
  variant: VariantButton.BACKGROUND_INVERTED,
};

export const Square = Template.bind({});
Square.args = {
  children: '>',
  variant: VariantButton.BACKGROUND_INVERTED,
  square: true,
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
  children: '>',
  variant: VariantButton.BACKGROUND_INVERTED,
  square: true,
  size: SizeButton.M,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '>',
  variant: VariantButton.BACKGROUND_INVERTED,
  square: true,
  size: SizeButton.L,
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
  children: '>',
  variant: VariantButton.BACKGROUND_INVERTED,
  square: true,
  size: SizeButton.XL,
};

export const OutlineSizeM = Template.bind({});
OutlineSizeM.args = {
  children: 'Text',
  variant: VariantButton.OUTLINE,
  size: SizeButton.M,
};

export const OutlineSizeL = Template.bind({});
OutlineSizeL.args = {
  children: 'Text',
  variant: VariantButton.OUTLINE,
  size: SizeButton.L,
};

export const OutlineSizeXL = Template.bind({});
OutlineSizeXL.args = {
  children: 'Text',
  variant: VariantButton.OUTLINE,
  size: SizeButton.XL,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Text',
  variant: VariantButton.OUTLINE,
  disabled: true,
};
