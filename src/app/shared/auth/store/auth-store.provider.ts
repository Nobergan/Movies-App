import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAuthApi } from '../api/auth.provider';
import { authFeature } from '@mm/auth/reducers';

import * as authEffects from './effects/auth.effects';
import * as authApiEffects from './effects/auth-api.effects';

export const provideAuthStore = (): EnvironmentProviders =>
  makeEnvironmentProviders([provideAuthApi(), provideState(authFeature), provideEffects([authEffects, authApiEffects])]);
