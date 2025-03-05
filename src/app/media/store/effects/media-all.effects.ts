import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@mm/shared/services';
import { switchMap } from 'rxjs';
import { FilmsApiActions } from '@mm/shared/films/actions';
import { map } from 'rxjs/operators';

import { MediaAllActions } from '../actions/media-all.actions';

export const handleOpened = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(MediaAllActions.opened),
      switchMap(action => [
        FilmsApiActions.discoveryFilmsAction.action({
          payload: {
            page: action.page,
            filters: action.filters,
            mediaType: action.mediaType,
            moviePage: action.moviePage,
            route: action.route,
          },
        }),
      ]),
    ),
  { functional: true },
);

export const handleClosed = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MediaAllActions.closed),
      switchMap(() => [FilmsApiActions.discoveryFilmsAction.clearAction()]),
    ),
  { functional: true },
);

export const loadDiscoveryFilms = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MediaAllActions.discoveryFilms),
      map(({ payload }) =>
        FilmsApiActions.discoveryFilmsAction.action({
          payload: {
            page: payload.page,
            filters: payload.filters,
            mediaType: payload.mediaType,
            moviePage: payload.moviePage,
            route: payload.route,
          },
        }),
      ),
    ),
  { functional: true },
);
