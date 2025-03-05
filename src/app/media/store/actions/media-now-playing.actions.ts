import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const MediaNowPlayingFeatureKey = 'MediaNowPlayingSection';

export const MediaNowPlayingActions = createActionGroup({
  source: MediaNowPlayingFeatureKey,
  events: {
    opened: props<{
      mediaType: string;
      page: number;
    }>(),
    loadNowPlayingFilmsTriggered: props<{
      mediaType: string;
      page: number;
    }>(),
    closed: emptyProps(),
  },
});
