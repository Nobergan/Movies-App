import { createSelector } from '@ngrx/store';
import { FilmsType } from '@mm/shared/films/models';

import { favouriteFeature } from '../reducers/favourite.reducer';

const { selectAddFavouriteFilm, selectAddFavouriteFilmAction, selectGetFavouriteAll, selectGetFavouriteAllAction } = favouriteFeature;

const selectFavouriteAll = createSelector(selectGetFavouriteAll, favouriteFilms => (favouriteFilms ? Object.values(favouriteFilms) : []));

const selectFavouriteFilms = createSelector(selectGetFavouriteAll, favouriteFilms =>
  favouriteFilms ? Object.values(favouriteFilms).filter(film => film.mediaType === FilmsType.Movie) : [],
);

const selectFavouriteTv = createSelector(selectGetFavouriteAll, favouriteFilms =>
  favouriteFilms ? Object.values(favouriteFilms).filter(film => film.mediaType === FilmsType.Tv) : [],
);

const selectFavouriteIds = createSelector(selectGetFavouriteAll, favouriteFilms =>
  favouriteFilms ? Object.values(favouriteFilms).map(film => film.filmId) : [],
);

export const FavouriteSelectors = {
  selectAddFavouriteFilm,
  selectAddFavouriteFilmAction,
  selectGetFavouriteAllAction,
  selectFavouriteAll,
  selectFavouriteFilms,
  selectFavouriteTv,
  selectFavouriteIds,
};
