import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { filmDetailsFeature } from './reducers';
import { provideFilmDetailsApi } from '../api';
import * as filmDetailsApiEffects from './effects/film-details-api.effects';
import * as filmDetailsEffects from './effects/film-details.effects';

export const provideFilmDetailsStore = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideFilmDetailsApi(),
    provideState(filmDetailsFeature),
    provideEffects([filmDetailsApiEffects, filmDetailsEffects]),
  ]);
