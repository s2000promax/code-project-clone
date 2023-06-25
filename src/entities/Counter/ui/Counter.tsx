import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/uiKit/Button';
import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

interface CounterProps {
  className?: string;
}

export const Counter = ({ className }: CounterProps) => {
  const dispatch = useDispatch();
  const counterValue = useCounterValue();
  const { t } = useTranslation();
  const { increment, decrement, add } = useCounterActions();

  const handleIncrement = () => {
    // dispatch(counterActions.increment());
    increment();
  };

  const handleDecrement = () => {
    // dispatch(counterActions.decrement());
    decrement();
    add(5);
  };
  return (
    <div>
      <h1 data-testid="value-title">{counterValue}</h1>
      <Button
        onClick={handleIncrement}
        data-testid="increment-btn"
      >
        {t('increment')}
      </Button>
      <Button
        onClick={handleDecrement}
        data-testid="decrement-btn"
      >
        {t('decrement')}
      </Button>
    </div>
  );
};
