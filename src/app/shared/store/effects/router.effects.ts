import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { RouterActions } from '@mm/shared/actions';

export const navigate = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(RouterActions.navigate),
      tap(({ url, extras = {} }) => {
        router.navigate([url], extras);
      }),
    ),
  {
    functional: true,
    dispatch: false,
  },
);

export const navigateByUrl = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) =>
    actions$.pipe(
      ofType(RouterActions.navigateByUrl),
      tap(({ url, skipLocalization, extras }) => {
        router
          .navigateByUrl('/', {
            skipLocationChange: skipLocalization,
          })
          .then(() => {
            router.navigate([url], extras);
          });
      }),
    ),
  {
    functional: true,
    dispatch: false,
  },
);
