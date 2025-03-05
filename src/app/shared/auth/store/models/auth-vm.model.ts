import { CurrentUser } from '@mm/shared/state';
import { AuthPopupType } from '@mm/auth/models';

export interface AuthVmModel {
  authPopupOpen: AuthPopupType;
  isSubmitting: boolean;
  isGoogleSubmitting: boolean;
  currentUser: CurrentUser | null;
  isLoggedIn: boolean;
}
