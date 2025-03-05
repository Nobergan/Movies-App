import { authFeature } from '../reducers';

const { selectAuthPopupOpen, selectIsSubmitting, selectIsGoogleSubmitting, selectCurrentUserAction, selectCurrentUser, selectIsLoggedIn } =
  authFeature;

export const AuthSelectors = {
  selectAuthPopupOpen,
  selectIsSubmitting,
  selectIsGoogleSubmitting,
  selectCurrentUserAction,
  selectCurrentUser,
  selectIsLoggedIn,
};
