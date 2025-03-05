import { createSelector } from '@ngrx/store';

import { AuthSelectors } from './auth.selectors';

const selectAuthViewModel = createSelector(
  AuthSelectors.selectAuthPopupOpen,
  AuthSelectors.selectIsSubmitting,
  AuthSelectors.selectIsGoogleSubmitting,
  AuthSelectors.selectCurrentUser,
  AuthSelectors.selectIsLoggedIn,
  (authPopupOpen, isSubmitting, isGoogleSubmitting, currentUser, isLoggedIn) => ({
    authPopupOpen,
    isSubmitting,
    isGoogleSubmitting,
    currentUser,
    isLoggedIn,
  }),
);

export const AuthVmSelectors = {
  selectAuthViewModel,
};
