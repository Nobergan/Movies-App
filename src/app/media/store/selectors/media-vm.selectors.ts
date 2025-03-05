import { createSelector } from '@ngrx/store';
import { FilmsSelectors } from '@mm/shared/films/selectors';
import { isAsyncActionCompleted } from '@mm/shared/helpers';
import { FavouriteSelectors } from '@mm/shared/favourites/selectors';
import { AuthSelectors } from '@mm/auth/selectors';

const selectMediaAllViewModel = createSelector(
  AuthSelectors.selectIsLoggedIn,
  FilmsSelectors.selectGenres,
  FilmsSelectors.selectDiscoveryFilmsAction,
  FilmsSelectors.selectUpdatedDiscoveryFilms,
  FilmsSelectors.selectDiscoveryFilmsFiltersBtn,
  FavouriteSelectors.selectFavouriteIds,
  (isLoggedIn, genres, discoveryFilmsAction, discoveryFilms, discoverFilmsFiltersBtn, favouriteFilmsIds) => {
    return {
      isLoggedIn,
      discoveryFilms,
      genres,
      isLoading: discoveryFilmsAction.inProgress,
      isShowFiltersButton: discoverFilmsFiltersBtn,
      favouriteFilmsIds,
    };
  },
);

const selectMediaNowPlayingViewModel = createSelector(
  AuthSelectors.selectIsLoggedIn,
  FilmsSelectors.selectNowPlayingFilmsAction,
  FilmsSelectors.selectAiringTodayTvAction,
  FilmsSelectors.selectUpdatedNowPlayingMedia,
  FavouriteSelectors.selectFavouriteIds,
  (isLoggedIn, nowPlayingFilmsAction, airingTodayTvAction, nowPlayingFilms, favouriteFilmsIds) => {
    return {
      isLoggedIn,
      nowPlayingFilms,
      isLoading: nowPlayingFilmsAction.inProgress || airingTodayTvAction.inProgress,
      favouriteFilmsIds,
    };
  },
);

const selectMediaViewModel = createSelector(
  AuthSelectors.selectIsLoggedIn,
  FilmsSelectors.selectGenresAction,
  FilmsSelectors.selectGenres,
  FilmsSelectors.selectPopularFilmsAction,
  FilmsSelectors.selectUpdatedPopularFilms,
  FilmsSelectors.selectTopFilmsAction,
  FilmsSelectors.selectUpdatedTopFilms,
  FavouriteSelectors.selectFavouriteIds,
  FavouriteSelectors.selectGetFavouriteAllAction,
  (
    isLoggedIn,
    genresAction,
    genres,
    popularFilmsAction,
    popularFilms,
    topFilmsAction,
    topFilms,
    favouriteFilmsIds,
    getFavouriteAllAction,
  ) => {
    return {
      isLoggedIn,
      genres,
      isPopularFilmsLoading: popularFilmsAction.inProgress,
      popularFilms: popularFilms.slice(0, 10),
      isTopFilmsLoading: topFilmsAction.inProgress,
      topFilms: topFilms.slice(0, 5),
      favouriteFilmsIds,
      isLoading: !isAsyncActionCompleted(genresAction && popularFilmsAction && topFilmsAction && getFavouriteAllAction),
    };
  },
);

export const MediaVmSelectors = {
  selectMediaViewModel,
  selectMediaAllViewModel,
  selectMediaNowPlayingViewModel,
};
