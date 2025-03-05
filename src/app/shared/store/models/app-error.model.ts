import { HttpErrorResponse } from '@angular/common/http';

/**
 * App error interface
 */
export interface AppError {
  /**
   * Original http error
   */
  error?: HttpErrorResponse;

  /**
   * Error code
   */
  code?: string;
  /**
   * Error google auth message
   */

  toasterMessage?: string;

  /**
   * Api error message
   */
  message?: string;

  /**
   * Indicates which field causes error
   */
  field?: string;
}
