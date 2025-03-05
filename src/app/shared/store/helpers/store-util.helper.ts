import { AsyncActionState } from '../models';

export const isAsyncActionCompleted = (action: AsyncActionState): boolean => {
  return action.finished && !action.inProgress;
};
