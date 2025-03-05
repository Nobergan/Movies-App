import { inject } from '@angular/core';

import { switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@mm/shared/services';
import { FavouriteApiActions } from '@mm/shared/favourites/actions';
import { FilmsApiActions } from '@mm/shared/films/actions';

import { MediaActions } from '../actions';

export const loadMediaPage = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(MediaActions.opened),
      switchMap(action => {
        const userLocalId = localStorageService.get('userLocalId');

        return [
          FilmsApiActions.genresAction.action({
            payload: { mediaType: action.mediaType },
          }),
          FilmsApiActions.popularFilmsAction.action({
            payload: { mediaType: action.mediaType },
          }),
          FilmsApiActions.topFilmsAction.action({
            payload: { mediaType: action.mediaType },
          }),
          FavouriteApiActions.getFavouriteFilmsAction.action({
            payload: {
              userLocalId: userLocalId,
            },
          }),
        ];
      }),
    ),
  { functional: true },
);

export const closedMediaPage = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MediaActions.closed),
      switchMap(() => [
        FilmsApiActions.genresAction.clearAction(),
        FilmsApiActions.popularFilmsAction.clearAction(),
        FavouriteApiActions.addFavouriteFilmAction.clearAction(),
        FavouriteApiActions.getFavouriteFilmsAction.clearAction(),
        FilmsApiActions.topFilmsAction.clearAction(),
      ]),
    ),
  { functional: true },
);
