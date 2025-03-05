import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideFilmsApi } from '@mm/shared/films/api';

import { FilmsFeature } from './reducers/films.reducer';
import * as filmsEffects from './effects/films.effects';
import * as filmsApiEffects from './effects/films-api.effects';

export const provideFilmsStore = (): EnvironmentProviders =>
  makeEnvironmentProviders([provideFilmsApi(), provideState(FilmsFeature), provideEffects([filmsEffects, filmsApiEffects])]);
