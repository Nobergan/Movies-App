import { createReducer, on } from '@ngrx/store';
import { ActionReducer } from '@ngrx/store/src/models';

import { AsyncActionGroup, SucceededAction } from '../models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEntityReducer = <T>(action: AsyncActionGroup<any, T>, initialState: T = null): ActionReducer<T> => {
  return createReducer(
    // Should be "as any" for initial state because we can not deal with wierd "infer" of "on" function
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState as any,
    on(action.succeededAction, (state, action: SucceededAction<T>): T => action.payload),
    on(action.clearAction, (): T => initialState),
  );
};
