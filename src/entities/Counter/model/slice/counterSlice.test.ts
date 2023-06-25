import { counterReducer, counterActions } from './counterSlice';
import { CounterSchema } from '../type/counterSchema';

describe('counterSlice', () => {
  test('should work with empty state', () => {
    expect(counterReducer(undefined, counterActions.increment())).toEqual({
      value: 1,
    });
  });

  test('should return state for increment', () => {
    const state: CounterSchema = {
      value: 10,
    };
    expect(
      counterReducer(state as CounterSchema, counterActions.increment()),
    ).toEqual({ value: 11 });
  });

  test('should return state for decrement', () => {
    const state: CounterSchema = {
      value: 10,
    };
    expect(
      counterReducer(state as CounterSchema, counterActions.decrement()),
    ).toEqual({ value: 9 });
  });
});
