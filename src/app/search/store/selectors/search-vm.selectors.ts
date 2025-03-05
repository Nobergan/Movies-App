import { createSelector } from '@ngrx/store';
import { FilmsSelectors } from '@mm/shared/films/selectors';
import { isAsyncActionCompleted } from '@mm/shared/helpers';
import { FavouriteSelectors } from '@mm/shared/favourites/selectors';
import { AuthSelectors } from '@mm/auth/selectors';

const selectSearchViewModel = createSelector(
  AuthSelectors.selectIsLoggedIn,
  FilmsSelectors.selectUpdatedSearchFilms,
  FavouriteSelectors.selectFavouriteIds,
  FilmsSelectors.selectSearchFilmsAction,
  FavouriteSelectors.selectGetFavouriteAllAction,
  (isLoggedIn, searchFilms, favouriteFilmsIds, loadSearchFilmsAction, getFavouriteAllAction) => ({
    isLoggedIn,
    searchFilms,
    favouriteFilmsIds,
    isLoading: !isAsyncActionCompleted(loadSearchFilmsAction && getFavouriteAllAction),
  }),
);

export const SearchVmSelectors = {
  selectSearchViewModel,
};
