import { createAsyncAction } from '@mm/shared/helpers';

import { AuthRequest, ForgotPasswordRequest, ForgotPasswordResponse } from '@mm/auth/models';
import { CurrentUser } from '@mm/shared/state';
import { createAction, props } from '@ngrx/store';

const openAuthPopupAction = createAsyncAction<boolean, boolean>(`Open Auth Popup`);
const loginAction = createAsyncAction<AuthRequest, CurrentUser>(`Login`);
const registerAction = createAsyncAction<AuthRequest, CurrentUser>(`Register`);
const forgotPasswordAction = createAsyncAction<ForgotPasswordRequest, ForgotPasswordResponse>(`Forgot Password`);

const googleAuthAction = createAsyncAction<void, CurrentUser>(`Google Auth`);
const getCurrentUserAction = createAsyncAction<void, CurrentUser>(`Current User`);
export const getCurrentUserFailureAction = createAction('Get Current User Failure', props<{ error: string }>());

export const AuthApiActions = {
  openAuthPopupAction,
  loginAction,
  registerAction,
  forgotPasswordAction,
  googleAuthAction,
  getCurrentUserAction,
  getCurrentUserFailureAction,
};
