import { AuthState } from '@mm/auth/models';

import { UiState } from './ui.state';

export interface MainState {
  ui: UiState;
  auth: AuthState;
}
