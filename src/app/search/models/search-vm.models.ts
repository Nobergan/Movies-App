import { FilmsResponse } from '@mm/shared/films/models';

export interface SearchVm {
  isLoggedIn: boolean;
  isLoading: boolean;
  searchFilms: FilmsResponse;
  favouriteFilmsIds: number[];
}
