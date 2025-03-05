import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideFavouriteFilmsApi } from '@mm/shared/favourites/api';
import { favouriteFeature } from '@mm/shared/favourites/reducers';
import * as favouriteApiEffects from '@mm/shared/favourites/effects';

import * as favouriteEffects from './effects/favourite.effects';

export const provideFavouriteStore = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideFavouriteFilmsApi(),
    provideState(favouriteFeature),
    provideEffects([favouriteApiEffects, favouriteEffects]),
  ]);
