import { createSelector } from '@ngrx/store';

import { FilmsSelectors } from '@mm/shared/films/selectors';
import { isAsyncActionCompleted } from '@mm/shared/helpers';
import { FavouriteSelectors } from '@mm/shared/favourites/selectors';
import { AuthSelectors } from '@mm/auth/selectors';

import { FilmDetailsSelectors } from './film-details.selectors';

const selectFilmComments = createSelector(
  FilmDetailsSelectors.selectFilmComments,
  FilmDetailsSelectors.selectFilmCommentsAction,
  (filmComments, filmCommentsAction) => ({
    comments: filmComments,
    isLoading: !isAsyncActionCompleted(filmCommentsAction),
  }),
);

const selectFilmDetailsViewModel = createSelector(
  AuthSelectors.selectIsLoggedIn,
  AuthSelectors.selectAuthPopupOpen,
  FilmsSelectors.selectFilmDetails,
  FilmsSelectors.selectFilmDetailsAction,
  selectFilmComments,
  FilmDetailsSelectors.selectGetFilmVotes,
  FilmDetailsSelectors.selectGetFilmVotesAction,
  FilmDetailsSelectors.selectFilmVoted,
  FilmDetailsSelectors.selectFilmVotedAction,
  FilmsSelectors.selectUpdatedSimilarFilms,
  FilmsSelectors.selectFilmsSimilarAction,
  FilmsSelectors.selectGenresAction,
  FilmsSelectors.selectGenres,
  FavouriteSelectors.selectFavouriteIds,
  FavouriteSelectors.selectGetFavouriteAllAction,
  (
    isLoggedIn,
    authPopupOpen,
    filmDetails,
    filmDetailsAction,
    filmComments,
    getFilmVotes,
    getFilmVotesAction,
    filmVoted,
    filmVotedAction,
    filmsSimilar,
    filmsSimilarAction,
    genresAction,
    genres,
    favouriteFilmsIds,
    getFavouriteAllAction,
  ) => ({
    isLoggedIn,
    authPopupOpen,
    details: { ...filmDetails },
    comments: filmComments.comments,
    isLoadingComments: filmComments.isLoading,
    likes: getFilmVotes.likes,
    dislikes: getFilmVotes.dislikes,
    isLiked: filmVoted.isLiked,
    isDisliked: filmVoted.isDisliked,
    filmsSimilar,
    genres: genres,
    favouriteFilmsIds,
    isLoading: !isAsyncActionCompleted(
      filmDetailsAction && getFilmVotesAction && filmVotedAction && filmsSimilarAction && genresAction && getFavouriteAllAction,
    ),
  }),
);

const selectFilmActorsViewModel = createSelector(
  FilmsSelectors.selectFilmActors,
  FilmsSelectors.selectFilmActorsAction,
  (filmActors, filmActorsAction) => ({
    id: filmActors ? filmActors.id : null,
    actors: filmActors ? filmActors.actors : [],
    crew: filmActors ? filmActors.crew : [],
    isLoading: !isAsyncActionCompleted(filmActorsAction),
  }),
);

export const FilmDetailsVmSelectors = {
  selectFilmDetailsViewModel,
  selectFilmActorsViewModel,
};
