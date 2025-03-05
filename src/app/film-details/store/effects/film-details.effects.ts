import { inject } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { LocalStorageService } from '@mm/shared/services';
import { FilmsApiActions } from '@mm/shared/films/actions';
import { FavouriteApiActions } from '@mm/shared/favourites/actions';

import { FilmDetailsActions, FilmDetailsApiActions } from '../actions';

export const loadFilmDetails = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)) =>
    actions$.pipe(
      ofType(FilmDetailsActions.opened),
      switchMap(action => {
        const userLocalId = localStorageService.get('userLocalId');
        const anonymUser = 'anonym' + btoa(navigator.userAgent).slice(0, 28);

        return [
          FilmsApiActions.filmDetailsAction.action({
            payload: {
              filmId: action.filmId,
              mediaType: action.mediaType,
            },
          }),
          FilmDetailsApiActions.getFilmCommentsAction.action({
            payload: {
              filmId: action.filmId,
            },
          }),
          FilmDetailsApiActions.getFilmVotesAction.action({
            payload: {
              filmId: action.filmId,
            },
          }),
          FilmDetailsApiActions.checkFilmVotedByUserAction.action({
            payload: {
              filmId: action.filmId,
              userLocalId: userLocalId || anonymUser,
            },
          }),
          FilmsApiActions.getFilmsSimilarAction.action({
            payload: {
              filmId: action.filmId,
              mediaType: action.mediaType,
            },
          }),
          FilmsApiActions.genresAction.action({
            payload: {
              mediaType: action.mediaType,
            },
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

export const closedFilmDetails = createEffect(
  (actions$ = inject(Actions)) =>
    actions$.pipe(
      ofType(FilmDetailsActions.closed),
      switchMap(() => [
        FilmsApiActions.filmDetailsAction.clearAction(),
        FilmsApiActions.filmActorsAction.clearAction(),
        FilmDetailsApiActions.getFilmCommentsAction.clearAction(),
        FilmDetailsApiActions.getFilmVotesAction.clearAction(),
        FilmDetailsApiActions.checkFilmVotedByUserAction.clearAction(),
        FilmsApiActions.getFilmsSimilarAction.clearAction(),
        FilmsApiActions.genresAction.clearAction(),
      ]),
    ),
  { functional: true },
);

export const addFilmComment = createEffect(
  (actions$ = inject(Actions)): any =>
    actions$.pipe(
      ofType(FilmDetailsActions.addFilmComment),
      mergeMap(action => [
        FilmDetailsApiActions.addFilmCommentAction.action({
          payload: {
            filmId: action.filmId,
            comment: action.comment,
            date: new Date().toISOString(),
          },
        }),
      ]),
    ),
  { functional: true },
);

export const addFilmVote = createEffect(
  (actions$ = inject(Actions), localStorageService = inject(LocalStorageService)): any =>
    actions$.pipe(
      ofType(FilmDetailsActions.addFilmVote),
      mergeMap(action => {
        const userLocalId = localStorageService.get('userLocalId');
        const anonymUser = 'anonym' + btoa(navigator.userAgent).slice(0, 28);

        return [
          FilmDetailsApiActions.addFilmVoteAction.action({
            payload: {
              filmId: action.filmId,
              likes: action.likes,
              dislikes: action.dislikes,
            },
          }),
          FilmDetailsApiActions.addFilmVotedUserAction.action({
            payload: {
              userLocalId: userLocalId || anonymUser,
              filmId: action.filmId,
              isLiked: action.isLiked,
              isDisliked: action.isDisliked,
            },
          }),
        ];
      }),
    ),
  { functional: true },
);

export const addFavouriteFilm = createEffect(
  (actions$ = inject(Actions)): any =>
    actions$.pipe(
      ofType(FilmDetailsActions.addFavouriteFilm),
      switchMap(action => [
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
      ]),
    ),
  { functional: true },
);
