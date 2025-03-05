import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideEffects } from '@ngrx/effects';
import * as authEffects from '@mm/auth/effects';

import * as routerEffects from './effects/router.effects';
import * as toastEffects from './effects/toast.effects';
import * as rootEffects from './effects/root.effects';

export const provideRootStore = (): EnvironmentProviders =>
  makeEnvironmentProviders([provideEffects([routerEffects, toastEffects, rootEffects, authEffects])]);
