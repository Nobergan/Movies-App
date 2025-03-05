import { createSelector } from '@ngrx/store';
import { FilmsSelectors } from '@mm/shared/films/selectors';
import { UiSelectors } from '@mm/shared/selectors';
import { AuthSelectors } from '@mm/auth/selectors';
import { isAsyncActionCompleted } from '@mm/shared/helpers';

const selectAppViewModel = createSelector(
  UiSelectors.selectIsBlockSearchVisible,
  UiSelectors.selectIsBtnSearchVisible,
  UiSelectors.selectIsMobileMenuVisible,
  FilmsSelectors.selectSearchFilmsAction,
  FilmsSelectors.selectSearchResultsFilms,
  AuthSelectors.selectAuthPopupOpen,
  AuthSelectors.selectIsLoggedIn,
  AuthSelectors.selectCurrentUserAction,
  AuthSelectors.selectCurrentUser,
  (
    hasSearchBlock,
    hasBtnSearchIcon,
    isMobileMenuVisible,
    searchFilmsAction,
    searchFilms,
    authPopupOpen,
    isLoggedIn,
    currentUserAction,
    currentUser,
  ) => ({
    hasSearchBlock,
    hasBtnSearchIcon,
    isLoadingSearchFilms: searchFilmsAction.inProgress,
    searchFilms: searchFilms,
    isSearchButton: searchFilms.length > 6,
    isMobileMenuVisible,
    authPopupOpen,
    isLoggedIn,
    isAnonymous: !isLoggedIn,
    currentUser,
    isLoading: !isAsyncActionCompleted(currentUserAction),
  }),
);

export const AppVmSelectors = {
  selectAppViewModel,
};
