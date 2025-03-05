import { CurrentUser } from '@mm/shared/state';

import { AuthPopupType } from './popup-type.enum';
import { AsyncActionState } from '@mm/shared/store/models';

export const authFeatureKey = 'Auth';

export interface AuthState {
  isLoggedIn: boolean;
  isSubmitting: boolean;
  isGoogleSubmitting: boolean;
  authPopupOpen: AuthPopupType;
  currentUser: CurrentUser | null;
  currentUserAction: AsyncActionState<CurrentUser | null>;
}
