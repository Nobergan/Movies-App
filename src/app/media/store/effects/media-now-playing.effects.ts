import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@mm/shared/services';
import { FilmsActions, FilmsApiActions } from '@mm/shared/films/actions';
import { switchMap } from 'rxjs';
import { FilmsType } from '@mm/shared/films/models';

import { MediaNowPlayingActions } from '../actions/media-now-playing.actions';

export const handleOpened = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(MediaNowPlayingActions.opened),
      switchMap(({ page, mediaType }) =>
        mediaType === FilmsType.Movie
          ? [FilmsApiActions.nowPlayingFilmsAction.action({ payload: { page } })]
          : [FilmsApiActions.airingTodayTvAction.action({ payload: { page } })],
      ),
    ),
  { functional: true },
);

export const handleClosed = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MediaNowPlayingActions.closed),
      switchMap(() => [FilmsActions.clearNowPlayingFilms()]),
    ),
  { functional: true },
);

export const loadNowPlayingFilmsTriggered = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(MediaNowPlayingActions.loadNowPlayingFilmsTriggered),
      switchMap(({ page, mediaType }) =>
        mediaType === FilmsType.Movie
          ? [FilmsApiActions.nowPlayingFilmsAction.action({ payload: { page } })]
          : [FilmsApiActions.airingTodayTvAction.action({ payload: { page } })],
      ),
    ),
  { functional: true },
);
