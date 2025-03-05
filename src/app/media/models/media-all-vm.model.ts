import { FilmsResponse, Genre } from '@mm/shared/films/models';

export interface MediaAllVm {
  isLoggedIn: boolean;
  discoveryFilms: FilmsResponse;
  genres: Genre[];
  isLoading: boolean;
  isShowFiltersButton: boolean;
  favouriteFilmsIds: number[];
}
