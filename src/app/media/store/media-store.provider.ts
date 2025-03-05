import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideEffects } from '@ngrx/effects';

import * as mediaEffects from './effects/media.effects';
import * as mediaAllEffects from './effects/media-all.effects';
import * as mediaNowPlayingEffects from './effects/media-now-playing.effects';

export const provideMediaStore = (): EnvironmentProviders =>
  makeEnvironmentProviders([provideEffects([mediaEffects, mediaAllEffects, mediaNowPlayingEffects])]);
