import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideEffects } from '@ngrx/effects';

import * as searchEffects from './effects/search.effects';

export const provideSearchStore = (): EnvironmentProviders => makeEnvironmentProviders([provideEffects([searchEffects])]);
