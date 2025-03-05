import { combineReducers, createFeature, createReducer, on } from '@ngrx/store';

import { CurrentUser } from '@mm/shared/state';
import { createAsyncActionReducer } from '@mm/shared/helpers';

import { authFeatureKey, AuthPopupType, AuthState } from '../../models';
import { AuthActions, AuthApiActions } from '../actions';

const openAuthPopupReducer = createReducer<AuthPopupType>(
  null,
  on(AuthActions.openAuthPopup, (state, { popupType }) => popupType),
  on(AuthActions.closeAuthPopup, () => null),
);

const isSubmittingReducer = createReducer<boolean>(
  false,
  on(
    AuthApiActions.registerAction.action,
    AuthApiActions.loginAction.action,
    AuthApiActions.forgotPasswordAction.action,
    AuthApiActions.getCurrentUserAction.action,
    () => true,
  ),
  on(
    AuthApiActions.registerAction.succeededAction,
    AuthApiActions.registerAction.failedAction,
    AuthApiActions.loginAction.succeededAction,
    AuthApiActions.loginAction.failedAction,
    AuthApiActions.forgotPasswordAction.succeededAction,
    AuthApiActions.forgotPasswordAction.failedAction,
    () => false,
  ),
);

const isGoogleSubmittingReducer = createReducer<boolean>(
  false,
  on(AuthActions.googleAuth, () => true),
  on(AuthApiActions.googleAuthAction.succeededAction, AuthApiActions.googleAuthAction.failedAction, () => false),
);

const currentUserReducer = createReducer<CurrentUser>(
  null,
  on(
    AuthApiActions.loginAction.succeededAction,
    AuthApiActions.registerAction.succeededAction,
    AuthApiActions.googleAuthAction.succeededAction,
    AuthApiActions.getCurrentUserAction.succeededAction,
    (state, { payload }) => payload,
  ),
  on(AuthActions.logOut, () => null),
);

const isLoggedInReducer = createReducer<boolean>(
  false,
  on(
    AuthApiActions.loginAction.succeededAction,
    AuthApiActions.registerAction.succeededAction,
    AuthApiActions.googleAuthAction.succeededAction,
    AuthApiActions.getCurrentUserAction.succeededAction,
    () => true,
  ),
  on(AuthActions.logOut, () => false),
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer: combineReducers<AuthState>({
    authPopupOpen: openAuthPopupReducer,
    isSubmitting: isSubmittingReducer,
    isGoogleSubmitting: isGoogleSubmittingReducer,
    currentUserAction: createAsyncActionReducer(AuthApiActions.getCurrentUserAction),
    currentUser: currentUserReducer,
    isLoggedIn: isLoggedInReducer,
  }),
});
