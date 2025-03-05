import { Observable, UnaryFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Action } from '@ngrx/store';

import { AppError, AsyncActionGroup } from '../models';

import { ErrorActions } from './error.actions';

export function handleEffectError<Initiator extends Action = Action>(
  failAction: AsyncActionGroup<Initiator>['failedAction'],
  initiator: Initiator,
  ignoreUnexpectedErrors = false,
  expectedErrorCodes?: number[],
): UnaryFunction<Observable<Action>, Observable<Action | AsyncActionGroup<Initiator>['failedAction']>> {
  return catchError((err: AppError) => {
    const action = failAction({
      error: err,
      initiator,
    });

    // if (
    //   environment.isApiToasterDisabled ||
    //   ignoreUnexpectedErrors ||
    //   expectedErrorCodes?.includes(<number>err?.errorCode) ||
    //   expectedErrorCodes?.includes(err?.originalError?.status) ||
    //   err?.originalError?.status === HttpStatusCode.Unauthorized
    // ) {
    //   return [action];
    // }

    return [
      ErrorActions.unexpectedServerErrorHappened({
        error: err,
      }),
      action,
    ];
  });
}
