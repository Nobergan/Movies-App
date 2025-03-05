import { FilmsResponse } from '@mm/shared/films/models';

export interface MediaNowPlayingVm {
  isLoggedIn: boolean;
  nowPlayingFilms: FilmsResponse;
  isLoading: boolean;
  favouriteFilmsIds: number[];
}
