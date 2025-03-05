import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthPopupType, AuthRequest, ForgotPasswordRequest } from '@mm/auth/models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    openAuthPopup: props<{ popupType: AuthPopupType }>(),
    closeAuthPopup: emptyProps(),
    getCurrentUser: emptyProps(),
    login: props<{ request: AuthRequest }>(),
    register: props<{ request: AuthRequest }>(),
    forgotPassword: props<{ request: ForgotPasswordRequest }>(),
    googleAuth: emptyProps(),
    logOut: emptyProps(),
  },
});
