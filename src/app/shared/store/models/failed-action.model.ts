import { Action } from '@ngrx/store';

import { AppError } from './app-error.model';

/**
 * An interface for failed async actions
 */
export interface FailedAction<Initiator extends Action = Action> {
  /**
   * Error caused fail
   */
  error: AppError;

  /**
   * An action which triggered an error
   */
  initiator?: Initiator;
}
