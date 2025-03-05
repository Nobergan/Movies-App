import { createActionGroup, props } from '@ngrx/store';
import { AppError } from '../models';

const featureName = 'Error';

export const ErrorActions = createActionGroup({
  source: featureName,
  events: {
    /**
     * Action which is triggered after unexpected server error
     */
    unexpectedServerErrorHappened: props<{ error: AppError }>(),
  },
});
