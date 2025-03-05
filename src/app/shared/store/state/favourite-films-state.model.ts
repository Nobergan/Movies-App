import { FilmResponse } from '@mm/shared/films/models';

import { AsyncActionState } from '../models';

export const favouriteFilmsFeatureKey = 'Favourite films';

export interface FavouriteFilmsStateModel {
  addFavouriteFilmAction: AsyncActionState<FilmResponse>;
  addFavouriteFilm: FilmResponse;
  getFavouriteAll: FilmResponse[];
  getFavouriteAllAction: AsyncActionState<FilmResponse[]>;
}
