import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { AppError, AsyncActionGroup } from '../models';
import { TypedAction } from './typed-action.helper';

/**
 * Create action with no props
 * @param source
 */
export const createAsyncActionNoProps = <ActionResponse>(source: string): AsyncActionGroup<void, ActionResponse> => {
  return createActionGroup({
    source: <any>`API: ${source}`,
    events: {
      action: emptyProps(),
      succeededAction: props<{
        payload: ActionResponse;
      }>(),
      failedAction: props<{
        error: AppError;
        initiator?: void & TypedAction<string>;
      }>(),
      clearAction: emptyProps(),
    },
  });
};

/**
 * Create Action with props
 * @param source
 */
export const createAsyncAction = <ActionPayload, ActionResponse = void>(
  source: string,
): AsyncActionGroup<{ payload: ActionPayload }, ActionResponse> => {
  return createActionGroup({
    source: <any>`API: ${source}`,
    events: {
      action: props<{ payload: ActionPayload }>(),
      succeededAction: props<{
        payload: ActionResponse;
      }>(),
      failedAction: props<{
        error: AppError;
        initiator?: { payload: ActionPayload } & TypedAction<string>;
      }>(),
      clearAction: emptyProps(),
    },
  });
};
