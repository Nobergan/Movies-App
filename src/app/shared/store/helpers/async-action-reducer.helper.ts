import { createReducer, on } from '@ngrx/store';

import {
  AsyncActionGroup,
  AsyncActionState,
  FailedAction,
  SucceededAction,
} from '../models';

const initialState: AsyncActionState = {
  inProgress: false,
  succeeded: false,
  finished: false,
  result: null,
  error: null,
};

export const createAsyncActionReducer = <ActionPayload, ActionResult>(
  action: AsyncActionGroup<ActionPayload, ActionResult>,
  storeResult = false,
) => {
  return createReducer(
    initialState,
    on(
      action.action,
      (): AsyncActionState<ActionResult> => ({
        ...initialState,
        inProgress: true,
      }),
    ),
    on(
      action.succeededAction,
      (
        state,
        action: SucceededAction<ActionResult>,
      ): AsyncActionState<ActionResult> => ({
        ...initialState,
        succeeded: true,
        finished: true,
        result: storeResult ? action.payload || null : null,
      }),
    ),
    on(
      action.failedAction,
      (
        state,
        action: FailedAction,
      ): AsyncActionState<ActionResult> => ({
        ...initialState,
        succeeded: false,
        finished: true,
        error: action.error || null,
      }),
    ),
    on(action.clearAction, (): AsyncActionState<ActionResult> => {
      return initialState;
    }),
  );
};
