import { createSelector } from '@ngrx/store';
import { FilmsSelectors } from '@mm/shared/films/selectors';
import { isAsyncActionCompleted } from '@mm/shared/helpers';
import { FavouriteSelectors } from '@mm/shared/favourites/selectors';
import { AuthSelectors } from '@mm/auth/selectors';

const selectHomeViewModel = createSelector(
  AuthSelectors.selectIsLoggedIn,
  FilmsSelectors.selectUpdatedTrendAllFilms,
  FilmsSelectors.selectTrendAllFilmsAction,
  FilmsSelectors.selectUpdatedTrendFilms,
  FilmsSelectors.selectTrendFilmsAction,
  FilmsSelectors.selectUpdatedTrendTv,
  FilmsSelectors.selectTrendTvAction,
  FilmsSelectors.selectUpdatedPopularFilmsHomeList,
  FilmsSelectors.selectPopularFilmsHomeListAction,
  FilmsSelectors.selectUpdatedPopularTvHomeList,
  FilmsSelectors.selectPopularTvHomeListAction,
  FilmsSelectors.selectUpdatedUpcomingFilms,
  FilmsSelectors.selectUpcomingFilmsAction,
  FavouriteSelectors.selectFavouriteIds,
  FavouriteSelectors.selectGetFavouriteAllAction,
  (
    isLoggedIn,
    trendAllFilms,
    trendAllFilmsAction,
    trendFilms,
    trendFilmsAction,
    trendTv,
    trendTvAction,
    popularFilms,
    popularFilmsListAction,
    popularTv,
    popularTvListAction,
    upcomingFilms,
    upcomingFilmsAction,
    favouriteFilmsIds,
    getFavouriteAllAction,
  ) => {
    return {
      isLoggedIn,
      trendAllFilms,
      trendFilms,
      trendTv,
      popularFilms,
      popularTv,
      upcomingFilms,
      favouriteFilmsIds,
      isLoading: !isAsyncActionCompleted(
        trendAllFilmsAction ||
          trendFilmsAction ||
          trendTvAction ||
          popularFilmsListAction ||
          popularTvListAction ||
          upcomingFilmsAction ||
          getFavouriteAllAction,
      ),
    };
  },
);

export const HomeVmSelectors = {
  selectHomeViewModel,
};
