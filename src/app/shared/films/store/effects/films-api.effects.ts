import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';

import { switchMap } from 'rxjs';
import { FilmsProviderToken } from '@mm/shared/films/api';
import { FilmsActions, FilmsApiActions } from '@mm/shared/films/actions';
import { createAsyncActionEffect } from '@mm/shared/helpers';

export const handleGetFilmDetails = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)) =>
    actions$.pipe(
      ofType(FilmsApiActions.filmDetailsAction.action),
      switchMap(({ payload }) => createAsyncActionEffect(filmsProvider.getFilmDetails(payload), FilmsApiActions.filmDetailsAction)),
    ),
  {
    functional: true,
  },
);

export const handleGetFilmActors = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)) =>
    actions$.pipe(
      ofType(FilmsApiActions.filmActorsAction.action),
      switchMap(({ payload }) => createAsyncActionEffect(filmsProvider.getFilmActors(payload), FilmsApiActions.filmActorsAction)),
    ),
  {
    functional: true,
  },
);

export const handleLoadGenres = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.genresAction.action),
      switchMap(action =>
        createAsyncActionEffect(filmsProvider.getGenresFilmsList(action.payload.mediaType), FilmsApiActions.genresAction),
      ),
    ),
  {
    functional: true,
  },
);

export const handleLoadGenresFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.genresFilmsAction.action),
      switchMap(action =>
        createAsyncActionEffect(filmsProvider.getGenresFilmsList(action.payload.mediaType), FilmsApiActions.genresFilmsAction),
      ),
    ),
  {
    functional: true,
  },
);

export const handleLoadGenresTv = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.genresTvAction.action),
      switchMap(action =>
        createAsyncActionEffect(filmsProvider.getGenresFilmsList(action.payload.mediaType), FilmsApiActions.genresTvAction),
      ),
    ),
  {
    functional: true,
  },
);

export const handleTrendAllFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.trendAllFilmsAction.action),
      switchMap(action => createAsyncActionEffect(filmsProvider.getTrendAllFilms(), FilmsApiActions.trendAllFilmsAction)),
    ),
  {
    functional: true,
  },
);

export const handleTrendFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.trendFilmsAction.action),
      switchMap(action => {
        return createAsyncActionEffect(filmsProvider.getTrendFilms(), FilmsApiActions.trendFilmsAction);
      }),
    ),
  {
    functional: true,
  },
);

export const handleTrendTv = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.trendTvAction.action),
      switchMap(action => createAsyncActionEffect(filmsProvider.getTrendTv(), FilmsApiActions.trendTvAction)),
    ),
  {
    functional: true,
  },
);

export const handlePopularFilmsHomeList = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.popularFilmsHomeListAction.action),
      switchMap(action => createAsyncActionEffect(filmsProvider.getPopularFilmsHomeList(), FilmsApiActions.popularFilmsHomeListAction)),
    ),
  {
    functional: true,
  },
);

export const handlePopularTvHomeList = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.popularTvHomeListAction.action),
      switchMap(action => createAsyncActionEffect(filmsProvider.getPopularTvHomeList(), FilmsApiActions.popularTvHomeListAction)),
    ),
  {
    functional: true,
  },
);

export const handleUpcomingFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.upcomingFilmsAction.action),
      switchMap(action => createAsyncActionEffect(filmsProvider.getUpcomingFilms(), FilmsApiActions.upcomingFilmsAction)),
    ),
  {
    functional: true,
  },
);

export const handlePopularFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.popularFilmsAction.action),
      switchMap(action =>
        createAsyncActionEffect(filmsProvider.getPopularFilms(action.payload.mediaType), FilmsApiActions.popularFilmsAction),
      ),
    ),
  {
    functional: true,
  },
);

export const handleTopFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.topFilmsAction.action),
      switchMap(({ payload }) => createAsyncActionEffect(filmsProvider.getTopFilms(payload.mediaType), FilmsApiActions.topFilmsAction)),
    ),
  {
    functional: true,
  },
);

export const handleLoadDiscoveryFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.discoveryFilmsAction.action),
      switchMap(action => createAsyncActionEffect(filmsProvider.discoverMedia(action.payload), FilmsApiActions.discoveryFilmsAction)),
    ),
  {
    functional: true,
  },
);

export const handleGetFilmsSimilar = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)) =>
    actions$.pipe(
      ofType(FilmsApiActions.getFilmsSimilarAction.action),
      switchMap(({ payload }) => createAsyncActionEffect(filmsProvider.getFilmsSimilar(payload), FilmsApiActions.getFilmsSimilarAction)),
    ),
  {
    functional: true,
  },
);

export const handleLoadSearchFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.searchFilmsAction.action),
      switchMap(({ payload }) =>
        createAsyncActionEffect(
          filmsProvider.searchFilms(payload.name, payload.mediaType, payload.page),
          FilmsApiActions.searchFilmsAction,
        ),
      ),
    ),
  {
    functional: true,
  },
);

export const loadNowPlayingFilms = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.nowPlayingFilmsAction.action),
      switchMap(({ payload }) =>
        createAsyncActionEffect(filmsProvider.getNowPlayingFilms(payload.page), FilmsApiActions.nowPlayingFilmsAction),
      ),
    ),
  {
    functional: true,
  },
);

export const loadAiringTodayTv = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.airingTodayTvAction.action),
      switchMap(({ payload }) =>
        createAsyncActionEffect(filmsProvider.getAiringTodayTv(payload.page), FilmsApiActions.airingTodayTvAction),
      ),
    ),
  {
    functional: true,
  },
);

export const updateNowPlayingMedia = createEffect(
  (actions$ = inject(Actions), filmsProvider = inject(FilmsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmsApiActions.airingTodayTvAction.succeededAction, FilmsApiActions.nowPlayingFilmsAction.succeededAction),
      switchMap(({ payload }) => [FilmsActions.nowPlayingFilmsUpdate(payload)]),
    ),
  {
    functional: true,
  },
);
