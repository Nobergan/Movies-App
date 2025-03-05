import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';

import { switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, ToastType } from '@mm/shared/services';
import { FilmsActions, FilmsApiActions } from '@mm/shared/films/actions';
import { ToastActions, UiActions } from '@mm/shared/actions';
import { FavouriteApiActions } from '@mm/shared/favourites/actions';

import { SearchActions } from '../actions';

export const loadSearchPage = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(SearchActions.opened),
      switchMap(action => {
        const userLocalId = localStorageService.get('userLocalId');

        return [
          UiActions.setIsSearchBlockVisible({ isVisible: false }),
          UiActions.setIsSearchBtnVisible({ isVisible: false }),
          FilmsApiActions.genresAction.action({
            payload: { mediaType: action.mediaType },
          }),
          FilmsActions.searchFilms({
            page: action.page,
            name: action.nameFilm,
            mediaType: action.mediaType,
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

export const handleClosedSearchPage = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(SearchActions.closed),
      switchMap(() => [
        UiActions.setIsSearchBtnVisible({ isVisible: true }),
        FilmsApiActions.genresAction.clearAction(),
        FilmsApiActions.searchFilmsAction.clearAction(),
        FavouriteApiActions.getFavouriteFilmsAction.clearAction(),
      ]),
    ),
  { functional: true },
);

export const handleSearchInputClicked = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(SearchActions.searchClickedAfterLoad),
      map(() =>
        ToastActions.showToast({
          toastType: ToastType.Warning,
          message: 'Запіт на отримання фільмів вже зроблений!',
        }),
      ),
    ),
  { functional: true },
);
