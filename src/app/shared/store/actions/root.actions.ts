import { createActionGroup, emptyProps } from '@ngrx/store';

const rootFeatureKey = 'Root';

export const RootActions = createActionGroup({
  source: rootFeatureKey,
  events: {
    appInitialized: emptyProps(),
  },
});
