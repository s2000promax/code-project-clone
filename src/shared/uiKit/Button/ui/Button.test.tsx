import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '..';
import { VariantButton } from './Button';

describe('Buttons', () => {
  test('Test render', () => {
    render(<Button>TEST</Button>);
    expect(screen.getByText('TEST')).toBeInTheDocument();
  });

  test('Test variant Button CLEAR', () => {
    render(<Button variant={VariantButton.CLEAR}>TEST</Button>);
    expect(screen.getByText('TEST')).toHaveClass('clear');
    screen.debug();
  });
});
