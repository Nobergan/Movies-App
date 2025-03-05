import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { debounceTime, switchMap, withLatestFrom } from 'rxjs';
import { getFilmIdsByMediaType } from '@mm/shared/films/utils';
import { createAsyncActionEffect } from '@mm/shared/helpers';
import { LocalStorageService } from '@mm/shared/services';

import { FavouriteApiActions } from '../actions';
import { FavouriteProviderToken } from '../../api';
import { FavouriteSelectors } from '../selectors';

export const handleAddFavouriteFilm = createEffect(
  (
    actions$ = inject(Actions),
    favouriteFilmsProvider = inject(FavouriteProviderToken),
    localStorageService = inject(LocalStorageService),
  ): any =>
    actions$.pipe(
      ofType(FavouriteApiActions.addFavouriteFilmAction.action),
      switchMap(({ payload }) => {
        const userLocalId = localStorageService.get('userLocalId');

        return createAsyncActionEffect(
          favouriteFilmsProvider.toggleFavouriteFilm({
            ...payload,
            userLocalId,
          }),
          FavouriteApiActions.addFavouriteFilmAction,
        );
      }),
    ),
  {
    functional: true,
  },
);

export const handleGetFavouriteFilms = createEffect(
  (
    actions$ = inject(Actions),
    favouriteFilmsProvider = inject(FavouriteProviderToken),
    localStorageService = inject(LocalStorageService),
  ) =>
    actions$.pipe(
      ofType(
        FavouriteApiActions.getFavouriteFilmsAction.action,
        FavouriteApiActions.deleteAllFavouritesAction.succeededAction,
        FavouriteApiActions.deleteFavouritesByMediaTypeAction.succeededAction,
        FavouriteApiActions.addFavouriteFilmAction.succeededAction,
        FavouriteApiActions.deleteFavouriteFilmAction.succeededAction,
      ),
      debounceTime(1),
      switchMap(() => {
        const userLocalId = localStorageService.get('userLocalId');

        return createAsyncActionEffect(
          favouriteFilmsProvider.getFavouriteFilms({ userLocalId }),
          FavouriteApiActions.getFavouriteFilmsAction,
        );
      }),
    ),
  {
    functional: true,
  },
);

export const handleDeleteFavouriteFilm = createEffect(
  (actions$ = inject(Actions), favouriteFilmsProvider = inject(FavouriteProviderToken)) =>
    actions$.pipe(
      ofType(FavouriteApiActions.deleteFavouriteFilmAction.action),
      switchMap(({ payload }) =>
        createAsyncActionEffect(favouriteFilmsProvider.deleteFavouriteFilm(payload), FavouriteApiActions.deleteFavouriteFilmAction),
      ),
    ),
  {
    functional: true,
  },
);

export const handleDeleteAllFavourites = createEffect(
  (actions$ = inject(Actions), favouriteFilmsProvider = inject(FavouriteProviderToken)) =>
    actions$.pipe(
      ofType(FavouriteApiActions.deleteAllFavouritesAction.action),
      switchMap(({ payload }) => {
        return createAsyncActionEffect(favouriteFilmsProvider.deleteAllFavourites(payload), FavouriteApiActions.deleteAllFavouritesAction);
      }),
    ),
  {
    functional: true,
  },
);

export const handleDeleteFavouritesByMediaType = createEffect(
  (actions$ = inject(Actions), favouriteFilmsProvider = inject(FavouriteProviderToken), store = inject(Store)) =>
    actions$.pipe(
      ofType(FavouriteApiActions.deleteFavouritesByMediaTypeAction.action),
      withLatestFrom(store.select(FavouriteSelectors.selectFavouriteFilms), store.select(FavouriteSelectors.selectFavouriteTv)),
      switchMap(([{ payload }, favouriteFilms, favouriteTv]) => {
        const filmIdsToDelete = getFilmIdsByMediaType(payload.mediaType, favouriteFilms, favouriteTv);

        return createAsyncActionEffect(
          favouriteFilmsProvider.deleteFavouritesByMediaType({
            ...payload,
            ids: filmIdsToDelete,
          }),
          FavouriteApiActions.deleteFavouritesByMediaTypeAction,
        );
      }),
    ),
  {
    functional: true,
  },
);
