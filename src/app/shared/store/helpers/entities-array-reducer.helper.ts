import { createReducer, on } from '@ngrx/store';

import { AsyncActionGroup, SucceededAction } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEntitiesArrayReducer = <T>(action: AsyncActionGroup<any, T[]>) => {
  return createReducer<T[]>(
    [],
    on(action.succeededAction, (state, action: SucceededAction<T[]>): T[] => action.payload),
    on(action.clearAction, (): T[] => []),
  );
};
