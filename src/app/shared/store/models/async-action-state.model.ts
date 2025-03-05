import { AppError } from './app-error.model';

/**
 * State model representing the meta information about an async action
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AsyncActionState<R = any> {
  /**
   * Indicates whether action is in progress
   */
  inProgress: boolean;

  /**
   * Indicates whether action is finished
   */
  finished: boolean;

  /**
   * Indicates whether action is succeeded
   */
  succeeded: boolean;

  /**
   * Holds action result
   */
  result: R | null;

  /**
   * Holds action error
   */
  error: AppError | null;
}
