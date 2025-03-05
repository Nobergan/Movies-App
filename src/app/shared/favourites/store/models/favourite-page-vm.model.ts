import { FilmResponse } from '@mm/shared/films/models';

export interface FavouritePageVmModel {
  favouriteAll: FilmResponse[];
  favouriteFilms: FilmResponse[];
  favouriteTv: FilmResponse[];
  favouriteIds: number[];
  isLoading: boolean;
  isLoggedIn: boolean;
}
