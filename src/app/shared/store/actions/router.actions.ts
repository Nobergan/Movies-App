import { NavigationExtras } from '@angular/router';

import { createActionGroup, props } from '@ngrx/store';

const featureName = 'Router';

export const RouterActions = createActionGroup({
  source: featureName,
  events: {
    navigate: props<{
      url: string;
      extras?: NavigationExtras;
    }>(),
    navigateByUrl: props<{
      url: string;
      skipLocalization?: boolean;
      extras?: NavigationExtras;
    }>(),
  },
});
