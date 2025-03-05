import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideEffects } from '@ngrx/effects';

import * as homeEffects from './effects/home.effects';

export const provideHomeStore = (): EnvironmentProviders => makeEnvironmentProviders([provideEffects([homeEffects])]);
