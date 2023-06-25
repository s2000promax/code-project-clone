import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { Reducer } from '@reduxjs/toolkit';
import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from '@/app/providers/StoreProvider/config/StateSchema';

export type ReducersList = {
  // [keyName in StateSchemaKey]?: Reducer<NonNullable<StateSchema[keyName]>>;
  [keyName in StateSchemaKey]?: Reducer<NonNullable<StateSchema[keyName]>>;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: ReactNode;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
  const { children, reducers, removeAfterUnmount = true } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    Object.entries(reducers).forEach(([keyName, reducer]) => {
      const mounted = mountedReducers[keyName as StateSchemaKey];
      if (!mounted) {
        store.reducerManager.add(keyName as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${keyName} reducer` });
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([keyName, reducer]) => {
          store.reducerManager.remove(keyName as StateSchemaKey);
          dispatch({ type: `@DESTROY ${keyName} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};
