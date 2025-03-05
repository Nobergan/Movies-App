import { ApiFilmResponse } from '@mm/shared/films/models';

export interface HomePageVm {
  isLoggedIn: boolean;
  isLoading: boolean;
  trendAllFilms: ApiFilmResponse[];
  trendFilms: ApiFilmResponse[];
  trendTv: ApiFilmResponse[];
  popularFilms: ApiFilmResponse[];
  popularTv: ApiFilmResponse[];
  upcomingFilms: ApiFilmResponse[];
  favouriteFilmsIds: number[];
}
