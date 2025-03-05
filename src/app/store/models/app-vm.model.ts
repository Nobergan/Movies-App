import { FilmResponse } from '@mm/shared/films/models';
import { CurrentUser } from '@mm/shared/state';
import { AuthPopupType } from '@mm/auth/models';

export interface AppVmModel {
  hasSearchBlock: boolean;
  hasBtnSearchIcon: boolean;
  isLoadingSearchFilms: boolean;
  searchFilms: FilmResponse[];
  isSearchButton: boolean;
  authPopupOpen: AuthPopupType;
  isLoggedIn: boolean;
  isAnonymous: boolean;
  currentUser: CurrentUser | null;
  isLoading: boolean;
  isMobileMenuVisible: boolean;
}
