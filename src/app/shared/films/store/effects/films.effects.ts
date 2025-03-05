import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilmsApiActions } from '@mm/shared/films/actions';
import { RouterActions } from '@mm/shared/actions';

import { FilmsActions } from '../actions/films.actions';

export const searchFilms = createEffect(
  (actions$ = inject(Actions)): any =>
    actions$.pipe(
      ofType(FilmsActions.searchFilms),
      map(action =>
        FilmsApiActions.searchFilmsAction.action({
          payload: action,
        }),
      ),
    ),
  { functional: true },
);

export const goToSearchPage = createEffect(
  (action$ = inject(Actions)): any =>
    action$.pipe(
      ofType(FilmsActions.goToSearchPage),
      switchMap(action => {
        const queryParams = { name: action.name };

        return [
          RouterActions.navigateByUrl({
            url: '/search',
            skipLocalization: true,
            extras: { queryParams },
          }),
        ];
      }),
    ),
  { functional: true },
);
