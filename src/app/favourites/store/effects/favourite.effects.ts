import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';
import { LocalStorageService, ToastType } from '@mm/shared/services';
import { FavouriteApiActions } from '@mm/shared/favourites/actions';
import { ToastActions } from '@mm/shared/actions';

import { FavouriteActions } from '../actions';

export const loadFavouriteFilms = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(FavouriteActions.opened),
      switchMap(action => {
        const userLocalId = localStorageService.get('userLocalId');

        return [
          FavouriteApiActions.getFavouriteFilmsAction.action({
            payload: {
              userLocalId: userLocalId,
            },
          }),
        ];
      }),
    ),
  {
    functional: true,
  },
);

export const closedFavouriteFilms = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(FavouriteActions.closed),
      switchMap(() => [
        FavouriteApiActions.addFavouriteFilmAction.clearAction(),
        FavouriteApiActions.getFavouriteFilmsAction.clearAction(),
      ]),
    ),
  { functional: true },
);

export const addFavouriteFilm = createEffect(
  (actions$ = inject(Actions)): any =>
    actions$.pipe(
      ofType(FavouriteActions.addFavouriteFilm),
      switchMap(action => {
        return [
          FavouriteApiActions.addFavouriteFilmAction.action({
            payload: {
              filmId: action.filmId,
              posterPath: action.posterPath,
              title: action.title,
              voteAverage: action.voteAverage,
              releaseDate: action.releaseDate,
              genres: action.genres,
              mediaType: action.mediaType,
            },
          }),
          ToastActions.showToast({
            toastType: ToastType.Success,
            message: 'Фільм додано в обране',
          }),
        ];
      }),
    ),
  { functional: true },
);

export const deleteFavouriteFilm = createEffect(
  (actions$ = inject(Actions)): any =>
    actions$.pipe(
      ofType(FavouriteActions.deleteFavouriteFilm),
      switchMap(action => {
        return [
          FavouriteApiActions.deleteFavouriteFilmAction.action({
            payload: {
              userLocalId: action.userLocalId,
              filmId: action.filmId,
            },
          }),
          ToastActions.showToast({
            toastType: ToastType.Info,
            message: 'Фільм выдалено з обраного',
          }),
        ];
      }),
    ),
  { functional: true },
);

export const deleteAllFavourites = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)): any =>
    actions$.pipe(
      ofType(FavouriteActions.deleteAllFavourites),
      switchMap(action => [
        FavouriteApiActions.deleteAllFavouritesAction.action({
          payload: {
            userLocalId: action.userLocalId,
          },
        }),
      ]),
    ),
  { functional: true },
);

export const deleteFavouritesByMediaType = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)): any =>
    actions$.pipe(
      ofType(FavouriteActions.deleteFavouritesByMediaType),
      switchMap(action => [
        FavouriteApiActions.deleteFavouritesByMediaTypeAction.action({
          payload: {
            userLocalId: action.userLocalId,
            mediaType: action.mediaType,
          },
        }),
      ]),
    ),
  { functional: true },
);
