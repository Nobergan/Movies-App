import { ApiFilmResponse, Genre } from '@mm/shared/films/models';

export interface MediaPageVm {
  isLoading: boolean;
  isLoggedIn: boolean;
  genres: Genre[];
  isPopularFilmsLoading: boolean;
  popularFilms: ApiFilmResponse[];
  favouriteFilmsIds: number[];
  isTopFilmsLoading: boolean;
  topFilms: ApiFilmResponse[];
}
