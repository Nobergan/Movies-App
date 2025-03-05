import { map, Observable, ObservableInput } from 'rxjs';
import { Action } from '@ngrx/store';

import { AsyncActionGroup } from '../models';
import { handleEffectError } from './effect-error.helper';

/**
 * Default implementation of async action effect
 * @param apiCall$ apiCall
 * @param asyncAction asyncAction
 * @param ignoreUnexpectedErrors (do not show unexpected error alert at all)
 */
export const createAsyncActionEffect = <ResponseType, ActionParams extends object | void>(
  apiCall$: Observable<ResponseType>,
  asyncAction: AsyncActionGroup<ActionParams, ResponseType>,
  initiator?: ActionParams & Action,
  ignoreUnexpectedErrors = false,
  expectedErrorCodes?: number[],
): ObservableInput<Action> => {
  return apiCall$.pipe(
    map((result: ResponseType) =>
      asyncAction.succeededAction({
        payload: result,
        initiator,
      }),
    ),
    handleEffectError<ActionParams & Action>(asyncAction.failedAction, initiator, ignoreUnexpectedErrors, expectedErrorCodes),
  );
};
