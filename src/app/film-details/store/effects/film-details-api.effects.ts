import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';

import { switchMap } from 'rxjs';
import { LocalStorageService } from '@mm/shared/services';
import { createAsyncActionEffect } from '@mm/shared/helpers';

import { FilmDetailsProviderToken } from '../../api';
import { FilmDetailsApiActions } from '../actions';

export const handleAddFilmComment = createEffect(
  (actions$ = inject(Actions), filmDetailsProvider = inject(FilmDetailsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmDetailsApiActions.addFilmCommentAction.action),
      switchMap(({ payload }) =>
        createAsyncActionEffect(filmDetailsProvider.addFilmComment(payload), FilmDetailsApiActions.addFilmCommentAction),
      ),
    ),
  {
    functional: true,
  },
);

export const handleGetFilmComments = createEffect(
  (
    actions$ = inject(Actions),
    filmDetailsProvider = inject(FilmDetailsProviderToken),
    localStorageService = inject(LocalStorageService),
  ): any =>
    actions$.pipe(
      ofType(FilmDetailsApiActions.addFilmCommentAction.succeededAction, FilmDetailsApiActions.getFilmCommentsAction.action),
      switchMap(action => {
        const filmId = action.payload?.filmId || localStorageService.get('filmId');
        return createAsyncActionEffect(filmDetailsProvider.getFilmComments(filmId), FilmDetailsApiActions.getFilmCommentsAction);
      }),
    ),
  {
    functional: true,
  },
);

export const handleAddFilmVote = createEffect(
  (actions$ = inject(Actions), filmDetailsProvider = inject(FilmDetailsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmDetailsApiActions.addFilmVoteAction.action),
      switchMap(({ payload }) =>
        createAsyncActionEffect(filmDetailsProvider.addFilmVote(payload), FilmDetailsApiActions.addFilmVoteAction),
      ),
    ),
  {
    functional: true,
  },
);

export const handleFilmVotedByUser = createEffect(
  (actions$ = inject(Actions), filmDetailsProvider = inject(FilmDetailsProviderToken)): any =>
    actions$.pipe(
      ofType(FilmDetailsApiActions.addFilmVotedUserAction.action),
      switchMap(({ payload }) => {
        return createAsyncActionEffect(filmDetailsProvider.addFilmVotedUser(payload), FilmDetailsApiActions.addFilmVotedUserAction);
      }),
    ),
  {
    functional: true,
  },
);

export const handleCheckFilmVotedAfterAdd = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)): any =>
    actions$.pipe(
      ofType(FilmDetailsApiActions.addFilmVotedUserAction.succeededAction),
      switchMap(() => {
        const filmId = localStorageService.get('filmId');
        const userLocalId = localStorageService.get('userLocalId') || 'anonym' + btoa(navigator.userAgent).slice(0, 28);

        return [
          FilmDetailsApiActions.checkFilmVotedByUserAction.action({
            payload: { filmId, userLocalId },
          }),
        ];
      }),
    ),
  {
    functional: true,
  },
);

export const handleGetFilmVotes = createEffect(
  (
    actions$ = inject(Actions),
    filmDetailsProvider = inject(FilmDetailsProviderToken),
    localStorageService = inject(LocalStorageService),
  ): any =>
    actions$.pipe(
      ofType(FilmDetailsApiActions.getFilmVotesAction.action, FilmDetailsApiActions.addFilmVoteAction.succeededAction),
      switchMap(action => {
        const filmId = localStorageService.get('filmId');
        return createAsyncActionEffect(filmDetailsProvider.getFilmVotes(filmId), FilmDetailsApiActions.getFilmVotesAction);
      }),
    ),
  {
    functional: true,
  },
);

export const handleCheckFilmVotedByUser = createEffect(
  (actions$ = inject(Actions), filmDetailsProvider = inject(FilmDetailsProviderToken)) =>
    actions$.pipe(
      ofType(FilmDetailsApiActions.checkFilmVotedByUserAction.action),
      switchMap(({ payload }) =>
        createAsyncActionEffect(filmDetailsProvider.checkFilmVotedByUser(payload), FilmDetailsApiActions.checkFilmVotedByUserAction),
      ),
    ),
  {
    functional: true,
  },
);
