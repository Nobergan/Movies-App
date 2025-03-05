import { inject } from '@angular/core';

import { switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FilmsApiActions } from '@mm/shared/films/actions';
import { FavouriteApiActions } from '@mm/shared/favourites/actions';
import { LocalStorageService } from '@mm/shared/services';
import { FilmsType } from '@mm/shared/films/models';

import { HomeActions } from '../actions/home.actions';

export const loadHomePage = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(HomeActions.opened),
      switchMap(action => {
        const userLocalId = localStorageService.get('userLocalId');

        return [
          FilmsApiActions.genresFilmsAction.action({ payload: { mediaType: FilmsType.Movie } }),
          FilmsApiActions.genresTvAction.action({ payload: { mediaType: FilmsType.Tv } }),
          FilmsApiActions.trendAllFilmsAction.action(),
          FilmsApiActions.trendFilmsAction.action(),
          FilmsApiActions.trendTvAction.action(),
          FilmsApiActions.popularFilmsHomeListAction.action(),
          FilmsApiActions.popularTvHomeListAction.action(),
          FilmsApiActions.upcomingFilmsAction.action(),
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

export const handleClosedHomePage = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(HomeActions.closed),
      switchMap(() => [
        FilmsApiActions.genresFilmsAction.clearAction(),
        FilmsApiActions.genresTvAction.clearAction(),
        FilmsApiActions.trendAllFilmsAction.clearAction(),
        FilmsApiActions.trendFilmsAction.clearAction(),
        FilmsApiActions.trendTvAction.clearAction(),
        FilmsApiActions.popularFilmsHomeListAction.clearAction(),
        FilmsApiActions.popularTvHomeListAction.clearAction(),
        FilmsApiActions.upcomingFilmsAction.clearAction(),
        FavouriteApiActions.getFavouriteFilmsAction.clearAction(),
      ]),
    ),
  { functional: true },
);
