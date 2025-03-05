import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { ToasterService, ToastType } from '@mm/shared/services';

import { ToastActions } from '../actions';

export const showToast = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToasterService)) =>
    actions$.pipe(
      ofType(ToastActions.showToast),
      tap((action: { message: string; toastType: ToastType }) => {
        toastService.showToast(action.message, action.toastType);
      }),
    ),
  {
    functional: true,
    dispatch: false,
  },
);

export const showAccruedToast = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToasterService)) =>
    actions$.pipe(
      ofType(ToastActions.showExtendedErrorToast),
      tap((action: { message: string }) => {
        toastService.showExtendedToast(action.message);
      }),
    ),
  {
    functional: true,
    dispatch: false,
  },
);
