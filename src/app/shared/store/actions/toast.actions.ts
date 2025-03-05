import { createActionGroup, props } from '@ngrx/store';
import { ToastType } from '@mm/shared/services';

const featureName = 'Toast';

export const ToastActions = createActionGroup({
  source: featureName,
  events: {
    showToast: props<{
      message: string;
      toastType: ToastType;
    }>(),
    showExtendedErrorToast: props<{
      message: string;
    }>(),
  },
});
