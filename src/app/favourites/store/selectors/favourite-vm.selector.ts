import { createSelector } from '@ngrx/store';
import { isAsyncActionCompleted } from '@mm/shared/helpers';
import { FavouriteSelectors } from '@mm/shared/favourites/selectors';
import { AuthSelectors } from '@mm/auth/selectors';

const selectFavouriteViewModel = createSelector(
  AuthSelectors.selectIsLoggedIn,
  FavouriteSelectors.selectFavouriteAll,
  FavouriteSelectors.selectFavouriteFilms,
  FavouriteSelectors.selectFavouriteTv,
  FavouriteSelectors.selectFavouriteIds,
  FavouriteSelectors.selectGetFavouriteAllAction,
  (isLoggedIn, favouriteAll, favouriteFilms, favouriteTv, favouriteIds, favouriteAllAction) => ({
    isLoggedIn,
    favouriteAll,
    favouriteFilms,
    favouriteTv,
    favouriteIds,
    isLoading: !isAsyncActionCompleted(favouriteAllAction),
  }),
);

export const FavouriteFilmsVmSelectors = {
  selectFavouriteViewModel,
};
