import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MediaFeatureKey = 'Media';

export const MediaActions = createActionGroup({
  source: MediaFeatureKey,
  events: {
    opened: props<{ mediaType: string; }>(),
    closed: emptyProps(),
  },
});
